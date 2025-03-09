import axios from "axios";
import React, { useEffect, useState } from "react";
function DashboardProfile({ currentUser, taskCount, projects }) {
    return (
        <div className="p-0">
            <div className="bg-white flex flex-col rounded-lg shadow-md">
                <div className="flex gap-8 w-full py-10 pl-12">
                    <img
                        className="w-[90px] h-[90px] rounded-sm"
                        src={currentUser?.data?.avatar}
                    />
                    <div>
                        <h2 className="font-bold text-lg">
                            {currentUser?.data?.name}
                        </h2>
                        <p>{currentUser?.data?.designation}</p>
                        <p className="text-[0.9rem] text-gray-400">
                            Employee ID: {currentUser?.data?.employeeId}
                        </p>
                    </div>
                </div>
                <div className="flex justify-between px-11 py-6 border-t-3 border-gray-200 w-full">
                    <div>
                        <p className="text-gray-600">Open Tasks</p>
                        <p className="font-bold text-lg">{taskCount}</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Projects</p>
                        <p className="font-bold text-lg">{projects}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardProfile;
