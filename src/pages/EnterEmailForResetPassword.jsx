import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProgressSpinner } from "primereact/progressspinner";

const EnterEmailForResetPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/v1/auth/isEmailExist", {
                email,
            });
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-[500px] bg-gray-100">
            <div className="flex flex-wrap gap-10">
                <div className="bg-white shadow-lg rounded-lg p-8">
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
                        onChange={(e) => setEmail(e.target.value)}
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
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    )}

                    <button className="pt-4 w-full hover:text-blue-500">
                        <Link to={"/signin"}>Back to signin</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EnterEmailForResetPassword;
