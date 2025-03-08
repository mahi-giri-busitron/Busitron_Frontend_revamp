import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import toast from "react-hot-toast";
import axios from "axios";

const TaskSettings = () => {
    const [beforeDays, setBeforeDays] = useState(1);
    const [afterDays, setAfterDays] = useState(1);
    const [reminderOnDueDate, setReminderOnDueDate] = useState("NO");
    const [status, setStatus] = useState("To Do");
    const [activeIndex, setActiveIndex] = useState(0);
    const [reminder, setReminder] = useState("");

    const statusOptions = [
        "To Do",
        "In Progress",
        "Review",
        "Pending",
        "Completed",
    ].map((status) => ({ label: status, value: status }));

    const ReminderOptions = ["YES", "NO"].map((reminder) => ({
        label: reminder,
        value: reminder,
    }));

    const items = [{ label: "Task Settings", icon: "pi pi-list-check" }];

    const handleSave = async () => {
        const reminderPayload = {
            beforeDueDate: beforeDays,
            afterDueDate: afterDays,
            sendTaskReminder: reminder,
            status: status,
        };

        try {
            await axios.post(
                "http://localhost:5421/api/v1/tasksettings/send-reminder",
                reminderPayload
            );
            toast.success("Send reminder successfully...");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to send your message.",
                {
                    duration: 3000,
                    position: "top-right",
                }
            );
        }
    };

    return (
        <div className="w-full mx-auto">
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            />
            <div className="p-4 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-medium">Send Reminder</h3>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label>
                            Send task reminder before X days of due date
                        </label>
                        <InputNumber
                            value={beforeDays}
                            onValueChange={(e) => setBeforeDays(e.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label>
                            Send task reminder after X days of due date
                        </label>
                        <InputNumber
                            value={afterDays}
                            onValueChange={(e) => setAfterDays(e.value)}
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label>Select Task Status</label>
                        <Dropdown
                            value={status}
                            options={statusOptions}
                            onChange={(e) => setStatus(e.value)}
                            className="w-full mt-2"
                        />
                    </div>
                    <div>
                        <label>Are you sure want to send the mail ?</label>
                        <Dropdown
                            value={reminder}
                            options={ReminderOptions}
                            onChange={(e) => setReminder(e.value)}
                            placeholder="Select"
                            className="w-full mt-2"
                        />
                    </div>
                </div>
                <div className="pt-5">
                    <Button
                        label="Send"
                        icon="pi pi-check"
                        onClick={handleSave}
                        className="m-4"
                        size="small"
                    />
                </div>
            </div>
        </div>
    );
};

export default TaskSettings;
