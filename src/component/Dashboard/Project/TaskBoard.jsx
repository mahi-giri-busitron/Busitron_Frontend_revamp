import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const statusConfig = {
    "To Do": { label: "To Do", color: "bg-blue-200 text-blue-80" },
    "In Progress": {
        label: "In Progress",
        color: "bg-orange-300 text-orange-900",
    },
    Review: { label: "Review", color: "bg-purple-200 text-purple-800" },
    Completed: { label: "Completed", color: "bg-green-200 text-green-800" },
    Pending: { label: "Pending", color: "bg-yellow-200 text-yellow-800" },
    Close: { label: "Close", color: "bg-gray-300 text-gray-900" },
};

const TaskBoard = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const { roles = [] } = useSelector((store) => store.rolesPermissions) || {};
    const { currentUser } = useSelector((store) => store.user);
    const userRole = currentUser?.data?.role;

    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    const dispatch = useDispatch();
    const { particular } = useSelector((state) => state.project);
    const userPermissions =
        roles.find((r) => r.role === userRole)?.permissions?.projects || {};

    const canView = userRole === "SuperAdmin" || userPermissions.view;
    const canAdd = userRole === "SuperAdmin" || userPermissions.add;
    const canEdit = userRole === "SuperAdmin" || userPermissions.update;
    const canDelete = userRole === "SuperAdmin" || userPermissions.delete;

    useEffect(() => {
        if (!particular || particular === null) {
            dispatch(getParticularproject(id));
        }
    }, [dispatch, particular]);

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "low":
                return "border-yellow-200";
            case "medium":
                return "border-orange-400";
            case "high":
                return "border-red-600";
            default:
                return "border-gray-300";
        }
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/task/gettaskbyid/${id}`
                );

                const formattedTasks = response.data.data.tasks.map(
                    (task, index) => ({
                        ...task,
                        sno: index + 1,
                        startDate: task.startDate
                            ? task.startDate.split("T")[0]
                            : "",
                        dueDate: task.dueDate ? task.dueDate.split("T")[0] : "",
                    })
                );

                const updatedTasks = {
                    "To Do": [],
                    "In Progress": [],
                    Review: [],
                    Completed: [],
                };

                formattedTasks.forEach((task) => {
                    const status = task.status;
                    if (updatedTasks[status]) {
                        updatedTasks[status].push(task);
                    }
                });

                setTasks(updatedTasks);
            } catch (error) {
                toast.error(
                    error.response ? error.response.data : error.message
                );
            }
        };
        fetchTasks();
    }, []);

    const onDragEnd = async (result) => {
        if (!canEdit) {
            toast.error("You do not have permission to move tasks.");
            return;
        }  
        if (!result.destination) return;
    
        const { source, destination } = result;
    
        const sourceColumn = [...tasks[source.droppableId]];
        const destinationColumn = [...tasks[destination.droppableId]];
    
        const [movedTask] = sourceColumn.splice(source.index, 1);
        destinationColumn.splice(destination.index, 0, movedTask);
    
        setTasks({
            ...tasks,
            [source.droppableId]: sourceColumn,
            [destination.droppableId]: destinationColumn,
        });
    
        setLoading(true);
    
        try {
            const status = destination.droppableId;
    
            await axios.put(`/api/v1/task/${result.draggableId}`, { status });
    
            toast.success("Task updated successfully!");
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        } finally {
            setLoading(false);
        }
    };   

    return (
        <div className="p-6">
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid auto-cols-[25%] gap-6 grid-flow-col overflow-x-auto mt-4">
                    {Object.entries(tasks).map(([columnId, taskList]) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-gray-100 p-4 rounded h-full"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`w-3 h-3 ${statusConfig[columnId].color} rounded-full`}
                                            ></span>
                                            <span className="text-gray-700 font-semibold">
                                                {statusConfig[columnId].label}
                                            </span>
                                            <span className="bg-gray-300 text-gray-700 text-xs px-2 py-1 rounded">
                                                {taskList.length}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="cursor-pointer flex gap-1">
                                                <i className="pi pi-angle-left text-gray-500"></i>
                                                <i className="pi pi-angle-right text-gray-500"></i>
                                            </div>
                                            <div>
                                                <i className="pi pi-ellipsis-h text-gray-500 cursor-pointer"></i>
                                            </div>
                                        </div>
                                    </div>

                                    {taskList.map((task, index) => (
                                        <Draggable
                                            key={task._id}
                                            draggableId={task._id}
                                            index={index}
                                            isDragDisabled={!canEdit}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...(canEdit
                                                        ? provided.draggableProps
                                                        : {})}
                                                    {...(canEdit
                                                        ? provided.dragHandleProps
                                                        : {})}
                                                    className={`border-l-4 ${getPriorityColor(
                                                        task.priority
                                                    )} bg-white shadow p-4 mb-4 rounded ${
                                                        !canEdit
                                                            ? "opacity-50 cursor-not-allowed"
                                                            : ""
                                                    }`}
                                                >
                                                    <span
                                                        className="cursor-pointer"
                                                        onClick={() =>
                                                            navigate(
                                                                `/dashboard/task/${task._id}`,
                                                                { state: task }
                                                            )
                                                        }
                                                    >
                                                        <div className="flex justify-between">
                                                            <h3 className="text-md font-semibold text-gray-700">
                                                                {task.title}
                                                            </h3>
                                                            <span className="text-gray-500 text-sm">
                                                                #{task.taskID}
                                                            </span>
                                                        </div>
                                                        <p className="text-gray-500 text-sm">
                                                            {particular?.projectName ||
                                                                "...loading"}
                                                        </p>
                                                        <div className="flex text-gray-600 mt-2">
                                                            <i className="pi pi-calendar text-red-500 mr-2"></i>
                                                            <span className="text-red-500 text-xs">
                                                                {task.startDate}
                                                            </span>
                                                        </div>
                                                    </span>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
};

export default TaskBoard;
