import React, { useEffect, useState } from "react";
import { ProgressBar } from "primereact/progressbar";
import { Chart } from "primereact/chart";
import { useSelector, useDispatch } from "react-redux";
import { getParticularproject } from "../../../redux/projectslice";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { ProgressSpinner } from "primereact/progressspinner";

const Overview = () => {
    const [tasks, settasks] = useState([]);
    const [count, setcount] = useState(null);
    const [loading, setloading] = useState(false);

    const progress =
        tasks.length > 0 ? ((count / tasks.length) * 100).toFixed(2) : 0;

    const colors = {
        "To Do": "#93c5fd",
        Review: "#c4b5fd",
        Pending: "#fde047",
        "In Progress": "#fb923c",
        Completed: "#86efac",
        Close: "#d1d5db",
    };

    const taskStatusCount = tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;

        return acc;
    }, {});

    const pieData = {
        labels: tasks.map((i) => i.title),
        datasets: [
            {
                data: Object.values(taskStatusCount),
                backgroundColor: Object.keys(taskStatusCount).map(
                    (status) => colors[status] || "Gray"
                ),
                hoverBackgroundColor: Object.keys(taskStatusCount).map(
                    (status) => colors[status] || "Gray"
                ),
            },
        ],
    };

    const dispatch = useDispatch();
    const { particular } = useSelector((state) => state.project);
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            dispatch(getParticularproject(id));
        }
    }, [dispatch, id]);

    const fetchAllTasks = async () => {
        try {
            const response = await axios.get(`/api/v1/task/gettaskbyid/${id}`);

            if (response.data && response.data.data) {
                settasks(response.data.data.tasks || []);
                setcount(response.data.data.completedCount || 0);
            } else {
                settasks([]);
                setcount(0);
            }
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchAllTasks();
    }, []);

    return (
        <div className="py-4 sm:p-6 ">
            <div className="min-h-[30vh] grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <p className="text-lg font-semibold">Project Progress</p>
                    <div className="mt-10">
                        <ProgressBar value={progress} showValue />
                    </div>

                    {loading && (
                        <ProgressSpinner
                            style={{
                                width: "50px",
                                height: "50px",
                            }}
                            strokeWidth="8"
                            fill="var(--surface-ground)"
                            animationDuration=".5s"
                        />
                    )}

                    <div className="flex justify-between text-gray-600 mt-10 ">
                        <div>
                            <p className="text-lg font-semibold">Start Date</p>
                            <p className="text-lg font-bold">
                                {moment(
                                    particular?.startDate || "loading"
                                ).format("DD-MM-YYYY")}
                            </p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold">Deadline</p>
                            <p className="text-lg font-bold">
                                {moment(
                                    particular?.endDate || "loading..."
                                ).format("DD-MM-YYYY")}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-lg">
                    <h1 className="text-lg font-semibold mb-4">Tasks</h1>
                    <div className="flex justify-center p-4">
                        <Chart
                            type="pie"
                            data={pieData}
                            style={{ width: "200px", height: "200px" }}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white mt-6 p-4 sm:p-6 rounded-2xl">
                <p className="text-lg font-semibold mb-2">Project Details</p>

                <p>{particular?.projectSummary || "Loading..."}</p>
            </div>
        </div>
    );
};

export default Overview;
