import React, { useEffect } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import profile_pic from "../../../assets/images/dashboard/profilepic.jpg";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchSpecificUser } from "../../../redux/userManagementSlice";
import moment from "moment";

const UserDetails = () => {
    const { empid } = useParams();
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state) => state.userManagement);

    useEffect(() => {
        dispatch(fetchSpecificUser(empid));
    }, [dispatch, empid]);

    return (
        <div className="p-6  mx-auto">
            <Card className="shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <img
                        src={userInfo?.avatar}
                        className="w-1/2 md:w-1/5 aspect-square lg:max-w-[240px]"
                    />
                    <div className="flex flex-col flex-1">
                        <div className="pb-3 ">
                            <h2 className="text-lg md:text-xl font-semibold flex items-center">
                                {userInfo?.name}
                            </h2>
                            <p className="text-gray-500">
                                <span className="font-medium text-xs md:text-sm">
                                    {userInfo?.role}
                                </span>{" "}
                                • Development
                                <br />
                                <span className="text-xs md:text-sm">
                                    User Role: {userInfo?.designation}
                                </span>
                            </p>
                            <p className="text-gray-400 text-xs md:text-sm mt-1 mb-3">
                                Last login at 24-02-2025 10:25 am
                            </p>
                            <hr></hr>
                        </div>
                        <div className="flex  flex-1 w-full  h-full  justify-around text-center mt-4">
                            <div className="shadow-lg p-4 flex-1 gap-3  flex-wrap flex flex-col justify-between">
                                <p className="text-gray-500 ">Open Tasks</p>
                                <p className=" font-bold text-lg sm:text-lg md:text-xl">
                                    0
                                </p>
                            </div>
                            <div className="shadow-lg p-4 flex-1 md:w-50 flex flex-col justify-between">
                                <p className="text-gray-500">Projects</p>
                                <p className="text-lg sm:text-lg md:text-xl font-bold">
                                    2
                                </p>
                            </div>
                            <div className="shadow-lg p-4 flex-1 flex flex-col justify-between">
                                <p className="text-gray-500">Hours Logged</p>
                                <p className="text-lg sm:text-lg md:text-xl font-bold">
                                    0
                                </p>
                            </div>
                            <div className="shadow-lg p-4 flex-1 flex flex-col justify-between">
                                <p className="text-gray-500">Tickets</p>
                                <p className="text-lg  sm:text-lg md:text-xl font-bold">
                                    0
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Divider />
            <Card className="shadow-lg mt-4">
                <h3 className="mb-4 font-bold text-xl md:text-2xl">
                    Profile Info
                </h3>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Employee Id:
                        </p>
                        <p className="text-sm md:text-base">
                            {userInfo?.employeeId}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Full Name:
                        </p>
                        <p className="text-sm md:text-base">{userInfo?.name}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Designation:
                        </p>
                        <p className="text-sm md:text-base">
                            {userInfo?.designation}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Role:
                        </p>
                        <p className="text-sm md:text-base">{userInfo?.role}</p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Department:
                        </p>
                        <p className="text-sm md:text-base">value</p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Gender:
                        </p>
                        <p className="text-sm md:text-base">
                            {userInfo?.gender}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Date of Birth:
                        </p>
                        <p className="text-sm md:text-base">
                            {moment(userInfo?.dateOfBirth).format("D-M-Y")}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Email:
                        </p>
                        <p className="text-sm md:text-base">
                            {userInfo?.email}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Mobile:
                        </p>
                        <p className="text-sm md:text-base">
                            {userInfo?.phoneNumber}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Martial Status:
                        </p>
                        <p className="text-sm md:text-base">
                            {userInfo?.maritalStatus}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                        <p className="font-semibold  text-base md:text-base">
                            Joining Date:
                        </p>
                        <p className="text-sm md:text-base">
                            {moment(userInfo?.createdAt).format("D-M-Y")}
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserDetails;
