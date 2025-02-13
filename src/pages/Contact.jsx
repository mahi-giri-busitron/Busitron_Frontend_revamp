import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const Contact = () => {
    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [errors, setErrors] = useState({}); // State to track validation errors

    const maxLength = 300;

    const validateForm = () => {
        const newErrors = {};
        if (!fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!phone.trim()) newErrors.phone = "Phone is required";
        if (!email.trim()) newErrors.email = "Email is required";
        if (!message.trim()) newErrors.message = "Message is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            alert("Form submitted successfully!");
            // Reset the form (optional)
            setFullName("");
            setPhone("");
            setEmail("");
            setMessage("");
            setErrors({});
        }
    };

    return (
        <div
            className="h-auto flex flex-col items-center justify-center p-5"
            style={{
                background: "linear-gradient(to right, #36D1DC, #5B86E5)",
            }}
        >
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
                {/* Contact Info Section */}
                {/* (Same as before) */}
            </div>

            <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-md grid grid-cols-1 lg:grid-cols-2 gap-6 ">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Full Name
                        </label>
                        <InputText
                            className="w-full p-inputtext-sm"
                            placeholder="Alex Jordan"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.fullName}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Phone
                        </label>
                        <InputText
                            className="w-full p-inputtext-sm"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Email
                        </label>
                        <InputText
                            className="w-full p-inputtext-sm"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-gray-700 font-medium mb-1">
                            Message
                        </label>
                        <textarea
                            className="w-full h-32 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Your message..."
                            maxLength={maxLength}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <div
                            className={`text-right ${
                                message.length === maxLength
                                    ? "text-red-500"
                                    : "text-gray-500"
                            } text-xs`}
                        >
                            {maxLength - message.length}
                        </div>
                        {errors.message && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.message}
                            </p>
                        )}
                    </div>
                    <Button
                        type="submit"
                        label="Send Message"
                        className="px-6 py-2 text-sm text-white font-medium rounded-md border-none shadow-md hover:opacity-90"
                        style={{ backgroundColor: "rgba(0, 113, 93, 1)" }}
                    />
                </form>

                {/* Photo Section */}
                <div className="flex items-center justify-center bg-gray-200 rounded-lg w-full h-full">
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
