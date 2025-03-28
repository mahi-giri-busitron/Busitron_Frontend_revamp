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
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../../redux/userManagementSlice";
import toast from "react-hot-toast";

const Task = () => {
    const { register, watch } = useForm({ defaultValues: { taskName: "" } });
    const taskName = watch("taskName");
    const navigate = useNavigate();
    const { roles } = useSelector((store) => store.rolesPermissions);
    const { currentUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();

    const [tasks, setTasks] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [showDialog, setShowDialog] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [shouldReload, setShouldReload] = useState(false);
    const [dialogMode, setDialogMode] = useState("add");
    const [currentTask, setCurrentTask] = useState(null);
    const [originalTasks, setOriginalTasks] = useState([]);

    const userRole = currentUser?.data?.role;

    const userPermissions =
        roles.find((r) => r.role === userRole)?.permissions?.tasks || {};

    const canView = userRole === "SuperAdmin" || userPermissions.view;
    const canAdd = userRole === "SuperAdmin" || userPermissions.add;
    const canEdit = userRole === "SuperAdmin" || userPermissions.update;
    const canDelete = userRole === "SuperAdmin" || userPermissions.delete;

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get("/api/v1/task/getAllTasks");
                const formattedTasks = response.data.data.map(
                    (task, index) => ({
                        ...task,
                        sno: index + 1,
                        startDate: task.startDate?.split("T")[0] || "",
                        dueDate: task.dueDate?.split("T")[0] || "",
                    })
                );
                setTasks(formattedTasks);
                setOriginalTasks(formattedTasks);
            } catch (error) {
                console.error("Error fetching tasks:", error);
            }
        };
        fetchTasks();
    }, [shouldReload]);

    useEffect(() => {
        dispatch(fetchAllUser());
    }, [dispatch]);

    useEffect(() => {
        setFilteredTasks(
            tasks.filter(
                (task) =>
                    task.title.toLowerCase().includes(taskName.toLowerCase()) ||
                    task.assignedTo?.name
                        .toLowerCase()
                        .includes(taskName.toLowerCase())
            )
        );
    }, [taskName, tasks]);

    const handleDelete = async () => {
        setTasks(tasks.filter((task) => task._id !== deleteId));
        setConfirmVisible(false);
        const response = await axios.delete(`/api/v1/task/${deleteId}`);

        if (response?.data.statusCode === 200) {
            toast.success("Task deleted successfully!");
        } else {
            toast.error("Failed to delete task!");
        }
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
            "To Do": "bg-blue-200 text-blue-800",
            Review: "bg-purple-200 text-purple-800",
            Pending: "bg-yellow-200 text-yellow-800",
            "In Progress": "bg-orange-300 text-orange-900",
            Completed: "bg-green-200 text-green-800",
            Close: "bg-gray-300 text-gray-900",
        };
        return (
            <span
                className={`inline-flex justify-center w-[120px] px-2 py-1 rounded-md text-sm ${
                    statusColors[rowData.status] || "bg-gray-100 text-gray-800"
                }`}
            >
                {rowData.status}
            </span>
        );
    };

    // const handleAllTask = () => {
    //     setTasks(originalTasks);
    // };

    // const handleMyTask = () => {
    //     if (!currentUser?.data?._id) {
    //         toast.error("Current user is not defined");
    //         return;
    //     }
    //     setTasks(
    //         originalTasks.filter(
    //             (task) => task.assignedTo._id === currentUser.data._id
    //         )
    //     );
    // };

    return (
        <>
            <ConfirmDialog />
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2">
                    {canAdd && (
                        <Button
                            label="Add Task"
                            onClick={handleAddTask}
                            className="h-9"
                            size="small"
                            icon="pi pi-plus"
                        />
                    )}
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
                    <Column
                        field="taskID"
                        header="Task ID"
                        sortable
                        body={(rowData) => (
                            <span
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() =>
                                    navigate(`/dashboard/task/${rowData._id}`, {
                                        state: rowData,
                                    })
                                }
                            >
                                {rowData?.taskID}
                            </span>
                        )}
                    />
                    <Column
                        field="title"
                        header="Task"
                        body={(rowData) => (
                            <span
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() =>
                                    navigate(`/dashboard/task/${rowData._id}`, {
                                        state: rowData,
                                    })
                                }
                            >
                                {rowData?.title}
                            </span>
                        )}
                    />  
                    <Column field="assignedTo.name" header="Assigned To" />
                    <Column field="assignedBy.name" header="Assigned By" />
                    <Column field="startDate" header="Start Date" />
                    <Column field="dueDate" header="Due Date" />
                    <Column header="Status" body={statusTemplate} />
                    <Column
                        header="Action"
                        body={(rowData) => (
                            <div className="flex gap-3 items-center">
                                {canView && (
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
                                )}
                                {canEdit && (
                                    <button
                                        onClick={() => handleEditTask(rowData)}
                                    >
                                        <i className="pi pi-pen-to-square text-green-500 cursor-pointer"></i>
                                    </button>
                                )}
                                {canDelete && (
                                    <button
                                        onClick={() => {
                                            setConfirmVisible(true);
                                            setDeleteId(rowData._id);
                                        }}
                                    >
                                        <i className="pi pi-trash text-red-500 cursor-pointer"></i>
                                    </button>
                                )}
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
                    setShouldReload={setShouldReload}
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
