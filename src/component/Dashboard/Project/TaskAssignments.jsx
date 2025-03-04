import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { InputText } from "primereact/inputtext";
import AddTask from "../Task/AddTask";
import { Dialog } from "primereact/dialog";

const TaskAssignments = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [show, setShow] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const { control, setValue, getValues } = useForm({
        defaultValues: {
            tasks: [
                {
                    id: 1,
                    task: "Work log functionality",
                    completedOn: "--",
                    milestone: "Milestone 1",
                    startDate: "22-02-2025",
                    dueDate: "23-02-2025",
                    estimatedTime: "0s",
                    hoursLogged: "0s",
                    assignedTo: "User 1",
                    status: "To Do",
                    project: "laserlink",
                },
                {
                    id: 2,
                    task: "Ticket page UI",
                    completedOn: "--",
                    milestone: "Milestone 2",
                    startDate: "22-02-2025",
                    dueDate: "22-02-2025",
                    estimatedTime: "0s",
                    hoursLogged: "0s",
                    assignedTo: "User 2",
                    status: "Doing",
                    project: "laserlink",
                },
            ],
        },
    });

    const statuses = [
        { label: "To Do", value: "To Do" },
        { label: "Doing", value: "Doing" },
        { label: "Done", value: "Done" },
    ];

    const tasks = getValues("tasks");

    const filteredTasks = tasks.filter(
        (task) =>
            task.task.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.assignedTo.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.milestone.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEditTask = (task) => {
        setSelectedTask(task);
        setShow(true);
    };

    const actionTemplate = (rowData) => {
        let menu = React.createRef();
        const items = [
            { label: "View", icon: "pi pi-eye" },
            {
                label: "Edit",
                icon: "pi pi-pencil",
                command: () => handleEditTask(rowData),
            },
            { label: "Duplicate", icon: "pi pi-copy" },
            { label: "Pin Task", icon: "pi pi-thumbtack" },
        ];

        return (
            <div>
                <Menu
                    model={items}
                    popup
                    ref={menu}
                    id={`menu_${rowData.id}`}
                />
                <Button
                    icon="pi pi-ellipsis-v"
                    onClick={(event) => menu.current.toggle(event)}
                    aria-controls={`menu_${rowData.id}`}
                    aria-haspopup
                />
            </div>
        );
    };

    const statusBodyTemplate = (rowData, { rowIndex }) => {
        return (
            <Controller
                name={`tasks[${rowIndex}].status`}
                control={control}
                render={({ field }) => (
                    <Dropdown
                        value={field.value}
                        options={statuses}
                        onChange={(e) => {
                            field.onChange(e.value);
                            const updatedTasks = [...getValues("tasks")];
                            updatedTasks[rowIndex].status = e.value;
                            setValue("tasks", updatedTasks);
                        }}
                        placeholder="Status"
                    />
                )}
            />
        );
    };

    return (
        <div className="p-4">
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <Button
                        label="Add Task"
                        onClick={() => {
                            setSelectedTask(null); // Clear when adding new
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
                    <Column field="id" header="Code" />
                    <Column field="task" header="Task" />
                    <Column field="startDate" header="Start Date" />
                    <Column
                        field="status"
                        header="Status"
                        body={statusBodyTemplate}
                    />
                    <Column body={actionTemplate} header="Action" />
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
                <AddTask setShow={setShow} initialData={selectedTask} />
            </Dialog>
        </div>
    );
};

export default TaskAssignments;
