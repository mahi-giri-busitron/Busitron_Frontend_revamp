import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { OverlayPanel } from "primereact/overlaypanel";
import InviteMemberModal from "../Navigation/InviteMember.jsx";
import { InputText } from "primereact/inputtext";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
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
    const [searchName, setSearchName] = useState("");
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
    const { users, isUpdated } = useSelector((state) => state.userManagement);
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
                    className="p-button-primary h-10"
                    size="small"
                    onClick={() => {
                        setVisible(true);
                    }}
                />
                <div className=" ">
                    <div className="w-full md:w-100 ">
                        <IconField iconPosition="left" className="h-10 w-full">
                            <InputIcon className="pi pi-search h-10" />
                            <InputText
                                placeholder="Search"
                                className="h-10 w-full "
                                onChange={(e) => setSearchName(e.target.value)}
                            />
                        </IconField>
                    </div>
                </div>
            </div>

            <DataTable
                value={clients.filter((each) =>
                    each.name
                        ?.toLowerCase()
                        .includes(searchName.toLocaleLowerCase())
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
                        <div className="flex gap-3 items-center">
                            <button
                                className=""
                                onClick={() =>
                                    navigate(
                                        `/dashboard/user-management/emp/${rowData._id}`
                                    )
                                }
                            >
                                <i className="pi pi-eye text-blue-500 cursor-pointer transition-transform transform hover:scale-110"></i>
                            </button>
                            <button
                                onClick={() => {
                                    dispatch(
                                        deactivateUser({
                                            id: rowData._id,
                                            isActiveUser: rowData?.isActive,
                                        })
                                    );
                                }}
                            >
                                <i className="pi pi-trash text-red-500 cursor-pointer transition-transform transform hover:scale-110"></i>
                            </button>
                        </div>
                    )}
                />
            </DataTable>
            <InviteMemberModal visible={visible} setVisible={setVisible} />
        </div>
    );
}

export default User_Management;
