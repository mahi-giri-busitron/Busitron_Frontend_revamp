import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import InviteMemberModal from "../Navigation/InviteMember.jsx";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    changeToPrevIsDeleted,
    deactivateUser,
    fetchAllUser,
} from "../../../redux/userManagementSlice.js";
import moment from "moment";

function User_Management() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState();

    const [filters, setFilters] = useState({
        dateRange: null,
        clientType: null,
        search: "",
    });

    const actionPanel = useRef(null);
    const actions = ["De-Active", "Edit"];
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

    const dobTemplate = (user) => {
        return <p>{moment(user?.dateOfBirth).format("D-M-Y")}</p>;
    };

    const dispatch = useDispatch();
    const { users, isUpdated } = useSelector((state) => (state.userManagement));
    useEffect(() => {
        dispatch(fetchAllUser());
    }, [dispatch]);

    useEffect(() => {
        if (isUpdated) {
            dispatch(fetchAllUser());
            dispatch(changeToPrevIsDeleted());
        }
    }, [isUpdated, dispatch]);

    useEffect(() => {
        if (users) {
            setClients(users);
        }
    }, [users]);

    const handleUserClick = (e, user) => {
        navigate(`/dashboard/user-management/emp/${user._id}`);
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
                value={clients}
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
                <Column
                    field="employeeId"
                    header="EMP ID"
                    headerClassName="custom-table-header"
                />
                <Column
                    field="name"
                    header="Name"
                    body={nameTemplate}
                    headerClassName="custom-table-header"
                />
                <Column
                    field="email"
                    header="Email"
                    body={emailTemplate}
                    headerClassName="custom-table-header"
                />
                <Column
                    field="phoneNumber"
                    header="phoneNumber"
                    headerClassName="custom-table-header"
                />
                <Column
                    field="designation"
                    header="Designation"
                    headerClassName="custom-table-header"
                />
                <Column
                    field="dob"
                    header="Dob"
                    body={dobTemplate}
                    headerClassName="custom-table-header"
                />
                <Column
                    field="role"
                    header="Role"
                    headerClassName="custom-table-header"
                    class
                />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <>
                            <Button
                                icon="pi pi-ellipsis-h"
                                className="p-button-text"
                                onClick={(e) => {
                                    actionPanel.current.toggle(e);
                                    setSelectedRowData(rowData);
                                }}
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
                                            onClick={() => {
                                                dispatch(
                                                    deactivateUser({
                                                        id: selectedRowData._id,
                                                        isActiveUser:
                                                            selectedRowData?.isActive,
                                                    })
                                                );
                                            }}
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

export default User_Management;
