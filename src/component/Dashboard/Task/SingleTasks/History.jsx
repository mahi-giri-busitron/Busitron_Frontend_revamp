import axios from "axios";
import React, { useEffect, useState } from "react";

const HistorySection = ({ showHistory, taskData }) => {
    const [history, setHistory] = useState([]);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await axios.get(
                    `/api/v1/history/getHistory/${taskData._id}`
                );
                setHistory(response.data.data);
            } catch (error) {
                console.error(
                    "Error fetching history:",
                    error.response?.data?.message || error.message
                );
            }
        };

        if (taskData._id) {
            fetchHistory();
        }
    }, [taskData._id]);

    return (
        showHistory &&
        history.length > 0 && (
            <div className="mt-4 h-96 overflow-auto">
                <h3 className="text-gray-600 text-lg font-semibold">History</h3>
                <div className="mt-2">
                    {history.map((entry, index) => (
                        <div
                            key={entry._id || index}
                            className="p-3 rounded-md mb-2 bg-gray-50 border-2 shadow-lg"
                        >
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">
                                    {entry.assignedBy?.name}
                                </span>{" "}
                                {entry.action} -{" "}
                                {new Date(entry.createdAt).toLocaleString()}
                            </p>
                            <p className="text-gray-600">{entry.message}</p>
                            {entry.changes.length > 0 && (
                                <div className="mt-2">
                                    <div className="grid grid-cols-3 bg-gray-100 p-2 font-semibold text-sm">
                                        <div>Field</div>
                                        <div>Original Value</div>
                                        <div>New Value</div>
                                    </div>
                                    {entry.changes.map((change, idx) => (
                                        <div
                                            key={change._id || idx}
                                            className="grid grid-cols-3 p-2 text-sm"
                                        >
                                            <div className="font-semibold">
                                                {change.field}
                                            </div>
                                            <div className="text-gray-600">
                                                {change.oldValue || "N/A"}
                                            </div>
                                            <div className="text-gray-600">
                                                {change.newValue}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default HistorySection;
