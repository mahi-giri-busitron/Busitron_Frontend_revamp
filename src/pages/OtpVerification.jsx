import React, { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";

const maskEmail = (email) => {
    const [start, end] = [email.slice(0, 2), email.slice(-2)];
    const domain = email.split("@")[1];
    return `${start}****${end}@${domain}`;
};

const OtpVerification = () => {
    const [token, setTokens] = useState("");
    const email = "example@mail.com";
    const maskedEmail = maskEmail(email);

    return (
        <div className="py-14 flex flex-col items-center lg:justify-center bg-gray-200 transition-all duration-500 ease-in-out px-4 sm:justify-start h-full">
            <h1 className="p-4 font-bold text-2xl mb-6 text-blue-500">
                User Verification
            </h1>
            <div className="bg-white justify-center flex flex-col py-7 items-center rounded-lg shadow-lg max-w-lg lg:w-full text-center transform transition-transform duration-500 hover:scale-105 md:w-full ">
                <h2 className="m-1 font-semibold text-xl text-gray-700 ">
                    Authenticate Your Account
                </h2>

                <p className="m-1 text-gray-600 block">
                    Please enter the code sent to
                </p>
                <span className="m-1 font-semibold text-blue-500">
                    {maskedEmail}
                </span>
                <div className="px-2 flex justify-center mb-6">
                    <InputOtp
                        value={token}
                        integerOnly
                        onChange={(e) => setTokens(e.value)}
                        length={6}
                        style={{ gap: "12px" }}
                        className="text-xl p-3 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:shadow-md"
                    />
                </div>

                <div className="flex sm:justify-around justify-between  items-center mt-6 ">
                    <Button
                        label="Resend Code"
                        link
                        className="p-0 transition-colors duration-300 hover:text-blue-500"
                    />
                    <div className="sm:m-1">
                        <Button
                            label="Submit"
                            className="transition-transform duration-300 hover:scale-105"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
