import React, { useState } from "react";
import { InputNumber } from "primereact/inputnumber";
import { RadioButton } from "primereact/radiobutton";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const TaskSettings = () => {
    const [beforeDays, setBeforeDays] = useState(1);
    const [afterDays, setAfterDays] = useState(1);
    const [reminderOnDueDate, setReminderOnDueDate] = useState("NO");
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [{ label: "Task Settings", icon: "pi pi-list-check" }];

    const handleSave = async () => {
        const reminderPayload = {
            beforeDueDate: beforeDays,
            afterDueDate: afterDays,
            sendTaskReminder: reminderOnDueDate,
        };

        try {
            await axios.post(
                "http://localhost:5421/api/v1/tasksettings/send-reminder",
                reminderPayload
            );
            toast.success("Saved successfully!", {
                duration: 3000,
                position: "top-right",
            });
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
            <Toaster />
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            />
            <div className="p-2 rounded-lg shadow-md bg-white">
                <h3 className="text-lg font-medium">Send Reminder</h3>
                <div className="flex justify-between">
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
                        <label>Send task reminder on the day of due date</label>
                        <div className="flex gap-4">
                            <RadioButton
                                inputId="yes"
                                name="reminder"
                                value="YES"
                                onChange={() => setReminderOnDueDate("YES")}
                                checked={reminderOnDueDate === "YES"}
                            />
                            <label htmlFor="yes">Yes</label>
                            <RadioButton
                                inputId="no"
                                name="reminder"
                                value="NO"
                                onChange={() => setReminderOnDueDate("NO")}
                                checked={reminderOnDueDate === "NO"}
                            />
                            <label htmlFor="no">No</label>
                        </div>
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