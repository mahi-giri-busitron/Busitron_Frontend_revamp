import React from "react";
import { Link } from "react-router-dom";

const EnterEmailForResetPassword = () => {
    return (
        <div className="flex justify-center items-center py-16 bg-gray-100">
            <div className="flex flex-wrap gap-10">
                <div className="bg-white shadow-lg rounded-lg p-8 w-120">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                        Forgot Password
                    </h2>
                    <label className="mt-6 block text-gray-700 font-medium mb-2">
                        Email <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        className="w-full p-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your Email"
                    />
                    <button className="p-15 w-full mt-8 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                        Submit
                    </button>
                    <button className="pt-4 w-full hover:text-blue-500">
                        <Link to={"/signin"}>Back to signin</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnterEmailForResetPassword;
