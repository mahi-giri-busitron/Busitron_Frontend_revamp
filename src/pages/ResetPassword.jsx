import React, { useState } from "react";
import { ProgressSpinner } from "primereact/progressspinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false);
    const { email } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email,
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/v1/auth/forgot_password", {
                formData,
            });
            navigate("/signin");
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center py-20 bg-gray-100">
            <div className="flex flex-wrap gap-10">
                <div className="bg-white shadow-lg rounded-lg p-8">
                    <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">
                        Reset Password
                    </h2>

                    <label className="mt-6 block text-gray-700 font-medium mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full p-2 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter new password"
                    />

                    <label className="mt-6 block text-gray-700 font-medium mb-2">
                        Confirm Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Confirm new password"
                    />

                    {loading ? (
                        <div className="w-[32rem] mt-5">
                            <ProgressSpinner
                                style={{
                                    width: "100%",
                                    height: "50px",
                                }}
                                strokeWidth="8"
                                fill="var(--surface-ground)"
                                animationDuration=".5s"
                            />
                        </div>
                    ) : (
                        <button
                            className="p-15 w-full mt-8 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                            onClick={handleResetPassword}
                        >
                            Reset Password
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
