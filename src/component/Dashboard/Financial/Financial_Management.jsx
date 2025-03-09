import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useNavigate } from "react-router-dom";
import CreateEstimate from "./CreateEstimate";
import axios from "axios";
import { useForm } from "react-hook-form";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useDispatch, useSelector } from "react-redux";
import { getALlEstimates } from "../../../redux/estimateSlice.js";
import DeleteModal from "../../../shared/DeleteModal.jsx";
import toast from "react-hot-toast";
import UpdateEstimate from "./UpdateEstimate.jsx";
import { Skeleton } from "primereact/skeleton";

const Financial_Management = () => {

    const [openModel, setOpenModel] = useState(false);
    const [openDeleteModel , setOpenDeleteModal] = useState(false);
    const [openUpdateModal , setOpenUpdateModal] = useState(false);
    const [deleteId , setDeleteId] = useState(null);
    const [disableDeleteBtn , setDisableDeleteBtn] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const { roles } = useSelector((store) => store.rolesPermissions);
    const { currentUser } = useSelector((store) => store.user);


    const navigate = useNavigate();

    let {register,watch} = useForm();

    let allEstimate = useSelector(store => store?.estimate?.allEstimateData);

    let isLoading = useSelector(store => store?.estimate?.isLoading);

    const [tableData , setTableData] = useState(allEstimate);

    let dispatch = useDispatch();
    let estimateNumber = watch("estimateNumber");
    const userRole = currentUser?.data?.role;

    const userPermissions =
        roles.find((r) => r.role === userRole)?.permissions?.financial_management || {};

    const canView = userRole === "SuperAdmin" || userPermissions.view;
    const canAdd = userRole === "SuperAdmin" || userPermissions.add;
    const canEdit = userRole === "SuperAdmin" || userPermissions.update;
    const canDelete = userRole === "SuperAdmin" || userPermissions.delete;

    useEffect(()=>{
        dispatch(getALlEstimates())
    }, [dispatch]);

    useEffect(()=>{ 
        if (!estimateNumber?.trim()) {
            setTableData(allEstimate);
        } else {
            let modify = allEstimate?.filter(val => 
                val.estimateNumber.toLowerCase().includes(estimateNumber.toLowerCase()) ||
                (val.clientId?.name?.toLowerCase() || "").includes(estimateNumber.toLowerCase())
            );
            setTableData(modify);
        }

    },[estimateNumber,allEstimate])

    const statusTemplate = (rowData) => {
        let statusColor;
        switch (rowData?.projectStatus) {
            case "Pending":
                statusColor = "bg-yellow-200 text-yellow-800";
                break;
            case "In Progress":
                statusColor = "bg-green-100 text-green-600";
                break;
            case "Completed":
                statusColor = "bg-green-400 text-green-800";
                break;
            default:
                statusColor = "bg-gray-100 text-gray-800";
        }

        return (
            <span
                className={`px-2 py-1 rounded-md text-sm w-[120px] flex items-center justify-center ${statusColor}`}
            >
                {rowData?.projectStatus}
            </span>
        );
    };

    const paymentTemplate = (rowData)=>{

        let statusColor;
        switch (rowData?.paymentStatus) {
            case "Approved":
                statusColor = "bg-yellow-200 text-yellow-800";
                break;
            case "Paid":
                statusColor = "bg-green-400 text-green-800";
                break;
            default:
                statusColor = "bg-gray-100 text-gray-800";
        }

        return (
            <span
                className={`px-2 py-1 rounded-md text-sm w-[120px] flex items-center justify-center ${statusColor}`}
            >
                {rowData?.paymentStatus}
            </span>
        );
    }

    async function handleDelete()
    {
        try {
            setDisableDeleteBtn(true);
            let res = await axios.delete(`/api/v1/estimates/delete/${deleteId}`, {withCredentials:true});
            if(res.data.success){
                setDisableDeleteBtn(false);
                toast.success(res.data.message);
                setOpenDeleteModal(false);
                dispatch(getALlEstimates())
            }            
        } catch (error) {
            // console.log(error);
            toast.error("Failed to Delete Record");
        }
    }
    const skeletonTemplate = () => <Skeleton />

    if(isLoading){
        return <div className="card mx-5 my-4">
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2">
                    <Skeleton width="150px" height="40px" />
                </div>
                <div className="w-full md:w-100">
                    <Skeleton width="100%" height="40px" />
                </div>
            </div>
            <DataTable value={Array.from({ length: 10 })} className="p-datatable-striped">
                <Column field="estimateNumber" header="Estimate No" body={skeletonTemplate} />
                <Column field="clientId.name" header="Client" body={skeletonTemplate} />
                <Column field="Total" header="Total" body={skeletonTemplate} />
                <Column field="validTill" header="Valid Till" body={skeletonTemplate} />
                <Column field="userId.name" header="Created By" body={skeletonTemplate} />
                <Column field="status" header="Status" body={skeletonTemplate} />
                <Column header="Action" body={skeletonTemplate} />
            </DataTable>
        </div>
    }

    return (
    <>
        <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
            <div className="flex gap-2">
            {canAdd && (
                <Button
                    icon="pi pi-plus"
                    label=" Create Project Estimate"
                    className="p-button-raised w-full md:w-auto "
                    onClick={() => setOpenModel(true)}
                />
            )}             
            </div>
            <div className="w-full md:w-100">
                <IconField iconPosition="left" className="h-10 w-full">
                    <InputIcon className="pi pi-search h-10" />
                    <InputText
                        placeholder="Start Searching..."
                        {...register("estimateNumber")}
                        className="h-10 w-full"
                    />
                </IconField>
            </div>
        </div>

         <div className="mx-5 overflow-x-auto">
            <DataTable
                value={tableData}
                dataKey="id"
                paginator
                size="normal"
                removableSort
                rows={10}
                rowsPerPageOptions={[5, 10, 15, 20]}
                tableClassName="custom-table"
                paginatorClassName="custom-pagination"
                emptyMessage={
                    <p className="text-red-500 text-md text-center">
                        No Estimates found. Add a new Estimate !
                    </p>
                }
            >
                <Column field="estimateNumber" header="Estimate No"/>
                <Column field="clientId.name" header="Client" />
                <Column field="projectName" header="Project" />
                <Column field="userId.name" header="Created By" />
                <Column field="projectStatus" header={`Project Status`} body={statusTemplate} />
                <Column field="paymentStatus" header="Payment Status" body={paymentTemplate} />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div className="flex items-center gap-3 justify-evenly">
                            <button title="View More">
                                <i className="pi pi-eye text-blue-500 cursor-pointer" onClick={()=> navigate(`/dashboard/financial-management/${rowData._id}`)}></i>
                            </button>
                            {canEdit && (
                                <button disabled={rowData?.paymentStatus =="Paid"} title="Update Status" onClick={()=> {setSelectedItem(rowData) ,setOpenUpdateModal(true)}}>
                                <i className={`pi pi-pen-to-square text-green-500 ${rowData?.paymentStatus =="Paid" ? "cursor-not-allowed" : "cursor-pointer"}`}></i>
                            </button>
                            )}
                            
                            {canDelete && (
                                <button title="">
                                <i onClick={()=>{setOpenDeleteModal(true), setDeleteId(rowData._id)}}
                                    className="pi pi-trash text-red-500 cursor-pointer"></i>
                            </button>
                            )}
                            
                        </div>
                    )}
                />
            </DataTable>
        </div>

        <Dialog
            header="Project Order Estimate"
            visible={openModel}
            style={{ width: "90vw" }}
            onHide={() => setOpenModel(false)}
        >
            <CreateEstimate setOpenModel={setOpenModel} />
        </Dialog>

        <Dialog
            header="Update Project Estimate"
            visible={openUpdateModal}
            style={{ width: "50vw" }}
            onHide={() => setOpenUpdateModal(false)}
        >
            <UpdateEstimate selectedItem={selectedItem} setOpenUpdateModal={setOpenUpdateModal} />
        </Dialog>


        <DeleteModal 
            visible={openDeleteModel}
            setVisible={setOpenDeleteModal}
            handleDelete={handleDelete}
            disableDeleteBtn={disableDeleteBtn}
        />

    </>
    );
};

export default Financial_Management;
