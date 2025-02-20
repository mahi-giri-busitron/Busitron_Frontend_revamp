import { Button } from "primereact/button";
import { useNavigate, Outlet } from "react-router-dom";
import { GetSettingNavigation } from "../Settings/SettingConst.js";

const Settings = () => {
    const navigate = useNavigate();

    const settingsNav = GetSettingNavigation();

    return (
        <div className="flex h-screen">
            <div className="flex-1 flex">
                <div className="w-1/5 bg-white shadow-lg p-4">
                    <nav className="flex flex-col">
                        {settingsNav.map((item) => (
                            <Button
                                key={item.key}
                                label={item.label}
                                onClick={() => navigate(item.path)}
                                text
                            />
                        ))}
                    </nav>
                </div>
                <div className="flex-1 p-6">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Settings;
