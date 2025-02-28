import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";
import AddTask from "./AddTask";
import { useForm } from "react-hook-form";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
const Task = () => {

    const headers = [
        { label: "S.No", key: "sno" },
        { label: "Task No", key: "taskNo" },
        { label: "Task", key: "task" },
        { label: "Assigned By", key: "assignedBy" },
        // { label: "Action", key: "action" },
    ];

    const initialData = [
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T001",
            sno: 1,
            status: "Completed",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T002",
            sno: 2,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T003",
            sno: 3,
            status: "Completed",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T004",
            sno: 4,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T005",
            sno: 5,
            status: "Completed",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T006",
            sno: 6,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T007",
            sno: 7,
            status: "Completed",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T008",
            sno: 8,
            status: "Pending",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T009",
            sno: 9,
            status: "Completed",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T0010",
            sno: 10,
            status: "Pending",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T0011",
            sno: 11,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",           
        },
        {
            task: "API Integration",
            taskNo: "T0012",
            sno: 12,
            status: "Completed",
            completedOn: "2024-02-19",
            startDate: "2024-02-12",
            dueDate: "2024-02-22",
            estimatedTime: "8h",
            hoursLogged: "6h",
            assignedBy: "Bob",
        },
        {
            task: "Frontend",
            taskNo: "T0013",
            sno: 13,
            status: "Completed",
            completedOn: "2024-02-18",
            startDate: "2024-02-10",
            dueDate: "2024-02-20",
            estimatedTime: "4h",
            hoursLogged: "3h",
            assignedBy: "Charlie",
        },
        {
            task: "Backend API",
            taskNo: "T0014",
            sno: 14,
            status: "Completed",
            completedOn: "2024-02-19",
            startDate: "2024-02-12",
            dueDate: "2024-02-22",
            estimatedTime: "7h",
            hoursLogged: "7h",
            assignedBy: "David",
        },
        {
            task: "Database Setup",
            taskNo: "T0015",
            sno: 15,
            status: "Completed",
            completedOn: "2024-02-18",
            startDate: "2024-02-10",
            dueDate: "2024-02-20",
            estimatedTime: "6h",
            hoursLogged: "5h",
            assignedBy: "Eve",
        },
        {
            task: "Build UI",
            taskNo: "T0016",
            sno: 16,
            status: "Pending",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
        },
        {
            task: "Build UI",
            taskNo: "T0017",
            sno: 17,
            status: "Pending",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
        },
    ];

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);
    const [show, setShow] = useState(false);
    
    const { register, watch } = useForm({
        defaultValues: { taskName: "" },
    });
    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    const taskName = watch("taskName");   

    const [tableData ,setTableData] = useState(initialData);


    useEffect(()=>{
        let filteredData = initialData.filter(val => val.task.toLowerCase().includes(taskName.toLowerCase()));
        setTableData(filteredData);
    },[taskName])

    const statusTemplate = (rowData) => {
        let statusColor;
        switch (rowData.status) {
            case "Pending":
                statusColor = "bg-gray-100 text-gray-800";
                break;
            case "In Progress":
                statusColor = "bg-orange-100 text-orange-800";
                break;
            case "Completed":
                statusColor = "bg-green-100 text-green-800";
                break;
            default:
                statusColor = "bg-gray-100 text-gray-800";
        }

        return (
            <span className={`px-2 py-1 rounded-md text-sm ${statusColor}`}>
                {rowData.status}
            </span>
        );
    };

    function handleDelete(id)
    {
        let modifyData = initialData.filter(taskId => taskId.taskNo !== id);
        setTableData(modifyData);
    }

    const deleteConfirmation = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept: () => handleDelete(id),
            reject: () => console.log("Delete Cancelled"),
        });
    };

    return (
        <>
        <ConfirmDialog />
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <Button
                        label="Add Task"
                        onClick={() => setShow(!show)}
                        className="h-10"
                        size="small"
                        icon="pi pi-plus"
                        severity="primary"
                    />
                    <Button
                        label="My Task"
                        className="h-10 hover:bg-black text-white"
                        size="small"
                        icon="pi pi-user"
                        severity="secondary"
                        outlined
                    />
                </div>

                {/* <div className="w-full md:w-72"> */}
                            <div className="w-full md:w-100">
                                        <IconField iconPosition="left" className="h-10 w-full"  >
                                            <InputIcon className="pi pi-search h-10" />
                                            <InputText placeholder="Start Searching...."  {...register("taskName")} className="h-10 w-full" />
                                        </IconField>
                                    </div>
                    {/* <div className="p-inputgroup flex-1 h-10">
                        <span className="p-inputgroup-addon cursor-pointer">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText placeholder="Start Searching...."  {...register("taskName")}/>
                    </div> */}
                {/* </div> */}
            </div>

            <div className="mx-5">
                <DataTable
                    value={tableData}
                    paginator
                    rows={10}
                    removableSort
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    tableStyle={{ minWidth: "60rem" }}
                    tableClassName="custom-table"
                    paginatorClassName="custom-pagination"
                    emptyMessage={<p className="text-red-500 text-md text-center">No tasks found. Add a new task!</p>}
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                >
                    {headers.map((val) => (
                        <Column
                            sortable={val.key == "sno" || val.key == "taskNo"}
                            key={val.key}
                            field={val.key}
                            header={val.label}
                            headerClassName="custom-table-header"
                        />
                    ))}
                    <Column
                        header="Status"
                        headerClassName="custom-table-header"
                        body={statusTemplate}
                    />
                    <Column
                        header="Action"
                        body={(rowData) => (
                            <div className="flex gap-2 items-center">
                                <button
                                    title="View"
                                    className="text-blue-500 hover:text-blue-700 hover:animate-ping"
                                    onClick={() => handleView(rowData)}
                                >
                                    <i className="pi pi-eye mx-2 cursor-pointer"></i>
                                </button>
                                <button 
                                    title="Delete"
                                    className="text-red-500 hover:text-red-700 hover:animate-bounce"
                                    onClick={()=>deleteConfirmation(rowData.taskNo)}
                                >
                                    <i className="pi pi-trash cursor-pointer"></i>
                                </button>
                            </div>
                        )}
                        headerClassName="custom-table-header"
                    />                  
                </DataTable>
            </div>

            <Dialog
                header="Add Task"
                visible={show}
                style={{ width: "75vw" }}
                onHide={() => setShow(false)}
                modal
                className="p-fluid"
            >
                <AddTask setShow={setShow} />
            </Dialog>
        </>
    );
};

export default Task;
