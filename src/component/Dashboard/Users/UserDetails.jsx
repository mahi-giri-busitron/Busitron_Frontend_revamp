import React from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import profile_pic from "../../../assets/images/dashboard/profilepic.jpg";

const UserDetails = () => {
    const UserDetailsData = [
        { label: "Employee Id", value: "BU2153667" },
        { label: "Full Name", value: "Mahesh vaka" },
        { label: "Designation", value: "FullStack Developer" },

        { label: "Department", value: "Development" },
        { label: "Gender", value: "Male" },
        { label: "Work Anniversery", value: "10 Months from now" },
        { label: "Date of Birth", value: "12-12-12" },
        { label: "Email", value: "mahesh@gmail,com" },
        { label: "Mobile", value: "966403640" },
        { label: "Martial Statuss", value: "single" },
        { label: "Joining Date", value: "20-1-2025" },
    ];
    return (
        <div className="p-6  mx-auto">
            <Card className="shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <img
                        src={profile_pic}
                        className="w-1/2 md:w-1/5 aspect-square lg:max-w-[240px]"
                    />
                    <div className="flex flex-col flex-1">
                        <div className="pb-3 ">
                            <h2 className="text-lg md:text-xl font-semibold flex items-center">
                                Mr Mahesh Balu Giri{" "}
                                <span className="ml-2">🇮🇳</span>
                            </h2>
                            <p className="text-gray-500">
                                <span className="font-medium text-xs md:text-sm">
                                    FULL STACK DEVELOPER
                                </span>{" "}
                                • Development
                                <br />
                                <span className="text-xs md:text-sm">
                                    User Role: App Administrator
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
                {UserDetailsData.map((each) => (
                    <>
                        <div className="grid grid-cols-1  gap-4 text-gray-600">
                            <div className="grid grid-cols-2 lg:grid-cols-4  p-3">
                                <p className="font-semibold  text-base md:text-base">
                                    {each.label}:
                                </p>
                                <p className="text-sm md:text-base">
                                    {each.value}
                                </p>
                            </div>
                        </div>{" "}
                    </>
                ))}
            </Card>
        </div>
    );
};

export default UserDetails;
