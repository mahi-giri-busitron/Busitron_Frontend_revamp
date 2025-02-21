import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import SideNavigation from "./SideNavigation.jsx";
import { useLocation } from "react-router-dom";
const TopNavBar = (props) => {
    const [activePath, setActivePath] = useState("");
    const location = useLocation();
    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    const { setActiveTab, maximizeSideBar, setMaximizeSideBar } = props;
    const [visible, setVisible] = useState(false);

    const getDashBoardHeader = () => {
        switch (true) {
            case activePath === "/dashboard" || activePath === "/dashboard/":
                return "Dashboard";
            case activePath.startsWith("/dashboard/project"):
                return "Projects";
            case activePath.startsWith("/dashboard/task"):
                return "Tasks";
            case activePath.startsWith("/dashboard/ticket"):
                return "Tickets";
            case activePath.startsWith("/dashboard/message"):
                return "Messages";
            case activePath.startsWith("/dashboard/profile"):
                return "Profile";
            case activePath === "/dashboard/setting" ||
                activePath === "/dashboard/setting/":
                return "Settings";
            case activePath === "/dashboard/setting/company-settings" ||
                activePath === "/dashboard/setting/company-settings/":
                return "Settings > Company-Settings";
            case activePath === "/dashboard/setting/business-address" ||
                activePath === "/dashboard/setting/business-address/":
                return "Settings > Business-Settings";
            case activePath === "/dashboard/setting/app-settings" ||
                activePath === "/dashboard/setting/app-settings/":
                return "Settings > App-Settings";
            case activePath === "/dashboard/setting/role-permissions" ||
                activePath === "/dashboard/setting/role-permissions/":
                return "Settings > Role-Permissions";
            case activePath === "/dashboard/setting/task-settings" ||
                activePath === "/dashboard/setting/task-settings/":
                return "Settings > Tast-Settings";
            case activePath === "/dashboard/setting/module-settings" ||
                activePath === "/dashboard/setting/module-settings/":
                return "Settings > Module-Settings";
            case activePath.startsWith("/dashboard/financial-management"):
                return "Financial Management";
            case activePath.startsWith("/dashboard/performance-tracking"):
                return "Performance Tracking";
            case activePath.startsWith("/dashboard/user-management"):
                return "User Management";
            default:
                return "Dashboard";
        }
    };
    return (
        <div className=" max-h-[85px]  h-[85px]     max-w-[100vw] flex justify-between border-b-2  border-gray-400 items-center px-5 py-3   sticky top-0 z-50">
            <div className="flex gap-2 items-center">
                <div className="lg:hidden mr-2 flex  items-center">
                    <i
                        className="pi pi-bars cursor-pointer text-gray-600 hover:text-blue-600"
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => setVisible(true)}
                    ></i>
                </div>
                <h2 className="text-2xl font-semibold">
                    {getDashBoardHeader()}
                </h2>
            </div>
            <div className="flex items-center gap-4 rounded-full border-1 border-gray-400 pr-4 pl-5 py-2">
                <i
                    className="pi pi-bell text-gray-600 text-xl cursor-pointer hover:text-blue-600"
                    style={{ fontSize: "1.5rem" }}
                ></i>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-600 text-white rounded-full">
                    AP
                </div>
            </div>
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                content={() => (
                    <React.Fragment className="relative">
                        <i
                            className=" absolute top-2 right-2 text-right pi pi-times-circle text-xl cursor-pointer hover:text-blue-600"
                            onClick={() => setVisible(false)}
                            style={{ fontSize: "1.5rem" }}
                        />
                        <SideNavigation
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                            maximizeSideBar={maximizeSideBar}
                            setMaximizeSideBar={setMaximizeSideBar}
                        />
                    </React.Fragment>
                )}
            ></Sidebar>
        </div>
    );
};
export default TopNavBar;
