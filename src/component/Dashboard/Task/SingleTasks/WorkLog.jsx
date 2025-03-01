import React from "react";
import { Avatar } from "primereact/avatar";

const WorkLogSection = ({ showWorkLog, workLog }) => {
    return (
        showWorkLog && (
            <div className="mt-4">
                <h3 className="text-gray-600 text-lg font-semibold">Work Log</h3>
                <div className="mt-2">
                    {workLog && workLog.length > 0 ? (
                        workLog.map((log, index) => (
                            <div key={index} className="p-3 rounded-md mb-2 bg-gray-50">
                                {/* Avatar and user details */}
                                <div className="flex items-center gap-2">
                                    <Avatar 
                                        label={log.author.charAt(0)} 
                                        shape="circle" 
                                        className="bg-blue-500 text-white" 
                                    />
                                    <p className="text-sm">
                                        <span className="font-semibold text-blue-600 cursor-pointer">
                                            {log.author}
                                        </span>{" "}
                                        logged work - <span className="text-gray-600">{log.date}</span>
                                    </p>
                                </div>
                                
                                {/* Work log details */}
                                <div className="mt-2 text-sm text-gray-700">
                                    <p>
                                        <span className="font-semibold">Time Spent:</span> {log.timeSpent}
                                    </p>
                                    <p className="italic text-gray-500">{log.description || "No comment"}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 text-sm mt-2">No work log available.</p>
                    )}
                </div>
            </div>
        )
    );
};

export default WorkLogSection;
