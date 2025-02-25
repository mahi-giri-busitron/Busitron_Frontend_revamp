import React, { useRef, useState } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import { InputSwitch } from "primereact/inputswitch";
import { useNavigate } from "react-router-dom";
import InviteMemberModal from "./InviteMember";
const SideTopNavigation = (props) => {
    const { ProfileData, maximizeSideBar, setMaximizeSideBar } = props;
    const navigate = useNavigate();
    const op = useRef(null);
    const [checked, setChecked] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleOnLogout = () => {
        navigate("/");
    };
    const handleOnDarkMode = (e) => {
        setChecked(e.value);
    };
    const handleOnEditProfile = () => {
        navigate("/dashboard/profile");
    };
    const togglemaximizeSideBar = () => {
        setMaximizeSideBar((prev) => !prev);
    };
    const handleOnInviteMember = () => {
        setVisible(true);
    };
    return (
        <div className=" flex px-5 py-3   items-center max-h-[85px]  h-[85px]    text-gray-900  border-b-2 border-gray-400 ">
            <div className="  w-full  h-[100px] flex justify-between items-center">
                {maximizeSideBar && (
                    <div>
                        <h2 className="text-xl font-bold ">
                            Busitron
                            <i
                                className="pi pi-angle-down  hover:text-blue-600 cursor-pointer ml-2"
                                onClick={(e) => op.current.toggle(e)}
                            ></i>
                        </h2>
                        <p className="overflow-hidden text-ellipsis ">
                            Mahesh vaka
                        </p>
                    </div>
                )}
                <div className="hidden lg:inline">
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
                    <div className="w-full flex gap-2  p-2 px-4    hover:bg-blue-400 hover:text-blue-900 text-gray-500 cursor-pointer">
                        <button
                            className={`w-full text-left font-semibold   transition duration-200 cursor-pointer`}
                            onClick={handleOnInviteMember}
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
            <InviteMemberModal visible={visible} setVisible={setVisible} />
        </div>
    );
};
export default SideTopNavigation;
