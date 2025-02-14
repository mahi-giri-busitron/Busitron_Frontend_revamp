import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toaster, toast } from "react-hot-toast";
import LOGOFOO from "../assets/svgs/logoFooter.jsx";
import svg from "../assets/sign.jpg"

const Signin = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [showPassword, setShowPassword] = useState(false);


    const onSubmit = (data) => {
        toast.success("Sign in successful!");
    };

    return (
        <>
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <Toaster position="top-right" />

                <div className="relative flex flex-col md:flex-row w-full md:w-[1050px] h-auto md:h-[500px] rounded-xl shadow-lg overflow-hidden border border-gray-200 mt-[-75px] mx-4 md:mx-0">
                    <div className="w-full md:w-1/2 hidden md:flex items-center justify-center relative">
                        <img
                            src={svg}
                            alt="Signin Illustration"
                            className="absolute w-full h-full object-cover"
                        />
                        <div className="relative text-white p-6 mt-40">
                            <h1 className="text-5xl font-bold mb-4 px-6">
                                Hello LoremIpsum!
                            </h1>
                            <p className="text-sm px-6">
                                Skip repetitive and manual sales-marketing
                                tasks. Get highly productive through automation
                                and save tons manual sales-marketing tasks.
                            </p>
                            <div className="text-sm text-blue-100 mt-30 px-6">
                                © {new Date().getFullYear()} Lorem. All rights
                                reserved.
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 flex items-center justify-center p-6">
                        <div className="w-full md:w-[470px] h-auto md:h-[470px] p-6 rounded-lg flex flex-col items-center justify-center">
                            <div className="flex justify-center mb-4">
                                <LOGOFOO className="w-40 h-20" />
                            </div>
                            <div className="group w-fit mx-auto">
                                <h2 className="text-2xl md:text-3xl font-bold text-purple-800 cursor-pointer py-3">
                                    Welcome back!
                                </h2>
                                <hr className="w-16 border-amber-500 border-2 mb-4 transition-all duration-500 group-hover:w-full" />
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="w-full flex flex-col items-center space-y-4"
                            >
                                <div className="w-full md:w-4/5">
                                    <label className="block text-gray-700 text-sm font-semibold p-1">
                                        Email
                                    </label>
                                    <InputText
                                        type="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                                                message:
                                                    "Please enter a valid email",
                                            },
                                        })}
                                        className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400"
                                    />
                                    <div className="min-h-[16px] mt-2 px-1">
                                        {errors.email && (
                                            <p className="text-red-500 text-xs">
                                                {errors.email.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full md:w-4/5 relative">
                                    <label className="block text-gray-700 text-sm font-semibold p-1">
                                        Password
                                    </label>
                                    <div className="relative w-full">
                                        <InputText
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            {...register("password", {
                                                required:
                                                    "Password is required",
                                            })}
                                            className="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-400 pr-10"
                                        />
                                        <i
                                            className={`pi ${
                                                showPassword
                                                    ? "pi-eye-slash"
                                                    : "pi-eye"
                                            } absolute right-3 top-4 cursor-pointer text-gray-500 text-sm`}
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        ></i>
                                    </div>
                                    <div className="w-full text-xs flex items-center justify-between mt-2 mb-3 px-1">
                                        <span className="text-red-500 text-xs">
                                            {errors.password &&
                                                errors.password.message}
                                        </span>
                                        <Link
                                            to="/forgot-password"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Forgot password?
                                        </Link>
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    label="Sign In"
                                    className="w-full md:w-4/5 p-2 bg-blue-500 text-white font-semibold text-sm rounded-md hover:bg-blue-700 transition"
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Signin;