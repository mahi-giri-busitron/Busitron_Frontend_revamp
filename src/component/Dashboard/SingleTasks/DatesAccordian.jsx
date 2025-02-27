import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const DatesAccordion = () => {
    const dates = {
        "Due": "27/Feb/25",
        "Created": "3 days ago",
        "Updated": "7 hours ago",
        "Start Date": "20/Feb/25",
        "End Date": "27/Feb/25"
    };

    return (
        <div className="w-full">
            <Accordion activeIndex={0}>
                <AccordionTab header="📅 Dates">
                    <div className="space-y-2">
                        {Object.entries(dates).map(([key, value]) => (
                            <div key={key} className="flex justify-between text-sm border-b pb-2">
                                <span className="font-medium text-gray-700">{key}:</span>
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
