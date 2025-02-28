import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import InviteMemberModal from "../Navigation/InviteMember.jsx";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { IconField } from 'primereact/iconfield';
import { InputIcon } from 'primereact/inputicon';
export default function User_Management() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [clients, setClients] = useState([
        {
            sno: 1,
            empId: "EMP001",
            name: "John Doe ohn Do ohn Doohn Do",
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
        const uName=user.name
        return (
            <p
                className="hover:text-blue-600 cursor-pointer"
                onClick={(e) => handleUserClick(e, user)}
            >
                {  uName.length > 15 ? uName.substring(0, 12) + "..." : uName}
            </p>
        );
    };
    const designationTemplete = (user) => {
        const des = user.designation;
        return des.length > 18 ? des.substring(0, 16) + "..." : des;
    };
    const handleUserClick = (e, user) => {
        navigate(`/dashboard/user-management/emp/${user.empId}`);
    };
    const emailTemplate = (rowData) => {
        const email = rowData.email;
        return email.length > 15 ? email.substring(0, 10) + "..." : email;
    };

    return (
        <div className="p-4 md:px-5">
            <div className="flex flex-wrap items-center gap-4 mb-4 justify-between">
                <Button
                    label="Add User"
                    onClick={() => {
                        setVisible(true);
                    }}
                    className="h-10"
                    size="small"
                    icon="pi pi-plus"
                    severity="primary"
                />
                <div className="w-full md:w-75 ">
                    <IconField iconPosition="left" className="h-10 "  >
                        <InputIcon className="pi pi-search h-10" />
                        <InputText placeholder="Search" className="h-10 w-full"                              value={filters.search}
                            onChange={(e) =>
                                setFilters({
                                    ...filters,
                                    search: e.target.value,
                                })
                            } />
                    </IconField>
                </div>
            </div>
            <div className="">
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
                    emptyMessage="No Users found"
                    paginator
                    rows={10}
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    tableStyle={{ minWidth: "60rem" }}
                    tableClassName="custom-table"
                    paginatorClassName="custom-pagination"
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                >
                    <Column
                        field="sno"
                        header="S.No"
                        headerClassName="custom-table-header"
                        sortable
                    />
                    <Column
                        field="empId"
                        header="EMP ID"
                        headerClassName="custom-table-header"
                    />
                    <Column
                        field="name"
                        header="Name"
                        body={nameTemplete}
                        headerClassName="custom-table-header"
                    />
                    <Column
                        field="email"
                        header="Email"
                        body={emailTemplate}
                        headerClassName="custom-table-header"
                    />
                    <Column
                        field="mobile"
                        header="Mobile"
                        headerClassName="custom-table-header"
                    />
                    <Column
                        field="designation"
                        header="Designation"
                        body={designationTemplete}
                        style={{ width: "175px" }}
                        headerClassName="custom-table-header"
                    />
                    <Column
                        field="dob"
                        header="Dob"
                        headerClassName="custom-table-header"
                    />
                    <Column
                        field="role"
                        header="Role"
                        headerClassName="custom-table-header"
                        class
                    />
                    <Column
                        headerClassName="custom-table-header"
                        header="Action"
                        body={(rowData) => (
                            <>
                                <div className="w-full text-center">
                                    <i
                                        className="pi pi-ellipsis-h  "
                                        style={{ fontSize: "1rem" }}
                                        onClick={(e) =>
                                            actionPanel.current.toggle(e)
                                        }
                                    ></i>
                                </div>
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
            </div>

            <InviteMemberModal visible={visible} setVisible={setVisible} />
        </div>
    );
}
