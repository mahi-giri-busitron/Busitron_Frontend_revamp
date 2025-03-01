import React from "react";
import { ProgressBar } from "primereact/progressbar";
import { Chart } from "primereact/chart";

const Overview = () => {
    const progress = 44;

    const pieData = {
        labels: ["Task 1", "Task 2", "Task 3"],
        datasets: [
            {
                data: [40, 35, 25],
                backgroundColor: ["Green", "Yellow", "Blue"],
                hoverBackgroundColor: ["Green", "Yellow", "Blue"],
            },
        ],
    };

    return (
        <div className="py-4 sm:p-6 ">
            <div className="min-h-[30vh] grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Project Progress */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <p className="text-lg font-semibold">Project Progress</p>
                    <div className="mt-10">
                        {/* Show progress bar at 44% with a label */}
                        <ProgressBar value={progress} showValue />
                    </div>

                    <div className="flex justify-between text-gray-600 mt-10 ">
                        <div>
                            <p className="text-lg font-semibold">Start Date</p>
                            <p className="text-lg font-bold">10-02-2025</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Deadline</p>
                            <p className="text-lg font-bold">10-02-2025</p>
                        </div>
                    </div>
                </div>

                {/* Tasks Pie Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h1 className="text-lg font-semibold mb-4">Tasks</h1>
                    <div className="flex justify-center">
                        <Chart
                            type="pie"
                            data={pieData}
                            style={{ width: "200px", height: "200px" }}
                        />
                    </div>
                </div>
            </div>

            {/* Project Details Section */}
            <div className="bg-white mt-6 p-4 sm:p-6 rounded-2xl">
                <p className="text-lg font-semibold mb-2">Project Details</p>

                <div className="mb-4">
                    <p className="font-semibold">Dashboard</p>
                    <p className="text-sm">
                        The dashboard is designed for project managers, team
                        members, and stakeholders who need a quick, visual
                        summary of the project's health. It consolidates key
                        metrics—such as progress, deadlines, and task
                        distribution—into a single, easy-to-read interface.
                    </p>
                </div>

                <div className="mb-4">
                    <p className="font-semibold">Overview</p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Id, quo.
                    </p>
                    <p className="text-sm">
                        The dashboard is designed for project managers, team
                        members, and stakeholders who need a quick, visual
                        summary of the project's health. It consolidates key
                        metrics—such as progress, deadlines, and task
                        distribution—into a single, easy-to-read interface.
                    </p>
                </div>

                <div className="mb-4">
                    <p className="font-semibold">Additional Info</p>
                    <p>Lorem ipsum dolor sit amet.</p>
                    <p className="text-sm">
                        The dashboard is designed for project managers, team
                        members, and stakeholders who need a quick, visual
                        summary of the project's health. It consolidates key
                        metrics—such as progress, deadlines, and task
                        distribution—into a single, easy-to-read interface.
                    </p>
                </div>

                <div>
                    <p className="font-semibold">Conclusion</p>
                    <p className="text-sm">
                        The dashboard is designed for project managers, team
                        members, and stakeholders who need a quick, visual
                        summary of the project's health. It consolidates key
                        metrics—such as progress, deadlines, and task
                        distribution—into a single, easy-to-read interface.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Overview;
