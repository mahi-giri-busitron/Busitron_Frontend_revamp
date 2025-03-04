import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Milestone = () => {
    const [visible, setVisible] = useState(false);
    const [milestones, setMilestones] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const { control, handleSubmit, reset, setValue } = useForm();

    const statusOptions = [
        { label: "Complete", value: "Complete" },
        { label: "Incomplete", value: "Incomplete" },
    ];

    const onSubmit = (data) => {
        const parsedData = {
            ...data,
            cost: parseInt(data.cost, 10) || 0,
            budgetCost: parseInt(data.budgetCost, 10) || 0,
        };

        if (editingId !== null) {
            setMilestones(
                milestones.map((milestone) =>
                    milestone.id === editingId
                        ? { ...milestone, ...parsedData }
                        : milestone
                )
            );
        } else {
            setMilestones([
                ...milestones,
                { id: milestones.length + 1, taskCount: milestones.length + 1, ...parsedData },
            ]);
        }
        setVisible(false);
        reset();
        setEditingId(null);
    };

    const handleEdit = (milestone) => {
        Object.keys(milestone).forEach((key) => setValue(key, milestone[key]));
        setEditingId(milestone.id);
        setVisible(true);
    };

    return (
        <div className="p-6 rounded-lg">
            <div className="mb-6 flex justify-start">
                <Button
                    label="Create Milestone"
                    icon="pi pi-plus"
                    size="small"
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition h-10"
                    onClick={() => setVisible(true)}
                />
            </div>

            <h2 className="text-2xl font-semibold mb-6">MILESTONES</h2>

            <DataTable value={milestones} className="shadow-lg rounded border-none p-5">
                <Column field="title" header="Milestone Title" />
                <Column field="cost" header="Milestone Cost" />
                
                {/* Status Column with Colored Dot */}
                <Column
                    field="status"
                    header="Status"
                    body={(rowData) => (
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-3 h-3 rounded-full ${
                                    rowData.status === "Complete" ? "bg-green-500" : "bg-red-500"
                                }`}
                            ></span>
                            {rowData.status}
                        </div>
                    )}
                />
                
                <Column field="taskCount" header="Task Count" />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div className="flex gap-2">
                            <Button
                                icon="pi pi-pencil"
                                className="p-button-rounded p-button-success"
                                onClick={() => handleEdit(rowData)}
                            />
                            <Button
                                icon="pi pi-trash"
                                className="p-button-rounded p-button-danger"
                                onClick={() =>
                                    setMilestones(
                                        milestones.filter(
                                            (milestone) => milestone.id !== rowData.id
                                        )
                                    )
                                }
                            />
                        </div>
                    )}
                />
            </DataTable>

            <Dialog
                header="Milestone Details"
                visible={visible}
                style={{ width: "60vw" }}
                className="shadow-4xl rounded-2xl"
                onHide={() => setVisible(false)}
                modal
            >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <h3 className="text-2xl font-semibold mb-4">
                        {editingId !== null ? "Edit Milestone" : "Create Milestone"}
                    </h3>
                    <hr className="mb-1 border-gray-300" />

                    <div className="grid grid-cols-2 gap-8 mb-6 rounded-2xl mt-5">
                        <div>
                            <label className="block text-m font-medium mb-1 text-gray-600">
                                Milestone Title *
                            </label>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <InputText
                                        placeholder="Enter Milestone Title"
                                        className="w-full p-4 border rounded-md shadow-sm hover:border-blue-500"
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-m font-medium mb-1 text-gray-600">
                                Milestone Cost
                            </label>
                            <Controller
                                name="cost"
                                control={control}
                                render={({ field }) => (
                                    <InputText
                                        placeholder="E.g. 10000"
                                        className="w-full p-2 border rounded-md shadow-sm hover:border-blue-500"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(e.target.value.replace(/\D/g, ""))
                                        }
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex gap-7 mb-6">
                        <div className="flex-1">
                            <label className="block text-m font-medium mb-1 text-gray-600">
                                Status
                            </label>
                            <Controller
                                name="status"
                                control={control}
                                render={({ field }) => (
                                    <Dropdown
                                        options={statusOptions}
                                        placeholder="Select Status"
                                        className="w-full border rounded-lg shadow-sm hover:border-blue-500"
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-m font-medium mb-1 text-gray-600">
                                Budget Cost
                            </label>
                            <Controller
                                name="budgetCost"
                                control={control}
                                render={({ field }) => (
                                    <InputText
                                        placeholder="Enter Amount"
                                        className="w-full p-2 border rounded-md shadow-sm hover:border-blue-500"
                                        {...field}
                                        onChange={(e) =>
                                            field.onChange(e.target.value.replace(/\D/g, ""))
                                        }
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 mb-7">
                        <div>
                            <label className="block text-m font-medium mb-1 text-gray-600">
                                Start Date
                            </label>
                            <Controller
                                name="startDate"
                                control={control}
                                render={({ field }) => (
                                    <Calendar
                                        dateFormat="dd/mm/yy"
                                        className="w-full p-2 shadow-sm"
                                        showIcon
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="block text-m font-medium mb-1 text-gray-600">
                                End Date
                            </label>
                            <Controller
                                name="endDate"
                                control={control}
                                render={({ field }) => (
                                    <Calendar
                                        dateFormat="dd/mm/yy"
                                        className="w-full p-2 shadow-sm"
                                        showIcon
                                        {...field}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                        <Button label="Close" className="p-button-text" onClick={() => setVisible(false)} />
                        <Button label="Save" type="submit" className="bg-blue-500 text-white px-2 py-2 rounded-md" />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default Milestone;
