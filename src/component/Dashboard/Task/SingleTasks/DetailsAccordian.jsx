import React from "react";
import { Accordion, AccordionTab } from "primereact/accordion";

const IssueDetailsAccordion = ({ activeIndex, issueDetails }) => {
    return (
        <div >
            <Accordion activeIndex={activeIndex}>
                <AccordionTab
                    header={
                        <div className="flex items-center space-x-2">
                            <h1 className="text-base font-semibold">
                                In Progress
                            </h1>
                        </div>
                    }
                >
                    <div className="space-y-2">
                        {Object.entries(issueDetails).map(([key, detail]) => (
                            <div
                                key={key}
                                className="flex flex-col md:flex-row md:items-center justify-between gap-1 border-b pb-2"
                            >
                                <h3 className="text-gray-600 text-sm">
                                    {key.charAt(0).toUpperCase() + key.slice(1)}
                                </h3>
                                <p
                                    className={`text-sm font-medium ${detail.color || ""} flex items-center`}
                                >
                                    <i
                                        className={`${detail.icon || "pi pi-user"} mr-2`}
                                    ></i>
                                    {typeof detail === "string"
                                        ? detail
                                        : detail.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </AccordionTab>
            </Accordion>
        </div>
    );
};

export default IssueDetailsAccordion;
