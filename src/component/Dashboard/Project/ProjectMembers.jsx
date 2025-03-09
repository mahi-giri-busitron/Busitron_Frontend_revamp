import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { ProgressSpinner } from "primereact/progressspinner";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../../redux/userManagementSlice.js";
import { useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const ProjectMembers = () => {
    const [members, setMembers] = useState([]);
    const { id } = useParams();
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const [projectMember, setProjectMember] = useState([]);
    const { users } = useSelector((state) => state.userManagement);
    const dispatch = useDispatch();
    const { roles = [] } = useSelector((store) => store.rolesPermissions) || {};
    const { currentUser } = useSelector((store) => store.user);
    const userRole = currentUser?.data?.role;
    const userPermissions =
        roles.find((r) => r.role === userRole)?.permissions?.projects || {};

    const canView = userRole === "SuperAdmin" || userPermissions.view;
    const canAdd = userRole === "SuperAdmin" || userPermissions.add;
    const canEdit = userRole === "SuperAdmin" || userPermissions.update;
    const canDelete = userRole === "SuperAdmin" || userPermissions.delete;

    useEffect(() => {
        if (!users || users === null) {
            dispatch(fetchAllUser());
        }
    }, [dispatch, users]);

    useEffect(() => {
        setTimeout(() => {
            setVerifiedUsers(users);
            setLoading(false);
        }, 2000);
    }, []);

    const addMembers = async () => {
        if (!Array.isArray(selectedUsers) || selectedUsers.length === 0) {
            toast.error("No users selected");
            return;
        }

        const newMembers = selectedUsers.map((user) => ({
            id: user._id,
            name: user.name,
            role: "Member",
        }));

        setMembers((prevMembers) => [...prevMembers, ...newMembers]);
        setShouldUpdate(true);
        setDialogVisible(false);
        setSelectedUsers([]);
    };

    useEffect(() => {
        if (shouldUpdate) {
            axios
                .put(`/api/v1/project/projects/${id}/members`, members)
                .then(() => {
                    fetchParticularMembers();
                    toast.success("Members updated successfully!");
                })
                .catch(() => {
                    toast.error("Failed to update members.");
                });
            setShouldUpdate(false);
        }
    }, [members, shouldUpdate]);

    const fetchParticularMembers = async () => {
        try {
            const response = await axios.get(
                `/api/v1/project/projects/${id}/members`
            );
            setProjectMember(response.data.data);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchParticularMembers();
    }, []);

    const deleteProjectMember = async (oid) => {
        try {
            const response = await axios.delete(
                `/api/v1/project/projects/${id}/members/${oid}`
            );

            if (response.data.statusCode === 200) {
                toast.success("Deleted member successfully!");
            } else {
                toast.error(response.data.message || "Something went wrong");
            }

            fetchParticularMembers();
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="py-4">
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    {canAdd && (
                        <Button
                            label="Add members"
                            size="small"
                            icon="pi pi-plus"
                            severity="primary"
                            onClick={() => setDialogVisible(true)}
                        />
                    )}
                </div>

                <div className="">
                    <div className="w-full md:w-100">
                        <IconField iconPosition="left" className="h-10 w-full">
                            <InputIcon className="pi pi-search h-10" />
                            <InputText
                                placeholder="Start Searching..."
                                className="h-10 w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </IconField>
                    </div>
                </div>
            </div>

            <div className="p-3">
                <DataTable
                    value={projectMember.filter((each) =>
                        each.name
                            .toLowerCase()
                            .includes(searchTerm.toLocaleLowerCase())
                    )}
                    responsiveLayout="scroll"
                >
                    <Column
                        header="Emp ID"
                        body={(rowData) => {
                            return <span>{rowData.employeeId}</span>;
                        }}
                    />
                    <Column
                        field="name"
                        header="Name"
                        body={(rowData) => (
                            <div className="flex items-center">
                                <i className="pi pi-user mr-2"></i>
                                <span>{rowData.name}</span>
                            </div>
                        )}
                    />
                    <Column
                        field="phoneNumber"
                        header="Phone"
                        body={(rowData) => (
                            <div className="flex items-center">
                                <span>{rowData?.phoneNumber}</span>
                            </div>
                        )}
                    />
                    <Column
                        field="email"
                        header="Email"
                        body={(rowData) => (
                            <div className="flex items-center">
                                <span>{rowData?.email}</span>
                            </div>
                        )}
                    />

                    <Column
                        field="role"
                        header="Role"
                        body={(rowData) => (
                            <div className="flex gap-3">
                                <div className="flex items-center">
                                    <label
                                        htmlFor={`admin-${rowData.id}`}
                                        className="ml-2"
                                    >
                                        {rowData.role}
                                    </label>
                                </div>
                            </div>
                        )}
                    />

                    <Column
                        header="Action"
                        body={(rowData) => (
                            <div className="flex justify-around w-full">
                                {canDelete && (
                                    <button
                                        icon="pi pi-trash"
                                        label="Delete"
                                        className="p-button-primary"
                                        onClick={() =>
                                            deleteProjectMember(rowData._id)
                                        }
                                    >
                                        <i className="pi pi-trash text-red-500 cursor-pointer"></i>
                                    </button>
                                )}
                            </div>
                        )}
                        style={{ width: "150px" }}
                    />
                </DataTable>
            </div>

            <Dialog
                draggable={false}
                header="Add Project Members"
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                style={{ width: "50vw" }}
            >
                <div className="">
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <MultiSelect
                            value={selectedUsers}
                            options={verifiedUsers}
                            onChange={(e) => setSelectedUsers(e.value)}
                            optionLabel="name"
                            placeholder="Select verified users"
                            className="w-full mb-3"
                        />
                    )}
                    <div className="flex justify-end mt-4">
                        <Button
                            label="Add Members"
                            icon="pi pi-check"
                            className="p-button-sm p-button-primary mb-3"
                            onClick={addMembers}
                            disabled={selectedUsers.length === 0}
                        />
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ProjectMembers;
