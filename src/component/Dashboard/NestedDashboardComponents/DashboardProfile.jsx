import React from "react";
function DashboardProfile() {
    return (
        <div className="p-0">
            <div className="bg-white flex flex-col rounded-lg shadow-md">
                <div className="flex gap-8 w-full py-10 pl-12">
                    <div className="p-8 bg-gray-400 rounded-sm text-white">
                        <i className="pi pi-user"></i>
                    </div>
                    <div>
                        <h2 className="font-bold text-lg">Manikanta Laveti</h2>
                        <p>FULL STACK DEVELOPER</p>
                        <p className="text-[0.9rem] text-gray-400">
                            Employee ID: BU29000025
                        </p>
                    </div>
                </div>
                <div className="flex justify-between px-11 py-6 border-t-3 border-gray-200 w-full">
                    <div>
                        <p className="text-gray-600">Open Tasks</p>
                        <p className="font-bold text-lg">0</p>
                    </div>
                    <div>
                        <p className="text-gray-600">Projects</p>
                        <p className="font-bold text-lg">1</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default DashboardProfile;
