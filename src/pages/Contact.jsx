import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { countryCodes } from "../utils/countryCodes.jsx";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";

const CountryDropdown = ({ selectedCode, setSelectedCode }) => (
    <Dropdown
        value={selectedCode}
        options={countryCodes}
        onChange={(e) => setSelectedCode(e.value)}
        placeholder="Select"
        className="w-48 text-sm"
        optionLabel="code"
        filter
        filterBy="name, code"
        valueTemplate={() => (
            <div className="flex items-center">
                <img
                    src={selectedCode.flag}
                    alt={selectedCode.name}
                    className="w-6 h-4 mr-2"
                />
                <span>{selectedCode.code}</span>
            </div>
        )}
        itemTemplate={(option) => (
            <div className="flex items-center gap-1">
                <img src={option.flag} alt={option.name} className="w-6 h-5" />
                <span className="text-xs sm:text-sm">{option.code}</span>
                <span className="text-xs sm:text-sm">{option.name}</span>
            </div>
        )}
    />
);

const Contact = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        reset,
        setValue,
        trigger,
    } = useForm();
    const [selectedCode, setSelectedCode] = useState(
        countryCodes.find((c) => c.code === "+91")
    );

    const [loading, setLoading] = useState(false);

    const message = watch("message", "");
    const remainingChars = 300 - message.length;

    const handlePhoneChange = (e) => {
        let numericValue = e.target.value.replace(/\D/g, "").slice(0, 10);
        setValue("phone", numericValue, { shouldValidate: true });
        trigger("phone");
    };

    const onSubmit = async (data) => {
        setLoading(true);
        const payload = {
            name: data.fullName,
            email: data.email,
            phone: `${selectedCode.code} ${data.phone}`,
            message: data.message,
        };

        try {
            const response = await axios.post(
                "/api/v1/contact/emailRequest",
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.status === 200 && response.data.success) {
                toast.success("Your message has been sent successfully!", {
                    duration: 3000,
                    position: "top-right",
                });
                reset();
            } else {
                toast.error(
                    response.data.message || "Failed to send your message.",
                    {
                        duration: 3000,
                        position: "top-right",
                    }
                );
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                    "An error occurred. Please try again later.",
                {
                    duration: 3000,
                    position: "top-right",
                }
            );
        } finally {
            setLoading(false);
        }
    };

    const renderError = (field) =>
        errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field].message}</p>
        );

    return (
        <div className="h-auto flex flex-col items-center justify-center p-5">
            <Toaster />

            <h1 className="text-4xl font-bold text-black mb-8">Contact Us</h1>
            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-6">
                <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name
                        </label>
                        <InputText
                            className="w-full p-inputtext-sm"
                            placeholder="Alex Jordan"
                            {...register("fullName", {
                                required: "Full Name is required",
                            })}
                        />
                        {renderError("fullName")}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Phone
                        </label>
                        <div className="flex items-center gap-2">
                            <CountryDropdown
                                selectedCode={selectedCode}
                                setSelectedCode={setSelectedCode}
                            />
                            <InputText
                                type="text"
                                maxLength={10}
                                className="w-full p-inputtext-sm"
                                placeholder={`Enter ${selectedCode.length}-digit number`}
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message:
                                            "Phone number must be exactly 10 digits",
                                    },
                                })}
                                onChange={handlePhoneChange}
                            />
                        </div>
                        {renderError("phone")}
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <InputText
                            className="w-full p-inputtext-sm"
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {renderError("email")}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Message
                        </label>
                        <textarea
                            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                            placeholder="Your message..."
                            {...register("message", {
                                required: "Message is required",
                                maxLength: {
                                    value: 300,
                                    message:
                                        "Message must be less than 300 characters",
                                },
                            })}
                        />
                        <div className="text-xs flex justify-between items-center">
                            <span className="text-red-500">
                                {errors.message?.message}
                            </span>
                            <span
                                className={
                                    remainingChars > 0
                                        ? "text-gray-500"
                                        : "text-red-500"
                                }
                            >
                                {remainingChars > 0
                                    ? remainingChars
                                    : "You have reached your limit"}
                            </span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        label={loading ? "Sending..." : "Send Message"}
                        className={`px-6 py-2 text-sm text-white font-medium rounded-md shadow-md ${
                            loading
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:opacity-90"
                        }`}
                        style={{ backgroundColor: "rgba(0, 113, 93, 1)" }}
                        disabled={loading}
                    />
                </form>

                <div className="hidden lg:flex items-center justify-center bg-gray-200 rounded-lg w-full h-full">
                    <img
                        src="src/assets/pexels-photo-3184287.jpeg"
                        alt="Contact Illustration"
                        className="w-full h-140 rounded-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default Contact;
