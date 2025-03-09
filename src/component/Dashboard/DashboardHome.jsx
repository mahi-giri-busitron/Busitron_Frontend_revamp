import { useState, useEffect } from "react";
import DashboardProfile from "./NestedDashboardComponents/DashboardProfile.jsx";
import DashboardTask from "./NestedDashboardComponents/DashboardTask.jsx";
import DashboardProjects from "./NestedDashboardComponents/DashboardProjects.jsx";
import DashboardTaskboard from "./NestedDashboardComponents/DashboardTaskboard.jsx";
import DashboardEmployeeList from "./NestedDashboardComponents/DashboardEmployeeList.jsx";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { getALlEstimates } from "../../redux/estimateSlice.js";
import NewDashboardFinantialEstimate from "./NestedDashboardComponents/NewDashboardFinantialEstimate.jsx";

const DashboardHome = () => {
    const [time, setTime] = useState(new Date());
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    const [tasks, setTasks] = useState([]);

    const [taskCount, setTaskCount] = useState(0);
    const [ticketCount, setTicketCount] = useState(0);
    const [projects, setProjects] = useState(0);
    const [pendingTasks, setPendingTasks] = useState(0);
    const [overdueTasks, setOverdueTasks] = useState(0);
    const [projectPending, setProjectPending] = useState(0);
    const [projectOverdue, setProjectOverdue] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        dispatch(getALlEstimates());
    }, [dispatch]);

    async function getUserTasks() {
        try {
            const apiResponse = await axios.get("/api/v1/users/getUserTasks");
            setTasks(apiResponse?.data?.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    const getUserDetails = async () => {
        const response = await axios.get(
            `/api/v1/userdashboard/${currentUser.data._id}`
        );

        setTaskCount(response.data.data.taskCount);
        setTicketCount(response.data.data.ticketCount);
        setProjects(response.data.data.projectCount);
        setPendingTasks(response.data.data.pendingTasks);
        setOverdueTasks(response.data.data.overdueTasks);
        setProjectPending(response.data.data.projectPending);
        setProjectOverdue(response.data.data.projectOverdue);
    };

    useEffect(() => {
        getUserTasks();
        getUserDetails();
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
                        <DashboardProfile
                            currentUser={currentUser}
                            taskCount={taskCount}
                            projects={projects}
                        />
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <DashboardTask
                            Pending={pendingTasks}
                            overDue={overdueTasks}
                        />
                    </div>

                    <div className="bg-white rounded-lg p-4 shadow-md">
                        <DashboardProjects
                            projectPending={projectPending}
                            projectOverdue={projectOverdue}
                        />
                    </div>

                    <div className="md:col-span-2 lg:row-span-3 rounded-lg shadow-md">
                        <DashboardTaskboard tasks={tasks?.getTasks} />
                    </div>

                    <div className="md:col-span-2 lg:row-span-3 bg-white rounded-lg shadow-md">
                        <DashboardEmployeeList />
                    </div>
                    {(currentUser?.data?.role === "Admin" ||
                        currentUser?.data?.role === "SuperAdmin") && (
                        <div className="md:col-span-2 lg:row-span-3 bg-white rounded-lg shadow-md">
                            <NewDashboardFinantialEstimate />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
