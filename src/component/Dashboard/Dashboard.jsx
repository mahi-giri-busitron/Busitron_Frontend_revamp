import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import SideNavigation from "./Navigation/SideNavigation.jsx";
import TopNavBar from "./Navigation/TopNavBar.jsx";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { motion } from "framer-motion";

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
    }, []);

    return (
        <div className="flex h-screen">
            <motion.div
                initial={{ width: "0px" }}
                animate={{ width: maximizeSideBar ? "20%" : "80px" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`hidden md:block drop-shadow-lg ${
                    maximizeSideBar && " min-w-[235px] "
                }`}
            >
                <SideNavigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    maximizeSideBar={maximizeSideBar}
                    setMaximizeSideBar={setMaximizeSideBar}
                />
            </motion.div>
            <div className="  border-t-0 w-full  ">
                <div className="max-h-[100px]  bg-white w-full">
                    <TopNavBar
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        maximizeSideBar={maximizeSideBar}
                        setMaximizeSideBar={setMaximizeSideBar}
                    />
                </div>
                <div
                    className="overflow-auto "
                    style={{
                        height: "calc(100vh - 85px)",
                        scrollbarWidth: "thin",
                    }}
                >
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
