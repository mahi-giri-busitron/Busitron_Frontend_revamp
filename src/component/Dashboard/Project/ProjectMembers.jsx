import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { MultiSelect } from "primereact/multiselect";
import { RadioButton } from "primereact/radiobutton";
import { InputText } from "primereact/inputtext";

const ProjectMembers = () => {
    const [members, setMembers] = useState([
        { id: 1, name: "Mr Mahesh Balu Giri", role: "Project Admin" },
        { id: 2, name: "Mr Ponnana Pavan", role: "Project Admin" },
    ]);

    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setTimeout(() => {
            setVerifiedUsers([
                { id: 3, name: "Alice Johnson", role: "Member" },
                { id: 4, name: "Bob Smith", role: "Member" },
                { id: 5, name: "Charlie Brown", role: "Member" },
                { id: 6, name: "David Lee", role: "Member" },
                { id: 7, name: "Eva Green", role: "Member" },
            ]);
            setLoading(false);
        }, 2000);
    }, []);

    const filteredMembers = members.filter(
        (member) =>
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const addMembers = () => {
        if (selectedUsers.length > 0) {
            const newMembers = selectedUsers.map((user) => ({
                id: user.id,
                name: user.name,
                role: "Member",
            }));
            setMembers([...members, ...newMembers]);
            setDialogVisible(false);
            setSelectedUsers([]);
        }
    };

    return (
        <div className="py-4">
            <div className="mx-5 my-4 flex flex-wrap items-center justify-between gap-4 md:flex-wrap text-xs">
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    <Button
                        label="Add members"
                        size="small"
                        icon="pi pi-plus"
                        severity="primary"
                        onClick={() => setDialogVisible(true)}
                    />
                </div>

                <div className="w-full md:w-72">
                    <div className="p-inputgroup flex-1 h-9">
                        <span className="p-inputgroup-addon cursor-pointer">
                            <i className="pi pi-search"></i>
                        </span>
                        <InputText
                            placeholder="Start Searching...."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className="p-3">
                <DataTable value={filteredMembers} responsiveLayout="scroll">
                    <Column field="id" header="#" />
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
                        field="role"
                        header="User Role"
                        body={(rowData) => (
                            <div className="flex gap-3">
                                <div className="flex items-center">
                                    <RadioButton
                                        inputId={`admin-${rowData.id}`}
                                        name={`role-${rowData.id}`}
                                        value="Project Admin"
                                        checked={
                                            rowData.role === "Project Admin"
                                        }
                                        disabled
                                    />
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
                                <Button
                                    icon="pi pi-trash"
                                    label="Delete"
                                    className="p-button-primary"
                                    onClick={() =>
                                        setMembers(
                                            members.filter(
                                                (m) => m.id !== rowData.id
                                            )
                                        )
                                    }
                                />
                            </div>
                        )}
                        style={{ width: "150px" }} // Optional to control column width
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
