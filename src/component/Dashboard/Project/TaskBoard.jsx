import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import TaskBoardAddTask from "./TaskBoardAddTask";
import TaskBoardSingleTask from "./TaskBoardSingleTask";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialData = {
    todo: [
        {
            id: "1",
            title: "Profile page UI",
            company: "TaskManagement IT Company",
            date: "21-02-2025",
            priority: "low",
        },
        {
            id: "2",
            title: "Finding bugs and clear",
            company: "TaskManagement IT Company",
            date: "21-02-2025",
            priority: "low",
        },
        {
            id: "3",
            title: "Comment backend and worklog backend",
            company: "TaskManagement IT Company",
            date: "21-02-2025",
            priority: "medium",
        },
        {
            id: "4",
            title: "Adding message UI",
            company: "TaskManagement IT Company",
            date: "21-02-2025",
            priority: "high",
        },
    ],
    doing: [
        {
            id: "5",
            title: "Profile page UI",
            company: "TaskManagement IT Company",
            date: "22-02-2025",
            priority: "high",
        },
        {
            id: "6",
            title: "Working on API integration",
            company: "TaskManagement IT Company",
            date: "22-02-2025",
            priority: "high",
        },
    ],
    completed: [
        {
            id: "7",
            title: "Finding bugs",
            company: "TaskManagement IT Company",
            date: "20-02-2025",
            priority: "high",
        },
        {
            id: "8",
            title: "Setup project structure",
            company: "TaskManagement IT Company",
            date: "20-02-2025",
            priority: "high",
        },
    ],
};

const statusConfig = {
    todo: { label: "To Do", color: "bg-orange-500" },
    doing: { label: "Doing", color: "bg-blue-500" },
    completed: { label: "Completed", color: "bg-green-500" },
};

const TaskBoard = () => {
    const [tasks, setTasks] = useState(initialData);
    const [addTask, setAddTask] = useState(false);
    const [singleTask, setSingleTask] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

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

    const onDragEnd = (result) => {
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
    };

    return (
        <div className="p-6">
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <Button
                        label="Add Task"
                        size="small"
                        icon="pi pi-plus"
                        severity="primary"
                        onClick={() => setAddTask(true)}
                    />
                    <Button
                        label="Export"
                        icon="pi pi-upload"
                        className="p-button-secondary"
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
            <DragDropContext onDragEnd={onDragEnd}>
                <div className="grid auto-cols-[25%] gap-6 grid-flow-col overflow-x-auto mt-4">
                    <div className="bg-gray-200 min-h-fit rounded p-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                                <span className="text-gray-700 font-semibold">
                                    Incomplete
                                </span>
                                <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded">
                                    0
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="cursor-pointer">
                                    <i className="pi pi-angle-left text-gray-500"></i>
                                    <i className="pi pi-angle-right text-gray-500"></i>
                                </div>
                                <div>
                                    <i className="pi pi-ellipsis-h text-gray-500 cursor-pointer"></i>
                                </div>
                            </div>
                        </div>
                        <div className=" flex items-center justify-center bg-white rounded text-gray-500 mt-8">
                            <button
                                className="p-6 flex flex-row gap-3"
                                onClick={() => setAddTask(true)}
                            >
                                <span className="pi pi-plus mt-1"></span>Add
                                Task
                            </button>
                        </div>
                    </div>
                    {Object.entries(tasks).map(([columnId, taskList]) => (
                        <Droppable key={columnId} droppableId={columnId}>
                            {(provided) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    className="bg-gray-200 p-4 rounded min-h-[300px]"
                                >
                                    {/* Header Section with Color, Title, Arrows, and Count */}
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

                                    {/* Task Items */}
                                    {taskList.map((task, index) => (
                                        <Draggable
                                            key={task.id}
                                            draggableId={task.id}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`border-l-4 ${getPriorityColor(
                                                        task.priority
                                                    )} bg-white shadow p-4 mb-4 rounded`}
                                                    onClick={() =>
                                                        setSingleTask(true)
                                                    }
                                                >
                                                    <div className="flex justify-between">
                                                        <h3 className="text-md font-semibold text-gray-700">
                                                            {task.title}
                                                        </h3>
                                                        <span className="text-gray-500 text-sm">
                                                            #{task.id}
                                                        </span>
                                                    </div>
                                                    <p className="text-gray-500 text-sm">
                                                        {task.company}
                                                    </p>
                                                    <div className="flex text-gray-600 mt-2">
                                                        <i className="pi pi-calendar text-red-500 mr-2"></i>
                                                        <span className="text-red-500 text-xs">
                                                            {task.date}
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                    <div className="bg-gray-200 min-h-fit rounded p-2">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 bg-black rounded-full"></span>
                                <span className="text-gray-700 font-semibold">
                                    Waiting for Approval
                                </span>
                                <span className="bg-gray-200 text-gray-500 text-xs px-2 py-1 rounded">
                                    0
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="cursor-pointer">
                                    <i className="pi pi-angle-left text-gray-500"></i>
                                    <i className="pi pi-angle-right text-gray-500"></i>
                                </div>
                                <div>
                                    <i className="pi pi-ellipsis-h text-gray-500 cursor-pointer"></i>
                                </div>
                            </div>
                        </div>
                        <div className="p-8 bg-gray-100 mt-10 gap-6 rounded flex flex-col items-center justify-center">
                            <div>
                                <i className="pi pi-database text-gray-500"></i>
                            </div>
                            <div>
                                <p className="text-gray-500">
                                    No records found
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </DragDropContext>

            <TaskBoardAddTask
                visible={addTask}
                onHide={() => setAddTask(false)}
            />
            <TaskBoardSingleTask
                visible={singleTask}
                onHide={() => setSingleTask(false)}
            />
        </div>
    );
};

export default TaskBoard;
