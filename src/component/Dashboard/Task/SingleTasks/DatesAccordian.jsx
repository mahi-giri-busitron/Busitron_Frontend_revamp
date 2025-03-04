import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const DatesAccordion = ({ taskData }) => {
    const formatDate = (dateString) => {
        return dateString
            ? new Date(dateString).toISOString().split("T")[0]
            : null;
    };

    const dates = {
        Due: taskData?.dueDate,
        Created: formatDate(taskData?.createdAt),
        Updated: formatDate(taskData?.updatedAt),
        "Start Date": taskData?.startDate,
        "End Date": taskData?.dueDate,
    };

    return (
        <div className="w-full">
            <Accordion activeIndex={0}>
                <AccordionTab header="📅 Dates">
                    <div className="space-y-2">
                        {Object.entries(dates).map(([key, value]) => (
                            <div
                                key={key}
                                className="flex justify-between text-sm border-b pb-2"
                            >
                                <span className="font-medium text-gray-700">
                                    {key}:
                                </span>
                                <span className="text-gray-600">{value}</span>
                            </div>
                        ))}
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    );
};

export default DatesAccordion;
