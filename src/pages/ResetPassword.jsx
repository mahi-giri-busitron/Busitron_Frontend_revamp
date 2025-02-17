import React from "react";

const ResetPassword = () => {
    return (
        <div className="flex justify-center items-center py-16 bg-gray-100">
            <div className="flex flex-wrap gap-10">
                <div className="bg-white shadow-lg rounded-lg p-8 w-120">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                        Reset Password
                    </h2>
                    <label className="mt-6 block text-gray-700 font-medium mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full p-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter new password"
                    />
                    <label className="mt-6 block text-gray-700 font-medium mb-2">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Confirm new password"
                    />
                    <button className=" p-15 w-full mt-8 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Reset Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;