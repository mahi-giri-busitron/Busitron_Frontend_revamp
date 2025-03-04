import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import UserTasksDetailsTable from "./UserTasksDetailsTable.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const UserPerformanceDetails = () => {
    const { empid } = useParams();
    const [data, setData] = useState([]);

    async function getParticularUserTask() {
        try {
            const apiResponse = await axios.get(
                `/api/v1/performanceTracking/getParticularUserTask/${empid}`
            );

            setData(apiResponse.data.data);
        } catch (err) {
            console.error(err.message);
        }
    }
    useEffect(() => {
        getParticularUserTask();
    }, []);
    const chartData = {
        labels: ["Completed", "Pending", "Overdue", "In Progress"],
        datasets: [
            {
                data: [
                    data?.completedTasks,
                    data?.pendingTasks,
                    data?.dueTasks,
                    data?.["In Progress"],
                ],
                backgroundColor: ["#34D399", "#FBBF24", "#EF4444", "#3B82F6"],
                hoverBackgroundColor: [
                    "#10B981",
                    "#F59E0B",
                    "#DC2626",
                    "#2563EB",
                ],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
        },
    };
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                <div className="col-span-2 md:col-span-2 lg:col-span-4 bg-white p-4 shadow-md rounded-lg flex flex-col md:flex-row items-center">
                    <div className="md:w-1/3 mt-4 md:mt-0 md:ml-4 hidden md:block">
                        <Card className="pl-4 shadow-md">
                            <h3 className="text-xl font-bold">Total Tasks</h3>
                            <p className="text-2xl font-semibold text-gray-700">
                                {data?.totalTasks}
                            </p>
                        </Card>
                        <Card className="pl-4 shadow-md mt-4">
                            <h3 className="text-xl font-bold">Completed</h3>
                            <p className="text-2xl font-semibold text-green-600">
                                {data?.completedTasks}
                            </p>
                        </Card>
                        <Card className="pl-4 shadow-md mt-4">
                            <h3 className="text-xl font-bold">Pending</h3>
                            <p className="text-2xl font-semibold text-yellow-500">
                                {data?.pendingTasks}
                            </p>
                        </Card>
                        <Card className="pl-4 shadow-md mt-4">
                            <h3 className="text-xl font-bold">Overdue</h3>
                            <p className="text-2xl font-semibold text-red-500">
                                {data?.dueTasks}
                            </p>
                        </Card>
                    </div>
                    <div className="md:w-2/3 h-full p-4 flex flex-col  items-center justify-center">
                        <h3 className="text-xl font-bold mb-2">
                            Task Breakdown
                        </h3>
                        <div className="md:p-15 lg:p-20">
                            <Pie data={chartData} options={chartOptions} />
                        </div>
                    </div>
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 md:mt-0 md:ml-4 md:hidden">
                    <Card className="shadow-md ">
                        <h3 className="text-xl font-bold">Total Tasks</h3>
                        <p className="text-2xl font-semibold text-gray-700">
                            {data?.totalTasks}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">Completed</h3>
                        <p className="text-2xl font-semibold text-green-600">
                            {data?.completedTasks}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">Pending</h3>
                        <p className="text-2xl font-semibold text-yellow-500">
                            {data?.pendingTasks}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">Overdue</h3>
                        <p className="text-2xl font-semibold text-red-500">
                            {data?.dueTasks}
                        </p>
                    </Card>
                </div>
            </div>
            <UserTasksDetailsTable tasks={data?.getTasks} />
        </div>
    );
};

export default UserPerformanceDetails;