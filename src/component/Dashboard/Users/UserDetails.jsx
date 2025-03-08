import React, { useEffect, useState } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import profile_pic from "../../../assets/images/dashboard/profilepic.jpg";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import {
    deactivateUser,
    fetchSpecificUser,
} from "../../../redux/userManagementSlice";
import moment from "moment";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import UserDetailsSkeleton from "./UserManagementSkeleton";

const UserDetails = () => {
    const { empid } = useParams();
    const dispatch = useDispatch();
    const { userInfo, isLoading, isRequestApproved, isRequestRejected } =
        useSelector((state) => state.userManagement);
    const [editable, setEditable] = useState(false);
    const [selectedRole, setSelectedRole] = useState(userInfo?.role || "");
    const [designation, setDesignation] = useState(userInfo?.designation || "");
    const roles = [
        { name: "SuperAdmin", code: "NY" },
        { name: "Admin", code: "RM" },
        { name: "Employee", code: "LDN" },
    ];
    const handleOnCancel = () => {
        setEditable(false);
        setSelectedRole(userInfo?.role || "");
        setDesignation(userInfo?.designation || "");
    };

    const handleUpdate = async () => {
        await dispatch(
            deactivateUser({ id: empid, role: selectedRole, designation })
        );
        await dispatch(fetchSpecificUser(empid));
        setEditable(false);
    };

    useEffect(() => {
        dispatch(fetchSpecificUser(empid));
    }, [dispatch, empid]);

    useEffect(() => {
        if (userInfo) {
            setSelectedRole(userInfo.role || "");
            setDesignation(userInfo.designation || "");
        }
    }, [userInfo, editable]);



    const [taskCount, setTaskCount] = useState(0);
    const [ticketCount, setTicketCount] = useState(0);
    const [projects, setProjects] = useState(0);
    
    useEffect(() => {
        dispatch(fetchSpecificUser(empid));
    
        axios.get(`http://localhost:5421/api/v1/userdashboard/${empid}`)
            .then((response) => {
                const data = response.data; 
                if (data.success) {
                    setTaskCount(data.data.taskCount);
                    setTicketCount(data.data.ticketCount);
                    setProjects(data.data.projectCount);
                }
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, [dispatch, empid]);

    const getUserDetailsUi = () => {
        switch (true) {
            case isLoading:
                return <UserDetailsSkeleton />;
            case isRequestApproved:
                return (
                    <div className="p-6  mx-auto">
                        <Card className="shadow-lg">
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                                <img
                                    src={userInfo?.avatar || profile_pic}
                                    alt="Profile"
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
                                                User Role:{" "}
                                                {userInfo?.designation}
                                            </span>
                                        </p>
                                        <p className="text-gray-400 text-xs md:text-sm mt-1 mb-3">
                                            Last login at 24-02-2025 10:25 am
                                        </p>
                                        <hr></hr>
                                    </div>
                                    <div className="flex flex-1 w-full h-full justify-around text-center mt-4">
                                        <div className="shadow-lg p-4 flex-1 gap-3 flex-wrap flex flex-col justify-between">
                                            <p className="text-gray-500">Open Tasks</p>
                                            <p className="font-bold text-lg sm:text-lg md:text-xl">{taskCount}</p>
                                        </div>
                                        <div className="shadow-lg p-4 flex-1 md:w-50 flex flex-col justify-between">
                                            <p className="text-gray-500">Projects</p>
                                            <p className="text-lg sm:text-lg md:text-xl font-bold">
                                                {projects ?? 0}
                                            </p>
                                        </div>
                                      
                                        <div className="shadow-lg p-4 flex-1 flex flex-col justify-between">
                                            <p className="text-gray-500">Tickets</p>
                                            <p className="text-lg sm:text-lg md:text-xl font-bold">
                                                {ticketCount ?? 0}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                        <Divider />
                        <Card className="shadow-lg mt-4">
                            <div className="flex flex-wrap justify-between">
                                <h3 className="mb-4 font-bold text-xl md:text-2xl">
                                    Profile Info
                                </h3>
                                {!editable ? (
                                    <Button
                                        label="Edit"
                                        className="h-10"
                                        icon="pi pi-pencil"
                                        size="small"
                                        onClick={() => setEditable(true)}
                                    />
                                ) : (
                                    <div>
                                        {" "}
                                        <Button
                                            icon="pi pi-save"
                                            label="Save"
                                            className="h-10"
                                            size="small"
                                            onClick={handleUpdate}
                                        />{" "}
                                        <Button
                                            icon="pi pi-eraser"
                                            label="Cancel"
                                            severity="danger"
                                            className="h-10"
                                            size="small"
                                            onClick={handleOnCancel}
                                        />{" "}
                                    </div>
                                )}
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Employee Id:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.employeeId}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.employeeId}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Full Name:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.name}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.name}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                                    <p className="font-semibold  text-base md:text-base">
                                        Designation:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.designation}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={designation}
                                            className="p-inputtext-sm h-10"
                                            onChange={(e) =>
                                                setDesignation(e.target.value)
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Role:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.role}
                                        </p>
                                    ) : (
                                        <Dropdown
                                            value={selectedRole}
                                            onChange={(e) =>
                                                setSelectedRole(
                                                    e.target.value.name
                                                )
                                            }
                                            options={roles}
                                            optionLabel="name"
                                            editable
                                            placeholder="Select a Role"
                                            className="w-full md:w-14rem h-10"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Company Name:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.companyName}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.companyName}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Gender:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.gender}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.gender}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Date of Birth:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {moment(
                                                userInfo?.dateOfBirth
                                            ).format("D-M-Y")}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.dateOfBirth}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Email:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.email}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.email}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Mobile:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.phoneNumber}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.phoneNumber}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Martial Status:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {userInfo?.maritalStatus}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={userInfo?.maritalStatus}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="grid grid-cols-1  gap-4 text-gray-600">
                                <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center">
                                    <p className="font-semibold  text-base md:text-base">
                                        Joining Date:
                                    </p>
                                    {!editable ? (
                                        <p className="text-sm md:text-base">
                                            {moment(userInfo?.createdAt).format(
                                                "D-M-Y"
                                            )}
                                        </p>
                                    ) : (
                                        <InputText
                                            value={moment(
                                                userInfo?.createdAt
                                            ).format("D-M-Y")}
                                            className="p-inputtext-sm h-10"
                                            disabled
                                        />
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>
                );
            case isRequestRejected:
                return (
                    <div className="p-6  mx-auto h-1">
                        <h1>Rejected</h1>
                    </div>
                );
            default:
                return <UserDetailsSkeleton />;
        }
    };

    return <>{getUserDetailsUi()}</>;
};

export default UserDetails;
