import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const TaskSettings = () => {
    const [beforeDays, setBeforeDays] = useState(0);
    const [afterDays, setAfterDays] = useState(0);
    const [reminderOnDueDate, setReminderOnDueDate] = useState(true);
    const [status, setStatus] = useState("Incomplete");
    const [taskboardLength, setTaskboardLength] = useState(10);
    const [toggleStates, setToggleStates] = useState({});

    const statusOptions = [
        { label: "Incomplete", value: "Incomplete" },
        { label: "To Do", value: "To Do" },
        { label: "Review", value: "Review" },
        { label: "Testing", value: "Testing" },
        { label: "Completed", value: "Completed" },
    ];

    const toggleOptions = [
        "Task category",
        "Project",
        "Start Date",
        "Due Date",
        "Assigned To",
        "Description",
        "Label",
        "Assigned by",
        "Status",
        "Priority",
        "Make Private",
        "Time estimate",
        "Comment",
        "Add File",
        "Sub Task",
        "Work log",
        "Notes",
        "History",
        "Hours Logged",
    ];

    const handleToggleChange = (option) => {
        setToggleStates((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const handleSave = () => {
        setSavedStates(toggleStates);
    };

    return (
        <>
            <div className="w-full mx-auto">
                <Card title="Task Settings">
                    <h3 className="text-lg font-medium mb-4">Send Reminder</h3>
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">
                                Send task reminder before X days of due date
                            </label>
                            <InputNumber
                                value={beforeDays}
                                onValueChange={(e) => setBeforeDays(e.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">
                                Send task reminder on the day of due date
                            </label>
                            <div className="flex gap-4">
                                <div className="flex items-center">
                                    <RadioButton
                                        inputId="yes"
                                        name="reminder"
                                        value={true}
                                        onChange={() =>
                                            setReminderOnDueDate(true)
                                        }
                                        checked={reminderOnDueDate}
                                    />
                                    <label htmlFor="yes" className="ml-2">
                                        Yes
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <RadioButton
                                        inputId="no"
                                        name="reminder"
                                        value={false}
                                        onChange={() =>
                                            setReminderOnDueDate(false)
                                        }
                                        checked={!reminderOnDueDate}
                                    />
                                    <label htmlFor="no" className="ml-2">
                                        No
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between">
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">
                                Send task reminder after X days of due date
                            </label>
                            <InputNumber
                                value={afterDays}
                                onValueChange={(e) => setAfterDays(e.value)}
                                className="w-full"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-1">
                                Status
                            </label>
                            <Dropdown
                                value={status}
                                options={statusOptions}
                                onChange={(e) => setStatus(e.value)}
                                placeholder="Select Status"
                                className="w-full"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 mb-1">
                                Taskboard Default Length
                            </label>
                            <InputNumber
                                value={taskboardLength}
                                onValueChange={(e) =>
                                    setTaskboardLength(e.value)
                                }
                                className="w-full"
                            />
                        </div>
                    </div>
                </Card>
            </div>
            <div className="p-4">
                <div className="grid grid-cols-4 gap-4 mt-4">
                    {toggleOptions.map((option) => (
                        <div key={option} className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                checked={toggleStates[option] || false}
                                onChange={() => handleToggleChange(option)}
                            />
                            <span>{option}</span>
                        </div>
                    ))}
                </div>
                <div className="pt-5">
                    <Button
                        label="Save"
                        icon="pi pi-check"
                        onClick={handleSave}
                        className="m-4"
                        size="small"
                    />
                </div>
            </div>
        </>
    );
};

export default TaskSettings;
