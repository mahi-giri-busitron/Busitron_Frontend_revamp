import { GetNavigationData } from "./NavigationConst.js";
import { Link } from "react-router-dom";
import SideTopNavigation from "./SideTopNavigation.jsx";
import { useState } from "react";
const SideNavigation = ({
    activeTab,
    setActiveTab,
    maximizeSideBar,
    setMaximizeSideBar,
}) => {
    const navData = GetNavigationData();
    const ProfileData = {
        name: "mahesh",
        designation: "Full Satck Developer ",
    };
    return (
        <div
            className={` ${
                maximizeSideBar ? "w-full" : ""
            }  text-cyan-50 bg-white flex flex-col justify-between h-full`}
        >
            <div>
                <SideTopNavigation
                    ProfileData={ProfileData}
                    setMaximizeSideBar={setMaximizeSideBar}
                    maximizeSideBar={maximizeSideBar}
                />
                <nav className="mt-4 text-cyan-50">
                    {navData.map((each, index) => (
                        <Link
                            key={index}
                            to={each.path}
                            className="block  "
                            onClick={() => setActiveTab(each.path)}
                        >
                            <button
                                className={` flex  justify-center pl-4  pr-2  py-3 w-full text-left hover:text-blue-600 transition duration-200 border-r-3 cursor-pointer ${
                                    activeTab === each.path
                                        ? "text-blue-600 font-semibold border-r-3 border-blue-600"
                                        : "text-gray-500 font-medium border-white"
                                }`}
                            >
                                <i
                                    className={` ${each.icon}`}
                                    style={{ fontSize: "1.2rem" }}
                                ></i>

                                {maximizeSideBar && (
                                    <span className="ml-3 w-full">
                                        {each.label}{" "}
                                    </span>
                                )}
                            </button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="px-4 md:px-6 py-3 w-full">
                <Link to="/" className="w-full">
                    <button
                        className={`w-full text-left hover:text-blue-600 font-semibold text-gray-500 transition duration-200 cursor-pointer`}
                    >
                        <i className={`mr-3 pi pi-sign-out`}></i>
                        {maximizeSideBar && "Logout"}
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default SideNavigation;
