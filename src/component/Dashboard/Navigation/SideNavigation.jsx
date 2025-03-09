import { GetNavigationData } from "./NavigationConst.js";
import { Link, useNavigate } from "react-router-dom";
import SideTopNavigation from "./SideTopNavigation.jsx";
import { useDispatch, useSelector } from "react-redux";
import { signOutUser } from "../../../redux/userSlice.js";
import toast from "react-hot-toast";
import { useEffect } from "react";

const SideNavigation = ({
    activeTab = "/dashboard",
    setActiveTab,
    maximizeSideBar,
    setMaximizeSideBar,
}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);
    const { roles } = useSelector((state) => state.rolesPermissions);

    const currentRole = currentUser?.data?.role;
    const isSuperAdmin = currentRole === "SuperAdmin";

    const roleData = roles.find((r) => r.role === currentRole);
    const effectivePermissions = isSuperAdmin
        ? {}
        : roleData?.permissions || {};

    const filteredNavData = GetNavigationData().filter((item) => {
        if (!item.needsPermission) {
            return true;
        }

        if (isSuperAdmin) {
            return ![
                "Projects",
                "Performance-Tracking",
                "Tasks",
                "Tickets",
            ].includes(item.label);
        }

        if (currentRole === "Employee") {
            const restrictedForEmployees = [
                "Manage Users",
                "Financial Management",
                "Settings",
            ];
            if (restrictedForEmployees.includes(item.label)) {
                return false;
            }
        }

        return effectivePermissions[item.permissionKey]?.view === true;
    });

    const ProfileData = {
        name: currentUser?.data?.name,
        designation: currentUser?.data?.designation,
        avatar: currentUser?.data?.avatar,
    };

    const handleClick = async () => {
        const apiResult = await dispatch(signOutUser());
        if (signOutUser.fulfilled.match(apiResult)) {
            localStorage.clear();
            toast.success("Signed Out Successfully!");
            navigate("/signin");
        }
    };

    return (
        <div
            className={`${
                maximizeSideBar ? "w-full" : ""
            } text-cyan-50 bg-white flex flex-col justify-between h-full`}
        >
            <div>
                <SideTopNavigation
                    ProfileData={ProfileData}
                    setMaximizeSideBar={setMaximizeSideBar}
                    maximizeSideBar={maximizeSideBar}
                />

                <nav
                    className="overflow-y-auto"
                    style={{
                        maxHeight: "calc(100vh - 140px)",
                        scrollbarWidth: "thin",
                    }}
                >
                    {filteredNavData.map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            className="block"
                            onClick={() => setActiveTab(item.path)}
                        >
                            <button
                                className={`flex justify-center items-center pl-4 pr-2 py-3 w-full text-left transition duration-200 border-r-3 cursor-pointer
                                ${
                                    activeTab === item.path ||
                                    activeTab === item.path + "/" ||
                                    (item.path !== "/dashboard" &&
                                        item.path !== "/" &&
                                        activeTab.startsWith(item.path))
                                        ? "text-blue-600 font-semibold border-r-3 border-blue-600"
                                        : "text-gray-500 font-medium border-white"
                                }`}
                            >
                                <i
                                    className={`${item.icon}`}
                                    style={{ fontSize: "1.2rem" }}
                                ></i>
                                {maximizeSideBar && (
                                    <span className="ml-3 w-full">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="px-4 pb-3 pt-3 w-full border-t-1 border-gray-600">
                <button
                    className="w-full text-left hover:text-blue-600 font-semibold text-gray-500 transition duration-200 cursor-pointer flex justify-center items-center"
                    onClick={handleClick}
                >
                    <i className="pi pi-sign-out"></i>
                    {maximizeSideBar && (
                        <span className="ml-3 w-full">Logout</span>
                    )}
                </button>
            </div>
        </div>
    );
};
export default SideNavigation;
