import React from "react";
const DashboardTaskboard = () => {
    const tasks = [
        {
            id: "123555555555555555",
            name: "Dashboard UI hhhhhhhhhhhhhhhh",
            status: "To do hgghhhhhhhhhhhh",
            dueDate: "21-02-2025",
        },
        {
            id: "124",
            name: "API Development",
            status: "In Progress",
            dueDate: "25-02-2025",
        },
        {
            id: "125",
            name: "Fix Bugs",
            status: "Review",
            dueDate: "28-02-2025",
        },
        {
            id: "126",
            name: "Testing",
            status: "Completed",
            dueDate: "01-03-2025",
        },
        {
            id: "127",
            name: "Deploy Project",
            status: "To do",
            dueDate: "05-03-2025",
        },
        {
            id: "128",
            name: "Optimize Database ",
            status: "In Progress",
            dueDate: "10-03-2025",
        },
        {
            id: "129",
            name: "UI Enhancements and code spliting",
            status: "To do",
            dueDate: "12-03-2025",
        },
        {
            id: "130",
            name: "Documentation",
            status: "To do",
            dueDate: "15-03-2025",
        },
        {
            id: "131",
            name: "Code Review",
            status: "Review",
            dueDate: "18-03-2025",
        },
        {
            id: "132",
            name: "Setup CI/CD",
            status: "Completed",
            dueDate: "20-03-2025",
        },
    ];
    return (
        <div className="pt-4 px-4">
            <div className="border-b-2 border-gray-300 pb-2">
                <h2 className="font-bold text-xl">My Tasks</h2>
                <div className="flex justify-between font-semibold text-lg mt-3 px-3">
                    <p className="w-20 pr-4">Task id</p>
                    <p className="flex-1 min-w-[150px] pr-4">Task</p>
                    <p className="w-32 pr-4">Status</p>
                    <p className="w-32">Due Date</p>
                </div>
            </div>
            {tasks.length > 0 ? (
                <div className="overflow-y-auto max-h-80  border-gray-200 mt-2 rounded-md">
                    {tasks.map((task, index) => (
                        <div
                            key={index}
                            className="flex justify-between items-center text-[0.9rem] text-gray-600 px-3 py-4 border-b-1 border-gray-200"
                        >
                            <p className="w-20 truncate pr-4">{task.id}</p>
                            <p className="flex-1 min-w-[150px] truncate pr-4">
                                {task.name}
                            </p>
                            <p className="w-32 truncate pr-4">{task.status}</p>
                            <p className="w-32 truncate">{task.dueDate}</p>
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
