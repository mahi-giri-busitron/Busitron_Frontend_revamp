import { useState } from "react";
import { InputOtp } from "primereact/inputotp";
import { Button } from "primereact/button";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerify, resendOtp } from "../redux/userSlice";
import { ProgressSpinner } from "primereact/progressspinner";

const maskEmail = (email) => {
    const [local, domain] = email.split("@");
    if (local.length < 4) return email;
    return `${local.slice(0, 2)}****${local.slice(-2)}@${domain}`;
};

const OtpVerification = () => {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false); // Unified loading state

    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    if (currentUser.data.isValid) return <Navigate to="/dashboard" />;

    async function verifyOtp() {
        setLoading("verify"); // Set loading for verification
        const apiResult = await dispatch(otpVerify({ otp: token }));
        setLoading(false);

        if (otpVerify.fulfilled.match(apiResult)) {
            navigate("/signin/create-user");
        }
    }

    async function resendotp() {
        setLoading("resend"); // Set loading for resending OTP
        try {
            await dispatch(resendOtp());
        } catch (error) {
            console.error("Error resending OTP:", error);
        }
        setLoading(false);
    }

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
                    {maskEmail(currentUser.data.email)}
                </span>
                <div className="px-2 flex justify-center mb-6">
                    <InputOtp
                        value={token}
                        integerOnly
                        onChange={(e) => setToken(e.value)}
                        length={6}
                        style={{ gap: "12px" }}
                        className="text-xl p-3 border border-gray-300 rounded-md transition-all duration-300 focus:border-blue-500 focus:shadow-md"
                    />
                </div>

                <div className="flex justify-center w-full items-center mt-6">
                    {loading ? (
                        <ProgressSpinner
                            style={{ width: "40px", height: "40px" }}
                            strokeWidth="8"
                            animationDuration=".5s"
                        />
                    ) : (
                        <div className="flex sm:justify-around justify-between w-full items-center">
                            <Button
                                label="Resend Code"
                                link
                                className="p-0 transition-colors duration-300 hover:text-blue-500"
                                onClick={resendotp}
                            />
                            <Button
                                label="Submit"
                                className="transition-transform duration-300 hover:scale-105"
                                onClick={verifyOtp}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OtpVerification;
