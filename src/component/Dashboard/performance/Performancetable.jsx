import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
const PerformanceTable = () => {
    const navigate = useNavigate();
    const users = [
        {
            id: 1,
            empId: "EMP001",
            name: "John Doe",
            completed: 45,
            pending: 72,
            overdue: 0,
        },
        {
            id: 2,
            empId: "EMP002",
            name: "Jane Smith",
            completed: 30,
            pending: 10,
            overdue: 3,
        },
        {
            id: 3,
            empId: "EMP003",
            name: "Mark Johnson",
            completed: 50,
            pending: 2,
            overdue: 1,
        },
        {
            id: 4,
            empId: "EMP004",
            name: "Emily Davis",
            completed: 20,
            pending: 15,
            overdue: 5,
        },
    ];

    const statusTemplate = (rowData) => {
        const totalTasks =
            rowData.completed + rowData.pending + rowData.overdue;
        const completionRate = Math.round(
            (rowData.completed / totalTasks) * 100
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
        navigate(`/dashboard/performance-tracking/${user.empId}`);
    };

    const nameTemplete = (user) => {
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
            <DataTable value={users} responsiveLayout="scroll" 
            emptyMessage="No data available in table"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 25, 50]}
                currentPageReportTemplate="{first} to {last} of {totalRecords}" 
                paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown" tableClassName="custom-table"
                paginatorClassName="custom-pagination" >
                <Column
                    field="name"
                    header="User"
                    body={nameTemplete}
                    sortable
                    rows={10}
                ></Column>
                <Column  headerClassName="custom-table-header" field="completed"  header="Completed" sortable></Column>
                <Column  headerClassName="custom-table-header" field="pending" header="Pending" sortable></Column>
                <Column  headerClassName="custom-table-header" field="overdue" header="Overdue" sortable></Column>
                <Column  headerClassName="custom-table-header" header="Completion Rate" body={statusTemplate}></Column>
            </DataTable>
        </div>
    );
};

export default PerformanceTable;
