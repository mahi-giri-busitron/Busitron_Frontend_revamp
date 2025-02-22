import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const RolesPermissions = () => {
    const [manageRoleVisible, setManageRoleVisible] = useState(false);
    const [expandedRole, setExpandedRole] = useState(null);

    const { control, handleSubmit, reset } = useForm({
        defaultValues: {
            roleName: "",
            importRole: null,
            permissions: {},
        },
    });

    const permissionOptions = [
        { label: "None", value: "None" },
        { label: "Added", value: "Added" },
        { label: "All", value: "All" },
        { label: "Owned", value: "Owned" },
    ];

    const roles = [
        {
            id: 1,
            role: "App Administrator",
            unsyncedUsers: 0,
            deletable: false,
        },
        { id: 2, role: "Employee", unsyncedUsers: 0, deletable: false },
        { id: 3, role: "Client", unsyncedUsers: 0, deletable: false },
    ];

    const permissions = [
        {
            module: "Leads",
            add: "Added",
            view: "All",
            update: "Added",
            delete: "None",
        },
        {
            module: "Estimates",
            add: "None",
            view: "None",
            update: "None",
            delete: "None",
        },
        {
            module: "Clients",
            add: "None",
            view: "None",
            update: "None",
            delete: "None",
        },
    ];

    const onSubmit = (data) => {
        setManageRoleVisible(false);
        reset();
    };

    return (
        <div className="p-4">
            <Button
                label="Manage Role"
                icon="pi pi-cog"
                onClick={() => setManageRoleVisible(true)}
                className="m-4"
            />
            <h2 className="text-xl font-semibold py-5">Roles & Permissions</h2>

            <div className="mt-4 space-y-4">
                {roles.map((role) => (
                    <div
                        key={role.id}
                        className="border rounded-lg p-4 shadow-sm"
                    >
                        <div className="flex flex-wrap justify-between items-center gap-3">
                            <div>
                                <strong className="text-sm text-gray-700">
                                    {role.role}
                                </strong>
                                <p className="text-sm text-gray-500">
                                    {role.unsyncedUsers} Unsynced Users
                                </p>
                            </div>

                            {!role.deletable ? (
                                <p className="text-gray-400 text-sm">
                                    Default role cannot be deleted.
                                </p>
                            ) : (
                                <Button
                                    icon="pi pi-trash"
                                    className="p-button-danger"
                                />
                            )}

                            <Button
                                label="Permissions"
                                icon="pi pi-key"
                                onClick={() =>
                                    setExpandedRole(
                                        expandedRole === role.id
                                            ? null
                                            : role.id
                                    )
                                }
                                className="p-button-outlined"
                            />
                        </div>

                        <div
                            className={`overflow-hidden transition-all duration-300 ${
                                expandedRole === role.id
                                    ? "max-h-[500px] mt-4"
                                    : "max-h-0"
                            }`}
                        >
                            {expandedRole === role.id && (
                                <div className="border-t mt-2 pt-4 overflow-x-auto">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <DataTable
                                            value={permissions}
                                            scrollable
                                            scrollHeight="flex"
                                        >
                                            <Column
                                                field="module"
                                                header="Module"
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
                                                            name={`permissions.${role.id}.${rowData.module}.${perm}`}
                                                            control={control}
                                                            defaultValue={
                                                                rowData[perm]
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
                        <Column field="id" header="#" />
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
                                            "App Administrator" && (
                                            <Button
                                                icon="pi pi-refresh"
                                                className="p-button-secondary"
                                                label="Reset Permissions"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        />
                    </DataTable>
                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
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
                                        <InputText
                                            {...field}
                                            id="roleName"
                                            placeholder="Enter Role Name"
                                            className="w-full"
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

                        <div>
                            <label
                                htmlFor="importRole"
                                className="block font-medium mb-1"
                            >
                                Import from Role
                            </label>
                            <Controller
                                name="importRole"
                                control={control}
                                rules={{ required: "Import role is required" }}
                                render={({ field, fieldState }) => (
                                    <div>
                                        <Dropdown
                                            {...field}
                                            id="importRole"
                                            options={roles.map((r) => ({
                                                label: r.role,
                                                value: r.role,
                                            }))}
                                            placeholder="Select a Role"
                                            className={`w-full ${
                                                fieldState.error
                                                    ? "p-invalid"
                                                    : ""
                                            }`}
                                        />
                                        {fieldState.error && (
                                            <small className="text-red-500">
                                                {fieldState.error.message}
                                            </small>
                                        )}
                                    </div>
                                )}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <Button
                            type="submit"
                            label="Save"
                            icon="pi pi-check"
                            className="p-button-primary"
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default RolesPermissions;
