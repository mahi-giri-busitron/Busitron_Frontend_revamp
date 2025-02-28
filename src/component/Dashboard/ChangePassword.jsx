import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const ChangePassword = () => {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const { currentUser } = useSelector((store) => store.user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `/api/v1/auth/changePassword/${currentUser.data._id}`,
                formData
            );
            console.log("Response:", response);
            if (response.data.statusCode === 200) {
                toast.success("Password changed successfully!");
                setFormData({
                    currentPassword: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(
                "Error:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div className="flex justify-center py-20 h-[100%]">
            <div className="flex flex-wrap gap-10">
                <div className="bg-white rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                        Change Password
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <label className="mt-6 block text-gray-700 font-medium mb-2">
                            Current Password{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="currentPassword"
                            value={formData.currentPassword}
                            type="password"
                            className="w-full p-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter current password"
                            onChange={handleChange}
                        />
                        <label className="mt-6 block text-gray-700 font-medium mb-2">
                            New Password <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="newPassword"
                            value={formData.newPassword}
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter new password"
                            onChange={handleChange}
                        />
                        <label className="mt-6 block text-gray-700 font-medium mb-2">
                            Confirm Password{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Confirm password"
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="w-full mt-8 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ChangePassword;
