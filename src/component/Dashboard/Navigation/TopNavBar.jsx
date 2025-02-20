import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import SideNavigation from "./SideNavigation.jsx";
const TopNavBar = (props) => {
    const { activeTab, setActiveTab, maximizeSideBar, setMaximizeSideBar } =
        props;
    const [visible, setVisible] = useState(false);

    const getDashBoardHeader = () => {
        switch (activeTab) {
            case "/dashboard":
                return "Dashboard";

            case "/dashboard/project":
                return "Projects";
            case "/dashboard/task":
                return "Tasks";
            case "/dashboard/ticket":
                return "Tickets";

            case "/dashboard/email":
                return "Emails";
            case "/dashboard/profile":
                return "Profile";

            case "/dashboard/setting":
                return "Settings";
            default:
                return "Dashboard";
        }
    };
    return (
        <div className=" max-h-[85px]  h-[85px]     max-w-full flex justify-between border-b-2  border-gray-400 items-center px-5 py-3   sticky top-0 z-50">
            <div className="flex gap-2 items-center">
                <div className="md:hidden ">
                    <i
                        className="pi pi-bars"
                        style={{ color: "black", fontSize: "1.5rem" }}
                        onClick={() => setVisible(true)}
                    ></i>
                </div>
                <h2 className="text-2xl font-semibold">
                    {getDashBoardHeader()}
                </h2>
            </div>
            <div className="flex items-center gap-4 rounded-full border-1 border-gray-400 px-2 py-2">
                <div className="relative hidden lg:block">
                    <input
                        type="text"
                        placeholder="Search"
                        className=" pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none"
                    />
                    <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                </div>
                <span className="lg:hidden">
                    <i className="pi pi-search  text-gray-600 text-xl hover:text-blue-600"></i>{" "}
                </span>
                <i className="pi pi-bell text-gray-600 text-xl cursor-pointer hover:text-blue-600"></i>
                <i className="pi pi-info-circle text-gray-600 text-xl cursor-pointer hover:text-blue-600"></i>
                <div className="w-8 h-8 flex items-center justify-center bg-gray-600 text-white rounded-full">
                    AP
                </div>
            </div>
            <Sidebar
                visible={visible}
                onHide={() => setVisible(false)}
                content={() => (
                    <SideNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        maximizeSideBar={maximizeSideBar}
                        setMaximizeSideBar={setMaximizeSideBar}
                    />
                )}
            ></Sidebar>
        </div>
    );
};
export default TopNavBar;
