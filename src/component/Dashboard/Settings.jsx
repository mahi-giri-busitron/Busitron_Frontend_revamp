import { Button } from "primereact/button";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { GetSettingNavigation } from "../Settings/SettingConst.js";
import { useEffect, useState } from "react";

const Settings = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeTab, setActiveTab] = useState("");
    const settingsNav = GetSettingNavigation();

    useEffect(() => {
        const currentPath = location.pathname;
        setActiveTab(currentPath);
    }, []);

    return (
        <div className="flex h-full w-full ">
            <div className="flex-1 flex">
                <div
                    className="w-1/5 bg-white shadow-lg p-4 overflow-auto h-full"
                    style={{ scrollbarWidth: "thin" }}
                >
                    <nav className="flex flex-col">
                        {settingsNav.map((item) => (
                            <div
                                className={` flex   items-center pl-4  pr-2  py-3 w-full text-left hover:text-blue-600 transition duration-200 border-r-3 cursor-pointer ${
                                    activeTab === item.path ||
                                    activeTab === item.path + "/" ||
                                    (item.path !== "/dashboard" &&
                                        item.path !== "/" &&
                                        activeTab.startsWith(item.path))
                                        ? "text-blue-600 font-semibold border-r-3 border-blue-600"
                                        : "text-gray-500 font-medium border-white"
                                }`}
                                key={item.key}
                                onClick={() => {
                                    navigate(item.path);
                                    setActiveTab(item.path);
                                }}
                            >
                                {item.label}
                            </div>
                        ))}
                    </nav>
                </div>
                <div
                    className=" p-6 overflow-auto w-full "
                    style={{ scrollbarWidth: "thin" }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Settings;
