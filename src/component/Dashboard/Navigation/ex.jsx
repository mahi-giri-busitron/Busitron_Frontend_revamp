import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavigation from "./Navigation/SideNavigation.jsx";
import TopNavBar from "./Navigation/TopNavBar.jsx";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";

const Dashboard = () => {
    const [activeTab, setActiveTab] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [maximizeSideBar, setMaximizeSideBar] = React.useState(true);
    const location = useLocation();

    React.useEffect(() => {
        const currentPath = location.pathname;
        setActiveTab(currentPath);
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMaximizeSideBar(true);
            }
        };
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [location.pathname]);

    return (
        <div className="flex h-screen">
            <div
                className={`hidden md:block ${
                    maximizeSideBar && "w-1/5 min-w-[235px] shadow-lg"
                }`}
                style={{ height: "100vh", overflowY: "hidden" }}
            >
                <div style={{ height: "100%", overflowY: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                    <SideNavigation
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        maximizeSideBar={maximizeSideBar}
                        setMaximizeSideBar={setMaximizeSideBar}
                    />
                </div>
            </div>
            <div className="border-t-0 w-full">
                <div className="max-h-[100px] bg-white w-full">
                    <TopNavBar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        maximizeSideBar={maximizeSideBar}
                        setMaximizeSideBar={setMaximizeSideBar}
                    />
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
