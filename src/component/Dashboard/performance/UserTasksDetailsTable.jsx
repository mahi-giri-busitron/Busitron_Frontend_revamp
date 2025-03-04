import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Tag } from "primereact/tag";

const UserTasksDetailsTable = ({ tasks }) => {
    const statusTemplate = (rowData) => {
        let severity;
        switch (rowData.status) {
            case "Completed":
                severity = "success";
                break;
            case "pending":
                severity = "warning";
                break;
            case "overdue":
                severity = "danger";
                break;
            case "To Do":
                severity = "info";
                break;
            case "In Progress":
                severity = "primary";
                break;
            default:
                severity = null;
        }
        return (
            <Tag
                value={rowData.status}
                severity={severity}
                style={{ minWidth: "100px", fontSize: "10px" }}
            />
        );
    };

    const taskTitleTemplate = (rowData) => {
        const taskTitle =
            rowData.title.length > 40
                ? rowData.title.substring(0, 37) + "..."
                : rowData.title;
        return <span>{taskTitle}</span>;
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
                    field="taskID"
                    header="Task ID"
                    headerClassName="custom-table-header"
                ></Column>
                <Column
                    field="title"
                    header="Task Name"
                    headerClassName="custom-table-header"
                    body={taskTitleTemplate}
                ></Column>

                <Column
                    field="startDate"
                    header="Start Date"
                    headerClassName="custom-table-header"
                ></Column>
                <Column
                    field="dueDate"
                    header="End Date"
                    headerClassName="custom-table-header"
                ></Column>
                <Column
                    header="status"
                    headerClassName="custom-table-header"
                    body={statusTemplate}
                ></Column>
            </DataTable>
        </div>
    );
};

export default UserTasksDetailsTable;
