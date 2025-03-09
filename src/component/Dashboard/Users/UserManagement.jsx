import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
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
import DeleteModal from "../../../shared/DeleteModal.jsx";
import TooltipButton from "../../../shared/ToolTipButton.jsx";
import UserManagementSkeleton from "../../Skeletons/UserManagementSkeleton.jsx";

function User_Management() {
    const [visible, setVisible] = useState(false);
    const navigate = useNavigate();
    const [clients, setClients] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState({});
    const [confirmDiolagVisible, setConfirmDiolagVisible] = useState(false);
    const [searchName, setSearchName] = useState("");
    const { isLoading } = useSelector((state) => state.userManagement);

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

    const handleDeActivateUser = (rowData) => {
        setConfirmDiolagVisible(false);
        dispatch(
            deactivateUser({
                id: selectedRowData?._id,
                isActiveUser: selectedRowData?.isActive,
            })
        );
    };

    return (
        <>
            {isLoading ? (
                <UserManagementSkeleton />
            ) : (
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
                                <IconField
                                    iconPosition="left"
                                    className="h-10 w-full"
                                >
                                    <InputIcon className="pi pi-search h-10" />
                                    <InputText
                                        placeholder="Search"
                                        className="h-10 w-full "
                                        onChange={(e) =>
                                            setSearchName(e.target.value)
                                        }
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
                                    <TooltipButton
                                        onClickFunction={() =>
                                            navigate(
                                                `/dashboard/user-management/emp/${rowData._id}`
                                            )
                                        }
                                        toolTipText="show details"
                                        iconCls="pi pi-eye text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
                                    />
                                    <TooltipButton
                                        onClickFunction={() => {
                                            setConfirmDiolagVisible(true);
                                            setSelectedRowData(rowData);
                                        }}
                                        toolTipText="Delete user"
                                        iconCls="pi pi-trash text-red-500 cursor-pointer transition-transform transform hover:scale-110"
                                    />
                                </div>
                            )}
                        />
                    </DataTable>
                    <InviteMemberModal
                        visible={visible}
                        setVisible={setVisible}
                    />
                    <DeleteModal
                        visible={confirmDiolagVisible}
                        setVisible={setConfirmDiolagVisible}
                        handleDelete={handleDeActivateUser}
                        confirmationText={
                            "Are you sure you want to DeActivate this User ?"
                        }
                    />
                </div>
            )}
        </>
    );
}

export default User_Management;
