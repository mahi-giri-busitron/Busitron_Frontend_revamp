import React, { useEffect, useState } from "react";
import UserPerformanceTable from "./Performancetable.jsx";
import PerformanceDashboard from "./PerformanceDashboard.jsx";
import axios from "axios";

const PerformanceTracking = () => {
    const [tasks, setTasks] = useState();

    async function getTasks() {
        try {
            const apiResponse = await axios.get(
                "/api/v1/performanceTracking/getCombinedStatistics"
            );

            setTasks(apiResponse.data.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getTasks();
    }, []);
    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <PerformanceDashboard tasks={tasks?.taskStatistics} />
            <UserPerformanceTable Users={tasks?.userStatistics?.users} />
        </div>
    );
};

export default PerformanceTracking;
