import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
const PerformanceTable = ({ Users }) => {
    const navigate = useNavigate();

    const statusTemplate = (rowData) => {
        const totalTasks =
            rowData.completedTasks + rowData.pendingTasks + rowData.dueTasks;

        const completionRate = Math.round(
            (rowData.completedTasks / totalTasks) * 100
        );
        return (
            <ProgressBar
                value={completionRate}
                style={{
                    height: "20px",
                    backgroundColor:
                        completionRate >= 80
                            ? ""
                            : completionRate >= 50
                            ? ""
                            : "red",
                }}
            />
        );
    };
    const handleUserClick = (e, user) => {
        navigate(`/dashboard/performance-tracking/${user.userId}`);
    };

    const nameTemplate = (user) => {
        return (
            <p
                className="hover:text-blue-600 cursor-pointer"
                onClick={(e) => handleUserClick(e, user)}
            >
                {user.name}
            </p>
        );
    };

    return (
        <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-bold mb-4">User Performance</h3>
            <DataTable
                value={Users}
                responsiveLayout="scroll"
                emptyMessage="No data available in table"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                tableClassName="custom-table"
                paginatorClassName="custom-pagination"
            >
                <Column
                    field="userName"
                    header="User"
                    body={nameTemplate}
                    sortable
                    rows={10}
                ></Column>
                <Column
                    headerClassName="custom-table-header"
                    field="completedTasks"
                    header="Completed"
                    sortable
                ></Column>
                <Column
                    headerClassName="custom-table-header"
                    field="pendingTasks"
                    header="Pending"
                    sortable
                ></Column>
                <Column
                    headerClassName="custom-table-header"
                    field="dueTasks"
                    header="Overdue"
                    sortable
                ></Column>
                <Column
                    headerClassName="custom-table-header"
                    header="Completion Rate"
                    body={statusTemplate}
                ></Column>
            </DataTable>
        </div>
    );
};

export default PerformanceTable;
