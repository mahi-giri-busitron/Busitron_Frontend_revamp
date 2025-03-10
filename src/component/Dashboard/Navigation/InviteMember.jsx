import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ProgressSpinner } from "primereact/progressspinner";
import "primeicons/primeicons.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const InviteMemberModal = ({ visible = false, setVisible }) => {
    const [loading, setLoading] = useState(false);
    const { currentUser } = useSelector((store) => store.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            designation: "",
            employeeId: "",
            companyName: "",
            message: "",
        },
    });

    const onSubmit = async (data) => {
         // event.preventDefault();
        try {
            setLoading(true);
            const apiResponse = await axios.post(
                "http://localhost:5421/api/v1/auth/register",
                data
            );

            if (apiResponse.data.statusCode === 201) {
                toast.success(
                    apiResponse.data.message || "Successfully registered",
                    { icon: "✅" }
                );
                setVisible(false);
            } else {
                toast.error(
                    apiResponse.data.message || "Something went wrong!"
                );
            }
        } catch (error) {
            if (error.response && error.response.data) {
                toast.error(
                    error.response.data.message ||
                        "Error occurred while submitting"
                );
            } else {
                toast.error("Network error. Please try again.");
                console.log("error", error);
            }
        } finally {
            setLoading(false);
            reset();
            setVisible(false);
        }
    };

    return (
        <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-[90%] md:w-[65%] min-h-[450px] !bg-white rounded-2xl shadow-xl"
            closable={false}
        >
            <div>
                <button
                    onClick={() => setVisible(false)}
                    className="p-2 rounded-full hover:bg-gray-100 cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-blue-900 transition-all"
                >
                    <i className="pi pi-times text-2xl hover:text-blue-900"></i>
                </button>
                <div className="rounded-2xl relative p-3 pt-0">
                    <h2 className="text-2xl font-bold text-black-600">
                        {currentUser.data.role === "SuperAdmin"
                            ? "Invite Admin - Busitron IT Solutions Pvt Ltd"
                            : "Invite Employee - Busitron IT Solutions Pvt Ltd"}
                    </h2>
                    <hr className="border-gray-300 my-3" />
                    <p className="text-gray-500 text-center text-s font-medium bg-gray-100 p-2 rounded-md mt-2.5 flex items-center gap-2">
                        <i className="pi pi-info-circle text-black-500 text-s mt-0.5"></i>
                        Employees receive an email to log in and update their
                        profile through the self-service portal.
                    </p>
                    <hr className="border-gray-300 my-3" />
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4"
                    >
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <InputText
                                placeholder="e.g johndoe@gmail.com"
                                className="w-full border rounded-md p-2"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: "Invalid email format",
                                    },
                                })}
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Designation
                            </label>
                            <InputText
                                placeholder="e.g HR"
                                className="w-full border rounded-md p-2"
                                {...register("designation", {
                                    required: "Designation is required",
                                })}
                            />
                            {errors.designation && (
                                <p className="text-red-500 text-sm">
                                    {errors.designation.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Role
                            </label>
                            <InputText
                                disabled
                                className="w-full border rounded-md p-2"
                                defaultValue={
                                    currentUser?.data?.role === "SuperAdmin"
                                        ? "Admin"
                                        : "Employee"
                                }
                                {...register("role", {
                                    required: true,
                                })}
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Employee ID
                            </label>
                            <InputText
                                placeholder="e.g abc123"
                                className="w-full border rounded-md p-2"
                                {...register("employeeId", {
                                    required: "Employee ID is required",
                                })}
                            />
                            {errors.employeeId && (
                                <p className="text-red-500 text-sm">
                                    {errors.employeeId.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Company Name
                            </label>
                            <InputText
                                placeholder="Company Name"
                                className="w-full border rounded-md p-2"
                                {...register("companyName", {
                                    required: "Company Name is required",
                                })}
                            />
                            {errors.companyName && (
                                <p className="text-red-500 text-sm">
                                    {errors.companyName.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Message
                            </label>
                            <InputTextarea
                                rows={3}
                                placeholder="Add message (Optional)"
                                className="w-full border rounded-md p-2"
                                {...register("message")}
                            />
                        </div>
                        <div className="mt-4 flex justify-start">
                            {loading ? (
                                <ProgressSpinner
                                    style={{ width: "50px", height: "50px" }}
                                    strokeWidth="8"
                                    animationDuration=".5s"
                                />
                            ) : (
                                <Button
                                    label="Send Invite"
                                    icon="pi pi-send"
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                                />
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default InviteMemberModal;
