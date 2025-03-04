import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "primereact/avatar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Menu } from "primereact/menu";
import { Dropdown } from "primereact/dropdown";
import axios from "axios";
import toast from "react-hot-toast";

const WorkLogSection = ({ showWorkLog, taskData }) => {
    const [newLog, setNewLog] = useState("");
    const [selectedTimeSpent, setSelectedTimeSpent] = useState(null);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedLog, setEditedLog] = useState("");
    const [workLog, setWorkLog] = useState([]);
    const menuRefs = useRef([]);

    const timeOptions = ["1hr", "2hr", "4hr", "8hr"];

    const handleAddLog = async () => {
        if (!newLog.trim() || !selectedTimeSpent) return;

        try {
            const response = await axios.post(
                `/api/v1/workLog/create-workLog/${taskData._id}`,
                {
                    log: newLog,
                    timeSpent: selectedTimeSpent,
                }
            );

            if (response.status === 201) {
                setWorkLog([...workLog, response.data.data]);
                setNewLog("");
                setSelectedTimeSpent(null);
                toast.success("Work log added successfully!");
            }
        } catch (error) {
            console.error("Error adding work log:", error);
        }
    };

    const handleEditLog = (index) => {
        setEditingIndex(index);
        setEditedLog(workLog[index].log);
    };

    const handleUpdateLog = async (index) => {
        try {
            const updatedLog = { ...workLog[index], log: editedLog };
            await axios.put(
                `/api/v1/workLog/update-workLog/${workLog[index]._id}`,
                updatedLog
            );
            const updatedLogs = [...workLog];
            updatedLogs[index] = updatedLog;
            setWorkLog(updatedLogs);
            setEditingIndex(null);
        } catch (error) {
            console.error("Error updating work log:", error);
        }
    };

    const handleDeleteLog = async (index) => {
        try {
            await axios.delete(
                `/api/v1/workLog/delete-workLog/${workLog[index]._id}`
            );
            setWorkLog(workLog.filter((_, i) => i !== index));
        } catch (error) {
            console.error("Error deleting work log:", error);
        }
    };

    const fetchWorkLog = async () => {
        try {
            const response = await axios.get(
                `/api/v1/workLog/worklogs/${taskData._id}`
            );
            console.log(response);

            setWorkLog(response.data.data);
        } catch (error) {
            console.error("Error fetching work logs:", error);
        }
    };

    useEffect(() => {
        if (taskData?._id) {
            fetchWorkLog();
        }
    }, [taskData]);

    return (
        showWorkLog && (
            <div className="mt-4 h-96 overflow-auto">
                <h3 className="text-gray-600 text-lg font-semibold">
                    Work Log
                </h3>

                <div className="mt-2 flex flex-col gap-2">
                    <Dropdown
                        value={selectedTimeSpent}
                        options={timeOptions}
                        onChange={(e) => setSelectedTimeSpent(e.value)}
                        placeholder="Select Time Spent"
                        className="p-dropdown-sm"
                    />

                    <InputTextarea
                        value={newLog}
                        onChange={(e) => setNewLog(e.target.value)}
                        rows={3}
                        placeholder="Add a work log..."
                        className="p-inputtext-sm"
                    />

                    <div className="flex justify-end">
                        <Button
                            label="Add Log"
                            onClick={handleAddLog}
                            className="p-button-sm p-button-primary"
                        />
                    </div>
                </div>

                <div className="mt-4">
                    {workLog.length > 0 ? (
                        workLog.map((log, index) => (
                            <div
                                key={log._id}
                                className="p-3 rounded-md mb-2 bg-gray-50 relative"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            label={
                                                log.loggedBy?.name?.charAt(0) ||
                                                "U"
                                            }
                                            shape="circle"
                                            className="bg-blue-500 text-white"
                                        />
                                        <p className="text-sm">
                                            <span className="font-semibold text-blue-600 cursor-pointer">
                                                {log.loggedBy?.name || "User"}
                                            </span>{" "}
                                            logged work -{" "}
                                            <span className="text-gray-600">
                                                {new Date(
                                                    log.createdAt
                                                ).toLocaleDateString()}
                                            </span>
                                        </p>
                                    </div>

                                    <div>
                                        <Button
                                            icon="pi pi-ellipsis-v"
                                            className="p-button-text p-button-sm"
                                            onClick={(event) =>
                                                menuRefs.current[index]?.toggle(
                                                    event
                                                )
                                            }
                                        />
                                        <Menu
                                            model={[
                                                {
                                                    label: "Edit",
                                                    icon: "pi pi-pencil",
                                                    command: () =>
                                                        handleEditLog(index),
                                                },
                                                {
                                                    label: "Delete",
                                                    icon: "pi pi-trash",
                                                    command: () =>
                                                        handleDeleteLog(index),
                                                },
                                            ]}
                                            popup
                                            ref={(el) =>
                                                (menuRefs.current[index] = el)
                                            }
                                        />
                                    </div>
                                </div>

                                {editingIndex === index ? (
                                    <div className="mt-2 p-3">
                                        <InputTextarea
                                            value={editedLog}
                                            onChange={(e) =>
                                                setEditedLog(e.target.value)
                                            }
                                            rows={2}
                                            className="p-inputtext-sm w-full"
                                        />
                                        <div className="flex justify-end gap-2 mt-2">
                                            <Button
                                                label="Update"
                                                onClick={() =>
                                                    handleUpdateLog(index)
                                                }
                                                className="p-button-sm"
                                            />
                                            <Button
                                                label="Cancel"
                                                onClick={() =>
                                                    setEditingIndex(null)
                                                }
                                                className="p-button-sm p-button-secondary"
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-2 text-sm text-gray-700">
                                        <p>
                                            <span className="font-semibold">
                                                Time Spent:
                                            </span>{" "}
                                            {log.timeSpent}
                                        </p>
                                        <p className="italic text-gray-500">
                                            {log.log || "No comment"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm mt-2">
                            No work log available.
                        </p>
                    )}
                </div>
            </div>
        )
    );
};

export default WorkLogSection;
