import React, { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputSwitch } from "primereact/inputswitch";
import { useNavigate } from "react-router-dom";
const SideTopNavigation = (props) => {
    const { ProfileData, maximizeSideBar, setMaximizeSideBar } = props;
    const navigate = useNavigate();
    const op = useRef(null);
    const [checked, setChecked] = useState(false);

    const handleOnLogout = () => {
        navigate("/");
    };
    const handleOnDarkMode = (e) => {
        console.log("darkmode");
        setChecked(e.value);
    };
    const handleOnEditProfile = () => {
        navigate("/dashboard/profile");
    };
    const togglemaximizeSideBar = () => {
        setMaximizeSideBar((prev) => !prev);
    };
    return (
        <div className=" flex px-5 py-3   items-center max-h-[85px]  h-[85px]    text-gray-900  border-b-2 border-gray-400 ">
            <div className="  w-full  h-[100px] flex justify-between items-center">
                {maximizeSideBar && (
                    <div>
                        {/* <div className="px-4 py-4 flex  align-middle"> */}
                        <h2 className="text-xl font-bold ">
                            Busitron
                            <i
                                className="pi pi-angle-down  hover:text-blue-600 cursor-pointer ml-2"
                                onClick={(e) => op.current.toggle(e)}
                            ></i>
                        </h2>

                        {/* </div> */}
                        <p className="overflow-hidden text-ellipsis ">
                            Mahesh vaka
                        </p>
                    </div>
                )}
                <div className="hidden md:inline">
                    <i
                        className={`  pi ${
                            maximizeSideBar
                                ? "pi-angle-double-left"
                                : "pi-angle-double-right"
                        } text-gray-600 hover:text-blue-600 cursor-pointer `}
                        style={{ fontSize: "1.5rem" }}
                        onClick={() => togglemaximizeSideBar()}
                    ></i>
                </div>
            </div>
            <OverlayPanel ref={op} showCloseIcon>
                <div className="w-[300px]">
                    <div
                        className="flex gap-2  items-center  justify-between p-4 hover:bg-blue-400 w-full "
                        onClick={handleOnEditProfile}
                    >
                        <div className="flex gap-3 items-center">
                            <img
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                className="w-[40px] h-[40px]"
                            />
                            <div>
                                <h2 className="font-bold text-ellipsis">
                                    {ProfileData.name}
                                </h2>
                                <p className="text-ellipsis">
                                    {ProfileData.designation}
                                </p>
                            </div>
                        </div>
                        <i
                            className="pi pi-pen-to-square  hover:text-blue-600 cursor-pointer"
                            style={{ fontSize: "20px" }}
                        ></i>
                    </div>
                    <div
                        className="w-full flex gap-2  p-2 px-4    hover:bg-blue-400 hover:text-blue-900 text-gray-500 cursor-pointer"
                        onClick={() => navigate("/dashboard/users")}
                    >
                        <button
                            className={`w-full text-left font-semibold   transition duration-200 cursor-pointer`}
                        >
                            Invite Member
                        </button>
                        <i
                            className={`ml-3 pi pi-user-plus`}
                            style={{ fontSize: "20px" }}
                        ></i>
                    </div>
                    <div
                        className=" w-full flex gap-2  p-2  px-4  text-gray-500 hover:text-blue-900  hover:bg-blue-400  cursor-pointer "
                        onClick={handleOnLogout}
                    >
                        <button
                            className={`w-full text-left   font-semibold transition duration-200 cursor-pointer`}
                        >
                            Logout
                        </button>
                        <i
                            className={`ml-3 pi pi-sign-out`}
                            style={{ fontSize: "20px" }}
                        ></i>
                    </div>
                </div>
            </OverlayPanel>
        </div>
    );
};
export default SideTopNavigation;
