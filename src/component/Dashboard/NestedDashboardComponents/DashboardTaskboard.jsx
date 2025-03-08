import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const DashboardTaskboard = ({ tasks }) => {
    const navigate = useNavigate();
    return (
        <div className="pt-4 px-4 bg-white">
            <div className="border-b-2 border-gray-300 pb-2">
                <h2 className="font-bold text-xl">My Tasks</h2>
                <div className="flex justify-between font-semibold text-lg mt-3 px-3">
                    <p className="w-20 pr-4">Task id</p>
                    <p className="flex-1 min-w-[150px] pr-4">Task</p>
                    <p className="w-32 pr-4">Status</p>
                    <p className="w-32">Due Date</p>
                </div>
            </div>
            {tasks && tasks.length > 0 ? (
                <div className="overflow-y-auto max-h-80  border-gray-200 mt-2 rounded-md">
                    {tasks.map((task, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center text-[0.9rem] text-gray-600 px-3 py-4 border-b-1 border-gray-200"
                        >
                            <span
                                className="cursor-pointer"
                                onClick={() =>
                                    navigate(`/dashboard/task/${task._id}`, {
                                        state: task,
                                    })
                                }
                            >
                                <p className="w-20 truncate pr-4">
                                    {task?.taskID}
                                </p>
                            </span>
                            <p className="flex-1 min-w-[150px] truncate pr-4">
                                {task?.title}
                            </p>
                            <p className="w-32 truncate pr-4">{task.status}</p>
                            <p className="w-32 truncate">
                                {moment(task?.dueDate).format("DD-MM-YYYY")}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex justify-center items-center h-40 text-gray-500">
                    - No Record Found -
                </div>
            )}
        </div>
    );
};

export default DashboardTaskboard;
