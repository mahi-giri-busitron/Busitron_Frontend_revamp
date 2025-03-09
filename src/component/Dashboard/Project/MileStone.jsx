import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ProgressSpinner } from "primereact/progressspinner";
import moment from "moment";
import { useSelector } from "react-redux";

const Milestone = ({ projectId }) => {
    const [visible, setVisible] = useState(false);
    const [milestones, setMilestones] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const { control, handleSubmit, reset, setValue } = useForm();
    const [loading, setLoading] = useState(false);
    const { roles = [] } = useSelector((store) => store.rolesPermissions) || {};
    const { currentUser } = useSelector((store) => store.user);
    const userRole = currentUser?.data?.role;
    const userPermissions =
        roles.find((r) => r.role === userRole)?.permissions?.projects || {};

    const canView = userRole === "SuperAdmin" || userPermissions.view;
    const canAdd = userRole === "SuperAdmin" || userPermissions.add;
    const canEdit = userRole === "SuperAdmin" || userPermissions.update;
    const canDelete = userRole === "SuperAdmin" || userPermissions.delete;
    const statusOptions = [
        { label: "Complete", value: "Complete" },
        { label: "Incomplete", value: "Incomplete" },
    ];

    useEffect(() => {
        const fetchMilestones = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/project/projects/${projectId}/milestones`
                );
                setMilestones(response.data.data);
            } catch (error) {
                toast.error("Failed to fetch milestones.");
            }
        };

        fetchMilestones();
    }, [projectId]);

    const onSubmit = async (data) => {
        const parsedData = {
            ...data,
            cost: parseInt(data.cost, 10) || 0,
            budgetCost: parseInt(data.budgetCost, 10) || 0,
        };
        setEditingId(data);

        setLoading(true);

        try {
            if (editingId !== null) {
                const response = await axios.put(
                    `/api/v1/project/projects/${projectId}/milestones/${editingId}`,
                    parsedData
                );
                setMilestones(
                    milestones.map((milestone) =>
                        milestone._id === editingId
                            ? response.data.data
                            : milestone
                    )
                );
                toast.success("Milestone updated successfully!");
            } else {
                const response = await axios.post(
                    `/api/v1/project/projects/${projectId}/milestones`,
                    parsedData
                );

                setMilestones(response.data.data.mileStone);
                toast.success("Milestone created successfully!");
            }
            setVisible(false);
            reset();
            setEditingId(null);
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (milestone) => {
        Object.keys(milestone).forEach((key) => setValue(key, milestone[key]));
        setEditingId(milestone._id);
        setVisible(true);
    };

    const handleDelete = async (milestoneId) => {
        setLoading(true);
        try {
            await axios.delete(
                `/api/v1/project/projects/${projectId}/milestones/${milestoneId}`
            );
            setMilestones(
                milestones.filter((milestone) => milestone._id !== milestoneId)
            );
            toast.success("Milestone deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete milestone.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 rounded-lg">
            {loading && (
                <ProgressSpinner
                    style={{
                        width: "50px",
                        height: "50px",
                    }}
                    strokeWidth="8"
                    fill="var(--surface-ground)"
                    animationDuration=".5s"
                />
            )}
            <div className="mb-6 flex justify-start">
                {canAdd && (
                    <Button
                        label="Create Milestone"
                        icon="pi pi-plus"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition h-10"
                        onClick={() => setVisible(true)}
                    />
                )}
            </div>

            <h2 className="text-2xl font-semibold mb-6">MILESTONES</h2>

            <DataTable
                value={milestones}
                className="shadow-lg rounded border-none p-5"
            >
                <Column field="title" header="Milestone Title" />
                <Column
                    field="startDate"
                    header="Start Date"
                    body={(rowData) => (
                        <div className="flex items-center gap-2">
                            {moment(rowData.startDate).format("DD-MM-YYYY")}
                        </div>
                    )}
                />
                <Column
                    field="endDate"
                    header="End Date"
                    body={(rowData) => (
                        <div className="flex items-center gap-2">
                            {moment(rowData.endDate).format("DD-MM-YYYY")}
                        </div>
                    )}
                />
                <Column
                    field="status"
                    header="Status"
                    body={(rowData) => (
                        <div className="flex items-center gap-2">
                            <span
                                className={`w-3 h-3 rounded-full ${
                                    rowData.status === "Complete"
                                        ? "bg-green-500"
                                        : "bg-red-500"
                                }`}
                            ></span>
                            {rowData.status}
                        </div>
                    )}
                />

                <Column
                    header="Action"
                    body={(rowData) => (
                        <div className="flex">
                            {canEdit && (
                                <Button
                                    icon="pi pi-pen-to-square"
                                    className=" "
                                    style={{
                                        backgroundColor: "white",
                                        color: "green",
                                        outline: "none",
                                        boxShadow: "none",
                                        border: "none",
                                    }}
                                    onClick={() => handleEdit(rowData)}
                                />
                            )}
                            {canDelete && (
                                <Button
                                    icon="pi pi-trash"
                                    className="focus:outline-none focus:ring-0"
                                    style={{
                                        backgroundColor: "white",
                                        color: "red",
                                        boxShadow: "none",
                                        border: "none",
                                    }}
                                    onClick={() => handleDelete(rowData._id)}
                                />
                            )}
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
                        {editingId !== null
                            ? "Edit Milestone"
                            : "Create Milestone"}
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
                                        value={
                                            field.value
                                                ? new Date(field.value)
                                                : null
                                        }
                                        onChange={(e) =>
                                            field.onChange(e.value)
                                        }
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
                                        value={
                                            field.value
                                                ? new Date(field.value)
                                                : null
                                        }
                                        onChange={(e) =>
                                            field.onChange(e.value)
                                        }
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-3">
                        {loading ? (
                            <ProgressSpinner
                                style={{
                                    width: "50px",
                                    height: "50px",
                                }}
                                strokeWidth="8"
                                fill="var(--surface-ground)"
                                animationDuration=".5s"
                            />
                        ) : (
                            <>
                                <Button
                                    label="Close"
                                    className="p-button-text"
                                    onClick={() => setVisible(false)}
                                />
                                <Button
                                    label="Save"
                                    type="submit"
                                    className="bg-blue-500 text-white px-2 py-2 rounded-md"
                                />{" "}
                            </>
                        )}
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default Milestone;
