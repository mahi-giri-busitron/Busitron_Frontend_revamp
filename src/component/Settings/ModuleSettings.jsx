import React, { useState, useEffect } from "react";
import { TabMenu } from "primereact/tabmenu";
import { TriStateCheckbox } from "primereact/tristatecheckbox";
import { Button } from "primereact/button";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const ModuleSettings = () => {
    const [roles, setRoles] = useState([]);
    const [moduleSettings, setModuleSettings] = useState([]);
    const [activeRole, setActiveRole] = useState(0);
    const [toggleStates, setToggleStates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5421/api/v1/role_permissions"
                );
                const data = response.data[0];

                const rolesData = data.role_permissions.map(
                    (rolePermission) => ({
                        _id: rolePermission._id,
                        role: rolePermission.role,
                    })
                );
                setRoles(rolesData);

                const moduleSettingsData = Object.keys(
                    data.role_permissions[0].permissions
                );
                setModuleSettings(moduleSettingsData);

                const initialToggleStates = {};
                rolesData.forEach(({ _id }) => {
                    initialToggleStates[_id] = {};
                    moduleSettingsData.forEach((setting) => {
                        initialToggleStates[_id][setting] = null;
                    });
                });
                setToggleStates(initialToggleStates);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

    const handleToggleChange = (setting, value) => {
        const { _id } = roles[activeRole];
        setToggleStates((prevState) => ({
            ...prevState,
            [_id]: {
                ...prevState[_id],
                [setting]: value,
            },
        }));
    };

    const handleSave = async () => {
        try {
            const { _id } = roles[activeRole];
            const permissions = Object.entries(toggleStates[_id] || {}).reduce(
                (acc, [key, value]) => {
                    if (value !== null) {
                        acc[key] = { view: value };
                    }
                    return acc;
                },
                {}
            );

            const payload = { permissions };
            console.log(
                "Payload being sent:",
                JSON.stringify(payload, null, 2)
            );

            await axios.put(
                `http://localhost:5421/api/v1/role_permissions/67c19715a7ed1b3ddd180f4c/${_id}`,
                payload,
                { headers: { "Content-Type": "application/json" } }
            );

            toast.success("Settings updated successfully");
        } catch (error) {
            toast.error("Error updating settings");
            console.error("Error updating settings:", error);
        }
    };

    return (
        <div className="p-4">
            <Toaster />
            <Button
                label="Save"
                icon="pi pi-save"
                onClick={handleSave}
                className="mb-4"
            />

            <TabMenu
                model={roles.map(({ role }, index) => ({
                    label: role,
                    command: () => setActiveRole(index),
                }))}
                activeIndex={activeRole}
            />

            <div className="grid grid-cols-4 gap-4 mt-4">
                {moduleSettings.map((setting) => (
                    <div key={setting} className="flex items-center gap-2">
                        <TriStateCheckbox
                            value={
                                toggleStates[roles[activeRole]?._id]?.[
                                    setting
                                ] || null
                            }
                            onChange={(e) =>
                                handleToggleChange(setting, e.value)
                            }
                        />
                        <span>{setting}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ModuleSettings;
