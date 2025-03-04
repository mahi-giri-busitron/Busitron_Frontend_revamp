import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { countryCodes } from "../utils/countryCodes.jsx";

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

    const message = watch("message", "");
    const remainingChars = 300 - message.length;

    const handlePhoneChange = (e) => {
        let numericValue = e.target.value.replace(/\D/g, "").slice(0, 10);
        setValue("phone", numericValue, { shouldValidate: true });
        trigger("phone");
    };

    const renderError = (field) =>
        errors[field] && (
            <p className="text-red-500 text-xs mt-1">{errors[field].message}</p>
        );

    return (
        <div className="h-auto flex flex-col items-center justify-center p-5">
            <h1 className="text-4xl font-bold text-black mb-8">Contact Us</h1>
            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-6">
                <form className="space-y-4" onSubmit={handleSubmit(reset)}>
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
                            maxLength={300}
                            {...register("message", {
                                required: "Message is required",
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
                                    ? `${remainingChars} characters remaining`
                                    : "You have reached your limit"}
                            </span>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        label="Send Message"
                        className="px-6 py-2 text-sm text-white font-medium rounded-md shadow-md hover:opacity-90"
                        style={{ backgroundColor: "rgba(0, 113, 93, 1)" }}
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
