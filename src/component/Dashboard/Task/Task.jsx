import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import AddTask from "./AddTask";
import DeleteModal from "../../../shared/DeleteModal";
import axios from "axios";

const Task = () => {
    const { register, watch } = useForm({ defaultValues: { taskName: "" } });
    const taskName = watch("taskName");
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);

    const [dialogMode, setDialogMode] = useState("add");
    const [currentTask, setCurrentTask] = useState(null);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("/api/v1/task/getAllTasks");
                const formattedTasks = response.data.data.map(
                    (task, index) => ({
                        ...task,
                        sno: index + 1,
                        startDate: task.startDate
                            ? task.startDate.split("T")[0]
                            : "",
                        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
                    })
                );
                setTasks(formattedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, []);

    useEffect(() => {
        setFilteredTasks(
            tasks.filter((task) =>
                task.title.toLowerCase().includes(taskName.toLowerCase())
            )
        );
    }, [taskName, tasks]);

    const handleDelete = () => {
        setTasks(tasks.filter((task) => task._id !== deleteId));
        setConfirmVisible(false);
    };

    const handleAddTask = () => {
        setCurrentTask(null);
        setDialogMode("add");
        setShowDialog(true);
    };

    const handleEditTask = (task) => {
        setCurrentTask(task);
        setDialogMode("edit");
        setShowDialog(true);
    };

    const statusTemplate = (rowData) => {
        const statusColors = {
            Pending: "bg-gray-100 text-gray-800",
            "In Progress": "bg-orange-100 text-orange-800",
            Completed: "bg-green-100 text-green-800",
        };
        return (
            <span
                className={`px-2 py-1 rounded-md text-sm ${
                    statusColors[rowData.status] || "bg-gray-100 text-gray-800"
                }`}
            >
                {rowData.status}
            </span>
        );
    };

    return (
        <>
            <ConfirmDialog />
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2">
                    <Button
                        label="Add Task"
                        onClick={handleAddTask}
                        className="h-9"
                        size="small"
                        icon="pi pi-plus"
                    />
                    <Button
                        label="My Task"
                        className="h-9 hover:bg-black text-white"
                        size="small"
                        icon="pi pi-user"
                        outlined
                    />
                </div>
                <div className="w-full md:w-100">
                    <IconField iconPosition="left" className="h-10 w-full">
                        <InputIcon className="pi pi-search h-10" />
                        <InputText
                            placeholder="Start Searching..."
                            {...register("taskName")}
                            className="h-10 w-full"
                        />
                    </IconField>
                </div>
            </div>

            <div className="mx-5">
                <DataTable
                    value={filteredTasks}
                    paginator
                    rows={10}
                    removableSort
                    tableStyle={{ minWidth: "60rem" }}
                >
                    <Column field="taskID" header="Task" sortable />
                    <Column field="title" header="Task" />
                    <Column field="assignedTo.name" header="Assigned To" />
                    <Column field="assignedBy.name" header="Assigned By" />
                    <Column field="startDate" header="Start Date" />
                    <Column field="dueDate" header="Due Date" />
                    <Column header="Status" body={statusTemplate} />
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

                                <button
                                    onClick={() => {
                                        setConfirmVisible(true);
                                        setDeleteId(rowData._id);
                                    }}
                                >
                                    <i className="pi pi-trash text-red-500 cursor-pointer"></i>
                                </button>
                            </div>
                        )}
                    />
                </DataTable>
            </div>

            <Dialog
                header={dialogMode === "edit" ? "Edit Task" : "Add Task"}
                visible={showDialog}
                style={{ width: "75vw" }}
                onHide={() => setShowDialog(false)}
                draggable={false}
            >
                <AddTask
                    setShow={setShowDialog}
                    task={currentTask}
                    mode={dialogMode}
                />
            </Dialog>

            <DeleteModal
                visible={confirmVisible}
                setVisible={setConfirmVisible}
                handleDelete={handleDelete}
            />
        </>
    );
};

export default Task;
