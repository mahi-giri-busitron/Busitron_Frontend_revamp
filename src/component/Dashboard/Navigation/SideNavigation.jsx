import { GetNavigationData } from "./NavigationConst.js";
import { Link, useNavigate } from "react-router-dom";
import SideTopNavigation from "./SideTopNavigation.jsx";
import { useDispatch } from "react-redux";
import { signOutUser } from "../../../redux/userSlice.js";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const SideNavigation = ({
    activeTab = "/dashboard",
    setActiveTab,
    maximizeSideBar,
    setMaximizeSideBar,
}) => {
    const navData = GetNavigationData();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { currentUser } = useSelector((state) => state.user);

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

                <nav
                    className=" text-cyan-50 overflow-y-auto"
                    style={{
                        maxHeight: "calc(100vh - 140px)",
                        scrollbarWidth: "thin",
                    }}
                >
                    {navData.map((each, index) => (
                        <Link
                            key={index}
                            to={each.path}
                            className="block  "
                            onClick={() => setActiveTab(each.path)}
                        >
                            <button
                                className={` flex  justify-center  items-center pl-4  pr-2  py-3 w-full text-left hover:text-blue-600 transition duration-200 border-r-3 cursor-pointer ${
                                    activeTab === each.path ||
                                    activeTab === each.path + "/" ||
                                    (each.path !== "/dashboard" &&
                                        each.path !== "/" &&
                                        activeTab.startsWith(each.path))
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
                                        {each.label}
                                    </span>
                                )}
                            </button>
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="px-4  pb-3  pt-3  w-full border-t-1 border-gray-600">
                <Link to="/" className="w-full">
                    <button
                        className={`  w-full text-left hover:text-blue-600 font-semibold text-gray-500 transition duration-200 cursor-pointer flex  justify-center items-center `}
                    >
                        <i className={` pi pi-sign-out`}></i>

                        {maximizeSideBar && (
                            <span className="ml-3 w-full" onClick={handleClick}>
                                Logout
                            </span>
                        )}
                    </button>
                </Link>
            </div>
        </div>
    );
};
export default SideNavigation;
