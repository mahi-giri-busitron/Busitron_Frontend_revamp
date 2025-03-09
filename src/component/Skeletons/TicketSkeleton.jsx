import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

const TicketSkeleton = () => {
    return (
        <div className="p-6 bg-gray-100">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                {Array(5)
                    .fill(0)
                    .map((_, index) => (
                        <Card
                            key={index}
                            className="flex items-center justify-between shadow-md gap-4 w-full h-26 p-4"
                        >
                            <Skeleton
                                width="80%"
                                height="16px"
                                className="mb-4"
                            />
                            <Skeleton width="50%" height="24px" />
                        </Card>
                    ))}
            </div>

            {/* Top Bar */}
            <div className="flex justify-between my-2 flex-wrap gap-4">
                <div className="flex gap-2">
                    <Skeleton width="120px" height="40px" />
                    <Skeleton width="120px" height="40px" />
                    <Skeleton width="120px" height="40px" />
                </div>
                <Skeleton width="100%" height="40px" className="md:w-100" />
            </div>

            {/* Data Table Skeleton */}
            <div className="card">
                <DataTable
                    value={Array(10).fill({})}
                    className="shadow-md text-sm"
                >
                    <Column
                        field="ticketID"
                        header="Ticket No"
                        body={() => <Skeleton width="80%" />}
                    />
                    <Column
                        field="ticketSubject"
                        header="Ticket Subject"
                        body={() => <Skeleton width="90%" />}
                    />
                    <Column
                        field="assignedBy"
                        header="Created By"
                        body={() => <Skeleton width="70%" />}
                    />
                    <Column
                        field="priority"
                        header="Priority"
                        body={() => <Skeleton width="60%" />}
                    />
                    <Column
                        field="status"
                        header="Status"
                        body={() => <Skeleton width="50%" />}
                    />
                    <Column
                        header="Action"
                        body={() => (
                            <div className="flex gap-3">
                                <Skeleton width="24px" height="24px" />
                                <Skeleton width="24px" height="24px" />
                                <Skeleton width="24px" height="24px" />
                            </div>
                        )}
                    />
                </DataTable>
            </div>
        </div>
    );
};

export default TicketSkeleton;
