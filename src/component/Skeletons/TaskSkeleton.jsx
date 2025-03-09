import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Skeleton } from "primereact/skeleton";

const TaskSkeleton = () => {
    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4 justify-between">
                <div className="flex gap-2">
                    <Skeleton width="8rem" height="2.5rem" />
                    <Skeleton width="8rem" height="2.5rem" />
                    <Skeleton width="8rem" height="2.5rem" />
                </div>
                <div className="w-full md:w-100">
                    <Skeleton width="100%" height="40px" />
                </div>
            </div>
            <DataTable value={Array(10).fill({})} paginator rows={10}>
                <Column
                    field="employeeId"
                    header="S.No"
                    body={() => <Skeleton width="30px" />}
                />
                <Column
                    field="name"
                    header="Project Name"
                    body={() => <Skeleton width="120px" />}
                />
                <Column
                    field="email"
                    header="Members"
                    body={() => <Skeleton width="150px" />}
                />
                <Column
                    field="phoneNumber"
                    header="Satrt Date"
                    body={() => <Skeleton width="100px" />}
                />
                <Column
                    field="designation"
                    header="End Date"
                    body={() => <Skeleton width="100px" />}
                />
                <Column
                    field="dob"
                    header="Action"
                    body={() => <Skeleton width="80px" />}
                />
            </DataTable>
        </div>
    );
};

export default TaskSkeleton;
