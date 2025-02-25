import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import InviteMemberModal from "../Navigation/InviteMember.jsx";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
export default function User_Management() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [clients, setClients] = useState([
        {
            sno: 1,
            empId: "EMP001",
            name: "John Doe",
            email: "john@example.comjohn@example.comjohn@example.comjohn@example.comjohn@example.com",
            mobile: "1234567890",
            designation: "Software Engineer",
            dob: "1990-01-15",
            role: "administrator",
            status: "active",
        },
        {
            sno: 2,
            empId: "EMP002",
            name: "Jane Smith",
            email: "jane@example.com",
            mobile: "0987654321",
            designation: "Project Manager",
            dob: "1985-07-22",
            role: "tf_admin",
            status: "active",
        },
        {
            sno: 3,
            empId: "EMP003",
            name: "Robert Brown",
            email: "robert@example.com",
            mobile: "1122334455",
            designation: "UI/UX Designer",
            dob: "1992-03-30",
            role: "employee",
            status: "deactivee",
        },
        {
            sno: 4,
            empId: "EMP001",
            name: "John Doe",
            email: "john@example.com",
            mobile: "1234567890",
            designation: "Software Engineer",
            dob: "1990-01-15",
            role: "administrator",
            status: "active",
        },
        {
            sno: 5,
            empId: "EMP002",
            name: "Jane Smith",
            email: "jane@example.com",
            mobile: "0987654321",
            designation: "Project Manager",
            dob: "1985-07-22",
            role: "tf_admin",
            status: "active",
        },
        {
            sno: 6,
            empId: "EMP003",
            name: "Robert Brown",
            email: "robert@example.com",
            mobile: "1122334455",
            designation: "UI/UX Designer",
            dob: "1992-03-30",
            role: "employee",
            status: "deactivee",
        },
        {
            sno: 7,
            empId: "EMP001",
            name: "John Doe",
            email: "john@example.com",
            mobile: "1234567890",
            designation: "Software Engineer",
            dob: "1990-01-15",
            role: "administrator",
            status: "active",
        },
        {
            sno: 8,
            empId: "EMP002",
            name: "Jane Smith",
            email: "jane@example.com",
            mobile: "0987654321",
            designation: "Project Manager",
            dob: "1985-07-22",
            role: "tf_admin",
            status: "active",
        },
        {
            sno: 9,
            empId: "EMP003",
            name: "Robert Brown",
            email: "robert@example.com",
            mobile: "1122334455",
            designation: "UI/UX Designer",
            dob: "1992-03-30",
            role: "employee",
            status: "deactivee",
        },
        {
            sno: 10,
            empId: "EMP001",
            name: "John Doe",
            email: "john@example.com",
            mobile: "1234567890",
            designation: "Software Engineer",
            dob: "1990-01-15",
            role: "administrator",
            status: "active",
        },
    ]);

    const [filters, setFilters] = useState({
        dateRange: null,
        clientType: null,
        search: "",
    });
    const actionPanel = useRef(null);
    const actions = ["De-Active", "Edit"];
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
    const handleUserClick = (e, user) => {
        navigate(`/dashboard/user-management/emp/${user.empId}`);
    };
    const emailTemplate = (rowData) => {
        const email = rowData.email;
        return email.length > 15 ? email.substring(0, 10) + "..." : email;
    };

    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4 justify-between">
                <Button
                    label="Add User"
                    icon="pi pi-plus"
                    className="p-button-primary"
                    onClick={() => {
                        setVisible(true);
                    }}
                />
                <div className="w-full md:w-72">
                    <div className="p-inputgroup flex-1 h-9">
                        <span className="p-inputgroup-addon cursor-pointer">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText
                            type="search"
                            placeholder="Start Searching...."
                            value={filters.search}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    search: e.target.value,
                                })
                            }
                        />
                    </div>
                </div>
            </div>

            <DataTable
                value={clients.filter(
                    (client) =>
                        client.name
                            .toLowerCase()
                            .includes(filters.search.toLowerCase()) ||
                        client.email
                            .toLowerCase()
                            .includes(filters.search.toLowerCase())
                )}
                emptyMessage="No data available in table"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: "60rem" }}
                tableClassName="custom-table"
                paginatorClassName="custom-pagination"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
            >
                <Column field="sno" header="S.No"  headerClassName="custom-table-header" sortable data-p-resizable-column={true} resizeable/>
                <Column field="empId" header="EMP ID" headerClassName="custom-table-header" />
                <Column field="name" header="Name" body={nameTemplete}  headerClassName="custom-table-header"/>
                <Column field="email" header="Email" body={emailTemplate}  headerClassName="custom-table-header"/>
                <Column field="mobile" header="Mobile" headerClassName="custom-table-header" />
                <Column field="designation" header="Designation"  headerClassName="custom-table-header"/>
                <Column field="dob" header="Dob" headerClassName="custom-table-header" />
                <Column field="role" header="Role"  headerClassName="custom-table-header" class/>
                <Column
                    header="Action"
                    body={(rowData) => (
                        <>
                            <Button
                                icon="pi pi-ellipsis-h"
                                className="p-button-text"
                                onClick={(e) => actionPanel.current.toggle(e)}
                            />
                            <OverlayPanel ref={actionPanel} className="p-0">
                                <div className="custom-listbox">
                                    {actions.map((action, index) => (
                                        <div
                                            key={index}
                                            className={`hover:text-blue-600 cursor-pointer custom-listbox-item ${
                                                index !== actions.length - 1
                                                    ? "border-b "
                                                    : "pb-0"
                                            } p-2`}
                                            onClick={() =>
                                                alert(`${action} clicked`)
                                            }
                                        >
                                            {action}
                                        </div>
                                    ))}
                                </div>
                            </OverlayPanel>
                        </>
                    )}
                    style={{ width: "100px" }}
                />
            </DataTable>
            <InviteMemberModal visible={visible} setVisible={setVisible} />
        </div>
    );
}
