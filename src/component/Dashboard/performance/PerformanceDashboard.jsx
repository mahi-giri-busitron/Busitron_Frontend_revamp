import React from "react";
import { Card } from "primereact/card";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PerformanceDashboard = ({ tasks }) => {
    const chartData = {
        labels: ["To Do", "Completed", "Pending", "Overdue", "In Progress"],
        datasets: [
            {
                data: [
                    tasks?.["To Do"],
                    tasks?.["Completed"],
                    tasks?.["Pending"],
                    tasks?.["overdue"],
                    tasks?.["In Progress"],
                ],
                backgroundColor: ["#abf7b1", "#34D399", "#FBBF24", "#EF4444", "#3B82F6"],
                hoverBackgroundColor: [
                    "#39e75f",
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="col-span-2 md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 md:mt-0 md:ml-4 md:hidden">
                <Card className="shadow-md">
                    <h3 className="text-xl font-bold">Total Tasks</h3>
                    <p className="text-2xl font-semibold text-gray-700">
                        {tasks?.totalTasks}
                    </p>
                </Card>
                <Card className="shadow-md">
                    <h3 className="text-xl font-bold">To Do</h3>
                    <p className="text-2xl font-semibold text-green-600">
                        {tasks?.["To Do"]}
                    </p>
                </Card>
                <Card className="shadow-md">
                    <h3 className="text-xl font-bold">Completed</h3>
                    <p className="text-2xl font-semibold text-green-600">
                        {tasks?.Completed}
                    </p>
                </Card>
                <Card className="shadow-md">
                    <h3 className="text-xl font-bold">Pending</h3>
                    <p className="text-2xl font-semibold text-yellow-500">
                        {tasks?.Pending}
                    </p>
                </Card>
                <Card className="shadow-md">
                    <h3 className="text-xl font-bold">Overdue</h3>
                    <p className="text-2xl font-semibold text-red-500">
                        {tasks?.overdue}
                    </p>
                </Card>
            </div>
            <div className="col-span-2 md:col-span-2 lg:col-span-4 bg-white p-4 shadow-md rounded-lg flex flex-col md:flex-row items-center">
                <div className="md:w-2/3 h-full  flex flex-col  items-center justify-center ">
                    <h3 className="text-xl font-bold mb-2">Task Breakdown</h3>
                    <div className="md:p-1 lg:p-1">
                        <Pie data={chartData} options={chartOptions} />
                    </div>
                </div>
                <div className="md:w-1/3 mt-4 md:mt-0 md:ml-4 hidden md:block">
                    <Card className="pl-4 shadow-md">
                        <h3 className="text-xl font-bold">Total Tasks</h3>
                        <p className="text-2xl font-semibold text-gray-700">
                            {tasks?.["totalTasks"]}
                        </p>
                    </Card>

                    <Card className="pl-4 shadow-md mt-4">
                        <h3 className="text-xl font-bold">To Do</h3>
                        <p className="text-2xl font-semibold text-green-600">
                            {tasks?.["To Do"]}
                        </p>
                    </Card>
                    <Card className="pl-4 shadow-md mt-4">
                        <h3 className="text-xl font-bold">Completed</h3>
                        <p className="text-2xl font-semibold text-green-600">
                            {tasks?.["Completed"]}
                        </p>
                    </Card>
                    <Card className="pl-4 shadow-md mt-4">
                        <h3 className="text-xl font-bold">Pending</h3>
                        <p className="text-2xl font-semibold text-yellow-500">
                            {tasks?.["Pending"]}
                        </p>
                    </Card>
                    <Card className="pl-4 shadow-md mt-4">
                        <h3 className="text-xl font-bold">Overdue</h3>
                        <p className="text-2xl font-semibold text-red-500">
                            {tasks?.["overdue"]}
                        </p>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default PerformanceDashboard;
