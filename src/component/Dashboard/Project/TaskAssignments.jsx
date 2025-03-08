import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import AddTask from "../Task/AddTask";
import { Dialog } from "primereact/dialog";
import axios from "axios";
import moment from "moment";
import { useParams, useNavigate } from "react-router-dom";
const TaskAssignments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [mode, setMode] = useState("");
    const [shouldReload, setShouldReload] = useState(false);
    const { control, setValue, getValues, reset } = useForm({
        defaultValues: {
            tasks: [],
        },
    });

    const { id } = useParams();

    const fetchTasks = async () => {
        try {
            const response = await axios.get(`/api/v1/task/gettaskbyid/${id}`);
            reset({ tasks: response.data.data.tasks });
        } catch (error) {
            console.error(
                "Error:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        fetchTasks();
    }, [id, shouldReload]);

    const statuses = [
        { label: "In Progress", value: "In Progress" },
        { label: "Pending", value: "Pending" },
        { label: "Review", value: "Review" },
        { label: "Deleted", value: "Deleted" },
        { label: "Completed", value: "Completed" },
        { label: "Close", value: "Close" },
    ];
    const tasks = getValues("tasks");

    const filteredTasks = tasks.filter(
        (task) =>
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditTask = (task) => {
        setMode("edit");
        setSelectedTask(task);
        setShow(true);
    };

    return (
        <div className="p-4">
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <Button
                        label="Add Task"
                        onClick={() => {
                            setSelectedTask(null);
                            setMode("add");
                            setShow(true);
                        }}
                        size="small"
                        icon="pi pi-plus"
                        severity="primary"
                    />
                </div>

                <div className="w-full md:w-72">
                    <div className="p-inputgroup flex-1 h-9">
                        <span className="p-inputgroup-addon cursor-pointer">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText
                            placeholder="Start Searching...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="p-3">
                <DataTable value={filteredTasks} paginator rows={5}>
                    <Column
                        header="Task Id"
                        field="taskID"
                        body={(rowData) => (
                            <div className="flex gap-3 items-center">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/task/${rowData._id}`,
                                            { state: rowData }
                                        )
                                    }
                                >
                                    <span className="cursor-pointer">
                                        {rowData.taskID}
                                    </span>
                                </button>
                            </div>
                        )}
                    />
                    <Column
                        field="title"
                        header="Task"
                        body={(rowData) => (
                            <div className="flex gap-3 items-center">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/task/${rowData._id}`,
                                            { state: rowData }
                                        )
                                    }
                                >
                                    <span className="cursor-pointer">
                                        {rowData.title}
                                    </span>
                                </button>
                            </div>
                        )}
                    />
                    <Column
                        field="assignedTo"
                        header="Assigned To"
                        body={(rowData) => (
                            <div className="flex gap-3 items-center">
                                <span className="cursor-pointer">
                                    {rowData.assignedBy.name}
                                </span>
                            </div>
                        )}
                    />
                    <Column
                        field="startDate"
                        header="Start Date"
                        body={(rowData) =>
                            moment(rowData.startDate).format("DD-MM-YYYY")
                        }
                    />
                    <Column
                        field="endDate"
                        header="End Date"
                        body={(rowData) =>
                            moment(rowData.startDate).format("DD-MM-YYYY")
                        }
                    />
                    <Column
                        field="status"
                        header="Status"
                        body={(rowData) => rowData.status}
                    />
                    <Column
                        header="Action"
                        body={(rowData) => (
                            <div className="flex gap-3 items-center">
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/dashboard/task/${rowData._id}`,
                                            { state: rowData }
                                        )
                                    }
                                >
                                    <i className="pi pi-eye text-blue-500 cursor-pointer"></i>
                                </button>
                                <button onClick={() => handleEditTask(rowData)}>
                                    <i className="pi pi-pen-to-square text-green-500 cursor-pointer"></i>
                                </button>
                            </div>
                        )}
                    />
                </DataTable>
            </div>
            <Dialog
                header={selectedTask ? "Edit Task" : "Add Task"}
                visible={show}
                style={{ width: "75vw" }}
                onHide={() => setShow(false)}
                modal
                className="p-fluid"
            >
                <AddTask
                    setShow={setShow}
                    task={selectedTask}
                    mode={mode}
                    setShouldReload={setShouldReload}
                />
            </Dialog>
        </div>
    );
};
export default TaskAssignments;
