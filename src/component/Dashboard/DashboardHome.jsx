import { useState, useEffect } from "react";
import { Button } from "primereact/button";
import DashboardProfile from "./NestedDashboardComponents/DashboardProfile.jsx";
import DashboardTask from "./NestedDashboardComponents/DashboardTask.jsx";
import DashboardProjects from "./NestedDashboardComponents/DashboardProjects.jsx";
import DashboardTaskboard from "./NestedDashboardComponents/DashboardTaskboard.jsx";
import DashboardEmployeeList from "./NestedDashboardComponents/DashboardEmployeeList.jsx";
import { useSelector } from "react-redux";

const DashboardHome = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [time, setTime] = useState(new Date());

    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            <div className="flex flex-wrap items-center justify-between bg-white shadow-md rounded-lg px-6 py-3 m-4">
                <div className="flex items-center">
                    <h2 className="text-lg font-semibold whitespace-nowrap">
                        Welcome {currentUser?.data?.name}
                    </h2>
                </div>
                <div className="flex-1"></div>
                <div className="flex items-center gap-4">
                    <div className="flex flex-col">
                        <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium">
                            {time.toLocaleTimeString("en-US", {
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                                hour12: true,
                            })}
                        </div>
                        <div className="text-[10px] sm:text-xs md:text-sm text-gray-500">
                            {time.toLocaleDateString("en-US", {
                                weekday: "long",
                            })}
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div
                    className="grid gap-4 
                    grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 
                    auto-rows-auto"
                >
                    <div className="md:col-span-2 lg:row-span-2 bg-white rounded-lg shadow-md">
                        <DashboardProfile currentUser={currentUser} />
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <DashboardTask />
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <DashboardProjects />
                    </div>

                    <div className="md:col-span-2 lg:row-span-3 bg-white rounded-lg shadow-md">
                        <DashboardTaskboard />
                    </div>

                    <div className="md:col-span-2 lg:row-span-3 bg-white rounded-lg shadow-md">
                        <DashboardEmployeeList />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
