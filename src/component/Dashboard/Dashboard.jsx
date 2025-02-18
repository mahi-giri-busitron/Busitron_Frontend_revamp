import React from "react";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className=" bg-blue-100 flex h-screen">
            <div className="w-1/5 border bg-amber-100">Sidebar</div>
            <div className="border w-full">
                <div className="border  py-7 bg-amber-200">Dashboard</div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
