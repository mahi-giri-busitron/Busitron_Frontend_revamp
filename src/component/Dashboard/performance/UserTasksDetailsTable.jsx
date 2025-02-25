import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

const UserTasksDetailsTable = () => {
    const tasks = [
        {
            id: 1,
            taskName:
                "update the page based on the linked use and the admin panael which should be abbled to merge the task on hthe shifting that",
            projectName: "Project X",
            startDate: "2023-01-01",
            endDate: "2023-01-10",
            status: "Completed",
        },
        {
            id: 2,
            taskName: "Task B",
            projectName: "Project Y",
            startDate: "2023-02-01",
            endDate: "2023-02-15",
            status: "Pending",
        },
        {
            id: 3,
            taskName: "Task C",
            projectName: "Project Z",
            startDate: "2023-03-01",
            endDate: "2023-03-20",
            status: "Overdue",
        },
        {
            id: 4,
            taskName: "Task D",
            projectName: "Project X",
            startDate: "2023-04-01",
            endDate: "2023-04-10",
            status: "Completed",
        },
    ];

    const statusTemplate = (rowData) => {
        let severity;
        switch (rowData.status) {
            case "Completed":
                severity = "success";
                break;
            case "Pending":
                severity = "warning";
                break;
            case "Overdue":
                severity = "danger";
                break;
            default:
                severity = null;
        }
        return (
            <Tag
                value={rowData.status}
                severity={severity}
                style={{ minWidth: "100px" }}
            />
        );
    };

    const taskNameTemplate = (rowData) => {
        const taskName =
            rowData.taskName.length > 40
                ? rowData.taskName.substring(0, 37) + "..."
                : rowData.taskName;
        return <span>{taskName}</span>;
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-4">User Task Details</h3>
            <DataTable
                value={tasks}
                responsiveLayout="scroll"
                paginatorClassName="custom-pagination"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                emptyMessage="No data available in table"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                tableClassName="custom-table"
            >
                <Column
                    field="id"
                    header="Task ID"
                    headerClassName="custom-table-header"
                ></Column>
                <Column
                    field="taskName"
                    header="Task Name"
                    headerClassName="custom-table-header"
                    body={taskNameTemplate}
                ></Column>
                <Column
                    field="startDate"
                    header="Start Date"
                    headerClassName="custom-table-header"
                ></Column>
                <Column
                    field="endDate"
                    header="End Date"
                    headerClassName="custom-table-header"
                ></Column>
                <Column
                    header="Status"
                    headerClassName="custom-table-header"
                    body={statusTemplate}
                ></Column>
            </DataTable>
        </div>
    );
};

export default UserTasksDetailsTable;
