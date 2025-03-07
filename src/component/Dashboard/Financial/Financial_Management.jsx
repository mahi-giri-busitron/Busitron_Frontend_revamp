import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
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
import moment from "moment";
import DeleteModal from "../../../shared/DeleteModal.jsx";
import toast from "react-hot-toast";
import { ProgressSpinner } from 'primereact/progressspinner';

const Financial_Management = () => {

    const [openModel, setOpenModel] = useState(false);
    const [openDeleteModel , setOpenDeleteModal] = useState(false);
    const [deleteId , setDeleteId] = useState(null);
    const [disableDeleteBtn , setDisableDeleteBtn] = useState(false);


    const navigate = useNavigate();

    let {register,watch} = useForm();

    let allEstimate = useSelector(store => store?.estimate?.allEstimateData);

    let isLoading = useSelector(store => store?.estimate?.isLoading);

    const [tableData , setTableData] = useState(allEstimate);

    let dispatch = useDispatch();
    let estimateNumber = watch("estimateNumber");

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
        switch (rowData.status) {
            case "Open":
                statusColor = "bg-red-200 text-blue-800";
                break;
            case "Pending":
                statusColor = "bg-yellow-200 text-yellow-800";
                break;
            case "Resolved":
                statusColor = "bg-green-100 text-green-800";
                break;
            case "Closed":
                statusColor = "bg-green-400 text-green-800";
                break;
            default:
                statusColor = "bg-gray-100 text-gray-800";
        }

        return (
            <span
                className={`px-2 py-1 rounded-md text-sm w-[120px] flex items-center justify-center ${statusColor}`}
            >
                {rowData.status}
            </span>
        );
    };

    const modifyCurrency = (rowData) => {
        return `${rowData.currency === "USD" ? "$" : "₹"} ${rowData.summary?.finalAmount}`;
    };

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

    if(isLoading){
        return <div className="text-center my-3">
            <ProgressSpinner 
                style={{width: '50px', height: '50px'}} 
                strokeWidth="8" fill="var(--surface-ground)" 
                animationDuration=".5s" 
            />
            <p className="text-gray-500">Loading... Please wait</p>
        </div>
    }

    return (
    <>
        <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
            <div className="flex gap-2">
                <Button
                    icon="pi pi-plus"
                    label="Create Estimate"
                    className="p-button-raised w-full md:w-auto h-10"
                    onClick={() => setOpenModel(true)}
                />
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
                <Column field="" header="Total" body={modifyCurrency}/>
                <Column field="validTill" header="Valid Till" />
                <Column field="userId.name" header="Created By" />
                <Column field="status" header="Status" body={statusTemplate} />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div className="flex items-center gap-3 justify-evenly">
                            <button>
                                <i className="pi pi-eye text-blue-500 cursor-pointer" onClick={()=> navigate(`/dashboard/financial-management/${rowData._id}`)}></i>
                            </button>
                            {/* <button>
                                <i className="pi pi-pen-to-square text-green-500 cursor-pointer"></i>
                            </button> */}
                            <button>
                                <i 
                                    onClick={()=>{setOpenDeleteModal(true), setDeleteId(rowData._id)}}
                                    className="pi pi-trash text-red-500 cursor-pointer"></i>
                            </button>
                        </div>
                    )}
                />
            </DataTable>
        </div>

        <Dialog
            header="Create Estimate"
            visible={openModel}
            style={{ width: "90vw" }}
            onHide={() => setOpenModel(false)}
        >
            <CreateEstimate setOpenModel={setOpenModel} />
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
