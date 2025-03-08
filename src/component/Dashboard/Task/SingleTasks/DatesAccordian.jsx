import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";
import moment from "moment";

const DatesAccordion = ({ taskData }) => {
    const dates = {
        Due: moment(taskData?.dueDate).format("DD-MM-YYYY"),
        Created: moment(taskData?.createdAt).format("DD-MM-YYYY"),
        Updated: moment(taskData?.updatedAt).format("DD-MM-YYYY"),
        "Start Date": moment(taskData?.startDate).format("DD-MM-YYYY"),
        "End Date": moment(taskData?.dueDate).format("DD-MM-YYYY"),
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
