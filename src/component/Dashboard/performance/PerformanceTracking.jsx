import React from "react";
import UserPerformanceTable from "./Performancetable.jsx";
import PerformanceDashboard from "./PerformanceDashboard.jsx";

const PerformanceTracking = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <PerformanceDashboard />
            <UserPerformanceTable />
        </div>
    );
};

export default PerformanceTracking;
