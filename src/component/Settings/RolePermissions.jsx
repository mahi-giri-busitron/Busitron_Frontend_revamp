import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { TabMenu } from "primereact/tabmenu";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const RolesPermissions = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [manageRoleVisible, setManageRoleVisible] = useState(false);
    const [expandedRole, setExpandedRole] = useState(null);
    const [roles, setRoles] = useState([]);
    const [permissions, setPermissions] = useState([]);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            roleName: "",
            importRole: null,
            permissions: {},
        },
    });

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const response = await axios.get(
                "http://localhost:5421/api/v1/role_permissions"
            );
            const rolePermissions = response.data[0].role_permissions;
            setRoles(rolePermissions);
            setPermissions(rolePermissions);
        } catch (error) {
            toast.error("Failed to fetch roles.");
            
        }
    };

    const onSubmitRole = async (data) => {
        
        try {
            const payload = { role: data.roleName };
            const response = await axios.post(
                "http://localhost:5421/api/v1/role_permissions/67c19715a7ed1b3ddd180f4c",
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Role assigned successfully!");
               
                fetchRoles();
            } else {
                toast.error("Unexpected response from the server.");
                
            }
        } catch (error) {
            toast.error("Failed to assign role!");
           
        }
    };

    const updatePermissions = async (roleId, updatedPermissions) => {
        try {
            const payload = {
                permissions: updatedPermissions,
            };

            const response = await axios.put(
                `http://localhost:5421/api/v1/role_permissions/67c19715a7ed1b3ddd180f4c/${roleId}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Permissions updated successfully!");
                
                fetchRoles();
            } else {
                toast.error("Unexpected response from the server.");
                
            }
        } catch (error) {
            toast.error("Failed to update permissions.");
            

            if (error.response) {
                toast.error("Response data:", error.response.data);
           
     
            } else if (error.request) {
               
                toast.error("Response data:", error.response.data);
            } else {
                toast.error("Response data:", error.response.data);
            }
        }
    };

    const items = [{ label: "Roles & Permissions", icon: "pi pi-users" }];

    const permissionOptions = [
        { label: "Yes", value: "Yes" },
        { label: "No", value: "No" },
    ];

    const onSubmit = (data) => {
        setManageRoleVisible(false);
        reset();
    };

    const deleteRole = async (roleId) => {
        try {
            const response = await axios.delete(
                `http://localhost:5421/api/v1/role_permissions/67c19715a7ed1b3ddd180f4c/${roleId}`
            );

            if (response.status === 200 || response.status === 204) {
                toast.success("Role deleted successfully!");
                fetchRoles();
            } else {
                toast.error("Unexpected response from the server.");
                
            }
        } catch (error) {
            toast.error("Failed to delete role!");
           
        }
    };

    const resetPermissions = async (roleId) => {
        try {
            const role = roles.find((r) => r._id === roleId);
            if (!role) {
                toast.error("Role not found.");
                return;
            }

            const resetPermissionsPayload = {
                permissions: {
                    projects: {
                        add: false,
                        view: false,
                        update: false,
                        delete: false,
                    },
                    financial_management: {
                        add: false,
                        view: false,
                        update: false,
                        delete: false,
                    },
                    performance_tracking: {
                        add: false,
                        view: false,
                        update: false,
                        delete: false,
                    },

                    manage_users: {
                        add: false,
                        view: false,
                        update: false,
                        delete: false,
                    },
                    tickets: {
                        add: false,
                        view: false,
                        update: false,
                        delete: false,
                    },
                    settings: {
                        add: false,
                        view: false,
                        update: false,
                        delete: false,
                    },
                },
            };

           

            const response = await axios.put(
                `http://localhost:5421/api/v1/role_permissions/67c19715a7ed1b3ddd180f4c/${roleId}`,
                resetPermissionsPayload, // Send the payload directly
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                toast.success("Permissions reset successfully!");
            } else {
                toast.error("Unexpected response from the server.");
            }
        } catch (error) {
            toast.error("Failed to reset permissions.");
        }
    };

    return (
        <div>
            <Toaster />
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            />

            <div className="mt-4">
                <Button
                    label="Manage Role"
                    icon="pi pi-cog"
                    onClick={() => setManageRoleVisible(true)}
                    className="p-button-primary"
                />
            </div>

            <div className="mt-4 space-y-4">
                {roles.map((role) => (
                    <div
                        key={role._id}
                        className="border rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex flex-wrap justify-between items-center gap-3">
                            <div>
                                <strong className="text-sm text-gray-700">
                                    {role.role}
                                </strong>
                                <p className="text-sm text-gray-500">
                                    0 Unsynced Users
                                </p>
                            </div>

                            {role.role === "Super Admin" ? (
                                <p className="text-gray-400 text-sm">
                                    Default role cannot be deleted.
                                </p>
                            ) : (
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-danger"
                                    onClick={() => deleteRole(role._id)}
                                />
                            )}
                            {role.role === "Super Admin" ? (
                                <p className="text-gray-400 text-sm">
                                    Default role cannot be deleted.
                                </p>
                            ) : (
                                <Button
                                    label="Permissions"
                                    icon="pi pi-key"
                                    onClick={() =>
                                        setExpandedRole(
                                            expandedRole === role._id
                                                ? null
                                                : role._id
                                        )
                                    }
                                    className="p-button-outlined"
                                />
                            )}
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                expandedRole === role._id
                                    ? "max-h-[500px] mt-4"
                                    : "max-h-0"
                            }`}
                        >
                            {expandedRole === role._id && (
                                <div className="border-t mt-2 pt-4 overflow-auto max-h-[50vh]">
                                    <form
                                        onSubmit={handleSubmit((data) => {
                                            const updatedPermissions = {};
                                            if (
                                                data.permissions &&
                                                data.permissions[role._id]
                                            ) {
                                                Object.keys(
                                                    data.permissions[role._id]
                                                ).forEach((module) => {
                                                    updatedPermissions[module] =
                                                        {};
                                                    Object.keys(
                                                        data.permissions[
                                                            role._id
                                                        ][module]
                                                    ).forEach((perm) => {
                                                        updatedPermissions[
                                                            module
                                                        ][perm] =
                                                            data.permissions[
                                                                role._id
                                                            ][module][perm] ===
                                                            "Yes";
                                                    });
                                                });
                                            }

                                            updatePermissions(
                                                role._id,
                                                updatedPermissions
                                            );
                                        })}
                                    >
                                        <DataTable
                                            value={Object.entries(
                                                role.permissions
                                            ).map(([module, perms]) => ({
                                                module,
                                                ...perms,
                                            }))}
                                            scrollable
                                            scrollHeight="flex"
                                        >
                                            <Column
                                                field="module"
                                                header="Moduledsdss"
                                            />

                                            {[
                                                "add",
                                                "view",
                                                "update",
                                                "delete",
                                            ].map((perm) => (
                                                <Column
                                                    key={perm}
                                                    field={perm}
                                                    header={
                                                        perm
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                        perm.slice(1)
                                                    }
                                                    body={(rowData) => (
                                                        <Controller
                                                            name={`permissions.${role._id}.${rowData.module}.${perm}`}
                                                            control={control}
                                                            defaultValue={
                                                                rowData[perm]
                                                                    ? "Yes"
                                                                    : "No"
                                                            }
                                                            render={({
                                                                field,
                                                            }) => (
                                                                <Dropdown
                                                                    {...field}
                                                                    options={
                                                                        permissionOptions
                                                                    }
                                                                    placeholder="Select"
                                                                    className="w-full md:w-40"
                                                                />
                                                            )}
                                                        />
                                                    )}
                                                />
                                            ))}
                                        </DataTable>

                                        <div className="flex justify-end mt-4">
                                            <Button
                                                type="submit"
                                                label="Save"
                                                icon="pi pi-check"
                                                className="p-button-primary"
                                            />
                                        </div>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <Dialog
                header="Manage Role"
                visible={manageRoleVisible}
                onHide={() => {
                    setManageRoleVisible(false);
                    reset();
                }}
                draggable={false}
                className="w-full max-w-5xl mx-10"
            >
                <div className="overflow-x-auto">
                    <DataTable value={roles} scrollable scrollHeight="400px">
                        <Column field="role" header="User Role" />
                        <Column field="unsyncedUsers" header="Unsynced Users" />
                        <Column
                            header="Action"
                            body={(rowData) => (
                                <div className="flex flex-wrap items-center gap-2 min-h-[40px]">
                                    <span className="text-gray-500 text-sm">
                                        Default role cannot be deleted.
                                    </span>
                                    <div className="h-[40px]lex items-center">
                                        {rowData.role !==
                                            "App_Administrator" && (
                                            <Button
                                                icon="pi pi-refresh"
                                                className="p-button-secondary"
                                                label="Reset Permissions"
                                                onClick={() =>
                                                    resetPermissions(
                                                        rowData._id
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        />
                    </DataTable>
                </div>

                <form onSubmit={handleSubmit(onSubmitRole)}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-3">
                        <div>
                            <label
                                htmlFor="roleName"
                                className="block font-medium mb-1"
                            >
                                Role Name{" "}
                                <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="roleName"
                                control={control}
                                rules={{ required: "Role Name is required" }}
                                render={({ field, fieldState }) => (
                                    <>
                                        <input
                                            {...field}
                                            id="roleName"
                                            placeholder="Enter Role Name"
                                            className="w-full border p-2 rounded"
                                        />
                                        {fieldState.error && (
                                            <small className="text-red-500">
                                                {fieldState.error.message}
                                            </small>
                                        )}
                                    </>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default RolesPermissions;