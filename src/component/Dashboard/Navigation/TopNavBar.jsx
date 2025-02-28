import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import SideNavigation from "./SideNavigation.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const TopNavBar = (props) => {
    const [activePath, setActivePath] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        setActivePath(location.pathname);
    }, [location.pathname]);

    const { setActiveTab, maximizeSideBar, setMaximizeSideBar } = props;
    const [visible, setVisible] = useState(false);
    const [showOptions, setShowOptions] = useState(false);

    const HeadingType1 = ({ headText = "DashBoard" }) => {
        return <h2 className="text-2xl font-semibold">{headText}</h2>;
    };
    const HeadingType2 = ({
        headText = "DashBoard",
        childtext = "Sub setting",
    }) => {
        const symbol = ">";
        return (
            <h2 className="text-2xl font-semibold">
                {headText} {symbol}{" "}
                <span className="text-lg text-gray-600">{childtext}</span>
            </h2>
        );
    };

    const getDashBoardHeader = () => {
        switch (true) {
            case activePath === "/dashboard" || activePath === "/dashboard/":
                return <HeadingType1 headText="Dashboard" />;
            case activePath.startsWith("/dashboard/project"):
                return <HeadingType1 headText="Projects" />;
            case activePath.startsWith("/dashboard/task"):
                return <HeadingType1 headText="Tasks" />;
            case activePath.startsWith("/dashboard/ticket"):
                return <HeadingType1 headText="Tickets" />;
            case activePath.startsWith("/dashboard/message"):
                return <HeadingType1 headText="Messages" />;
            case activePath.startsWith("/dashboard/profile"):
                return <HeadingType1 headText="Profile" />;
            case activePath === "/dashboard/setting" ||
                activePath === "/dashboard/setting/":
                return <HeadingType1 headText="Settings" />;
            case activePath === "/dashboard/setting/company-settings" ||
                activePath === "/dashboard/setting/company-settings/":
                return (
                    <HeadingType2
                        headText="Settings"
                        childtext="Company-Settings"
                    />
                );
            case activePath === "/dashboard/setting/business-address" ||
                activePath === "/dashboard/setting/business-address/":
                return (
                    <HeadingType2
                        headText="Settings"
                        childtext="Business-Settings"
                    />
                );
            case activePath === "/dashboard/setting/app-settings" ||
                activePath === "/dashboard/setting/app-settings/":
                return (
                    <HeadingType2
                        headText="Settings"
                        childtext="App-Settings"
                    />
                );
            case activePath === "/dashboard/setting/role-permissions" ||
                activePath === "/dashboard/setting/role-permissions/":
                return (
                    <HeadingType2
                        headText="Settings"
                        childtext="Role-Permissions"
                    />
                );
            case activePath === "/dashboard/setting/task-settings" ||
                activePath === "/dashboard/setting/task-settings/":
                return (
                    <HeadingType2
                        headText="Settings"
                        childtext="Task-Settings"
                    />
                );
            case activePath === "/dashboard/setting/module-settings" ||
                activePath === "/dashboard/setting/module-settings/":
                return (
                    <HeadingType2
                        headText="Settings"
                        childtext="Module-Settings"
                    />
                );
            case activePath.startsWith("/dashboard/financial-management"):
                return <HeadingType1 headText="Financial Management" />;
            case activePath.startsWith("/dashboard/performance-tracking"):
                return <HeadingType1 headText="Performance Tracking" />;
            case activePath.startsWith("/dashboard/user-management"):
                return <HeadingType1 headText="User Management" />;
            default:
                return <HeadingType1 headText="Dashboard" />;
        }
    };
    return (
        <div className=" max-h-[85px] h-[85px] max-w-[100vw] flex justify-between border-b-2 border-gray-400 items-center px-5 py-3 sticky top-0 z-50">
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
            <div className="flex items-center gap-5 rounded-full pr-4 pl-5 py-2">
                <i
                    className="pi pi-bell text-gray-600 text-xl cursor-pointer hover:text-blue-600"
                    style={{ fontSize: "1.5rem" }}
                ></i>
                <div className="w-10 h-8 flex items-center justify-center bg-gray-600 text-white rounded-full">
                    <img
                        src={currentUser?.data?.avatar}
                        className="cursor-pointer rounded-full w-[50px] h-[40px]"
                        onClick={() => setShowOptions(!showOptions)}
                    />
                    {/* Dropdown Menu */}
                    {showOptions && (
                        <div className="absolute right-10 mt-[8rem] border rounded-sm shadow-lg bg-white text-black">
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-600 hover:text-white"
                                onClick={() => navigate("/dashboard/profile")}
                            >
                                Profile
                            </button>
                            <button
                                className="block w-full px-4 py-2 text-left hover:bg-gray-600 hover:text-white"
                                onClick={() =>
                                    navigate("/dashboard/changePassword")
                                }
                            >
                                Change Password
                            </button>
                        </div>
                    )}
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
                            activeTab={activePath}
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
