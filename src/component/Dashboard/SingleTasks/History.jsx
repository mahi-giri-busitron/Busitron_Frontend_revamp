import React from "react";

const HistorySection = ({ showHistory, history }) => {
    return (
        showHistory && history?.length > 0 && (
            <div className="mt-4">
                <h3 className="text-gray-600 text-lg font-semibold">History</h3>
                <div className="mt-2">
                    {history.map((entry, index) => (
                        <div key={index} className="p-3 rounded-md mb-2 bg-gray-50">
                            <p className="text-sm text-gray-700">
                                <span className="font-semibold">{entry.author}</span> made changes - {entry.date}
                            </p>
                            <div className="mt-2">
                                <div className="grid grid-cols-3 bg-gray-100 p-2 font-semibold text-sm">
                                    <div>Field</div>
                                    <div>Original Value</div>
                                    <div>New Value</div>
                                </div>
                                {entry.changes.map((change, idx) => (
                                    <div key={idx} className="grid grid-cols-3 p-2 text-sm">
                                        <div className="font-semibold">{change.field}</div>
                                        <div className="text-gray-600">{change.original}</div>
                                        <div className="text-gray-600">{change.new}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )
    );
};

export default HistorySection;
