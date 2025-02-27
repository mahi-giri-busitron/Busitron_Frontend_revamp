import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Tooltip } from "primereact/tooltip";
import { useNavigate } from "react-router-dom";
import CreateEstimate from "./CreateEstimate";

const Financial_Management = () => {
    const [statusFilter, setStatusFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [data, setData] = useState([]);
    const [openModel, setOpenModel] = useState(false);
    const [menuVisible, setMenuVisible] = useState(null);
    const navigate = useNavigate();

    const statuses = [
        { label: "All", value: "all" },
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "In Progress", value: "inProgress" },
    ];

    const statusOptions = [
        { label: "Pending", value: "pending" },
        { label: "Completed", value: "completed" },
        { label: "Todo", value: "todo" },
        { label: "In Progress", value: "inProgress" },
    ];

    const handleEstimateClick = (estimateId) => {
        navigate(`/dashboard/view-estimate/${estimateId}`);
    };

    useEffect(() => {
        const sampleData = Array.from({ length: 30 }, (_, i) => ({
            id: i + 1,
            estimate: `EST-${String(i + 1).padStart(
                3,
                "0"
            )} - This is a very long estimate`,
            client: `Client ${String.fromCharCode(65 + (i % 26))}`,
            total: (i + 1) * 100,
            validTill: `2024-08-${String(10 + (i % 20)).padStart(2, "0")}`,
            created: `2024-07-${String(20 + (i % 10)).padStart(2, "0")}`,
            estimateRequestNumber: `REQ-${String(i + 1).padStart(3, "0")}`,
            status: statusOptions[i % statusOptions.length].value,
        }));
        setData(sampleData);
    }, []);

    const onStatusChange = (e, rowData) => {
        setData((prevData) =>
            prevData.map((item) =>
                item.id === rowData.id ? { ...item, status: e.value } : item
            )
        );
    };

    const filteredData = data.filter((item) => {
        const statusMatch =
            statusFilter === "all" || item.status === statusFilter;
        const searchMatch =
            item.estimate.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.estimateRequestNumber
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
        return statusMatch && searchMatch;
    });

    const statusTemplate = (rowData) => (
        <Dropdown
            value={rowData.status}
            options={statusOptions}
            onChange={(e) => onStatusChange(e, rowData)}
            placeholder="Select Status"
            className="w-42 h-8 items-center border rounded px-2 py-0.5 text-sm"
        />
    );

    const estimateTemplate = (rowData) => {
        return (
            <>
                <Tooltip target={`.estimate-${rowData.id}`} position="top" />
                <button
                    className={`text-blue-900 cursor-pointer estimate-${rowData.id} truncate max-w-[9.375rem]`}
                    onClick={() => handleEstimateClick(rowData.id)}
                    data-pr-tooltip={rowData.estimate} 
                >
                    {rowData.estimate}
                </button>
            </>
        );
    };

    return (
        <div className="p-4">
            {/* Responsive Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                <Button
                    icon="pi pi-plus"
                    label="Create Estimate"
                    className="p-button-raised w-full md:w-auto"
                    onClick={() => setOpenModel(true)}
                />
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
                    <InputText
                        type="text"
                        placeholder="Search..."
                        className="border rounded h-10 items-center px-2 py-1 w-full md:w-48"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Dropdown
                        value={statusFilter}
                        options={statuses}
                        onChange={(e) => setStatusFilter(e.value)}
                        placeholder="Filter Status"
                        className="border rounded h-10 items-center px-2 py-1 w-full md:w-28"
                    />
                </div>
            </div>

            {/* Dialog for Create Estimate */}
            <Dialog
                header="Create Estimate"
                visible={openModel}
                style={{ width: "90vw" }}
                onHide={() => setOpenModel(false)}
            >
                <CreateEstimate />
            </Dialog>

            {/* Responsive DataTable */}
            <DataTable
                value={filteredData}
                dataKey="id"
                paginator
                size="normal"
                removableSort
                rows={10}
                rowsPerPageOptions={[5, 10, 15]}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                className="p-datatable-sm border-0 shadow-none"
                responsiveLayout="scroll"
            >
                <Column field="id" header="ID" />
                <Column
                    field="estimate"
                    header="Estimate"
                    body={estimateTemplate}
                />
                <Column field="client" header="Client" />
                <Column field="total" header="Total" />
                <Column field="validTill" header="Valid Till" />
                <Column field="created" header="Created" />
                <Column
                    field="estimateRequestNumber"
                    header="Estimate Req No"
                    className="text-sm"
                />
                <Column field="status" header="Status" body={statusTemplate} />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div className="flex gap-2">
                            <button
                                className="text-blue-500 hover:text-blue-700"
                                onClick={() => handleView(rowData)}
                            >
                                <i className="pi pi-eye mx-2 cursor-pointer"></i>
                            </button>
                            <button
                                className="text-red-500 hover:text-red-700"
                                onClick={() => handleDelete(rowData)}
                            >
                                <i className="pi pi-trash cursor-pointer"></i>
                            </button>
                        </div>
                    )}
                    headerClassName="custom-table-header"
                />
            </DataTable>
        </div>
    );
};

export default Financial_Management;
