import React, { useState } from "react";
import { Button } from "primereact/button";
import { ButtonGroup } from "primereact/buttongroup";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Paginator } from "primereact/paginator";
import { Dialog } from "primereact/dialog";
import AddTask from "./AddTask";

const Task = () => {
    const actionTemplate = () => {
        return (
            <div className="flex gap-2">
                <i className="pi pi-ellipsis-v cursor-pointer"></i>
            </div>
        );
    };

    const headers = [
        { label: "S.No", key: "sno" },
        { label: "Task No", key: "taskNo" },
        { label: "Task", key: "task" },
        { label: "Assigned By", key: "assignedBy" },
        // { label: "Start Date", key: "startDate" },
        // { label: "Due Date", key: "dueDate" },
        { label: "Status", key: "status" },
        // { label: "Action", key: "action" },
    ];

    const taskData = [
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T001",
            sno: 1,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
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
            // action : actionTemplate()
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T003",
            sno: 3,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
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
            // action : actionTemplate()
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T005",
            sno: 5,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
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
            // action : actionTemplate()
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T007",
            sno: 7,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T008",
            sno: 8,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T009",
            sno: 9,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
        },
        {
            task: "Build UiasdfadsfdfDFwdfdsf",
            taskNo: "T0010",
            sno: 10,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
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
            // action : actionTemplate()
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
            // action : actionTemplate()
        },
        {
            task: "Frontend",
            taskNo: "T0013",
            sno: 13,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "2024-02-10",
            dueDate: "2024-02-20",
            estimatedTime: "4h",
            hoursLogged: "3h",
            assignedBy: "Charlie",
            // action : actionTemplate()
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
            // action : actionTemplate()
        },
        {
            task: "Database Setup",
            taskNo: "T0015",
            sno: 15,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "2024-02-10",
            dueDate: "2024-02-20",
            estimatedTime: "6h",
            hoursLogged: "5h",
            assignedBy: "Eve",
            // action : actionTemplate()
        },
        {
            task: "Build UI",
            taskNo: "T0016",
            sno: 16,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
        },
        {
            task: "Build UI",
            taskNo: "T0017",
            sno: 17,
            status: "In Progress",
            completedOn: "2024-02-18",
            startDate: "10-02-2012",
            dueDate: "2024-02-20",
            estimatedTime: "5h",
            hoursLogged: "4h",
            assignedBy: "Alice",
            // action : actionTemplate()
        },
    ];

    const [first, setFirst] = useState(0);
    const [rows, setRows] = useState(10);

    const [show, setShow] = useState(false);

    const onPageChange = (event) => {
        setFirst(event.first);
        setRows(event.rows);
    };

    return (
        <>
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <Button
                        label="Add Task"
                        onClick={() => setShow(!show)}
                        className="h-9"
                        size="small"
                        icon="pi pi-plus"
                        severity="primary"
                    />
                    <Button
                        label="My Task"
                        className="h-9 hover:bg-black text-white"
                        size="small"
                        icon="pi pi-user"
                        severity="secondary"
                        outlined
                    />
                    {/* <Button
                        label="Export"
                        className="h-9"
                        size="small"
                        icon="pi pi-file-export"
                        severity="secondary"
                        outlined
                    /> */}
                </div>

                <div className="w-full md:w-72">
                    <div className="p-inputgroup flex-1 h-9">
                        <span className="p-inputgroup-addon cursor-pointer">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText placeholder="Start Searching...." />
                    </div>
                </div>
            </div>

            <div className="mx-5">
                <DataTable
                    value={taskData}
                    paginator
                    rows={10}
                    removableSort
                    rowsPerPageOptions={[5, 10, 15, 20]}
                    tableStyle={{ minWidth: "60rem" }}
                    tableClassName="custom-table"
                    paginatorClassName="custom-pagination"
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
                        header="Action"
                        body={(rowData) => (
                            <div className="flex gap-2">
                                <button
                                    className="text-blue-500 hover:text-blue-700"
                                    onClick={() => handleView(rowData)}
                                >
                                    <i className="pi pi-eye mx-2 cursor-pointer"></i>
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-700"
                                    onClick={() => handleDelete(rowData)}
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
