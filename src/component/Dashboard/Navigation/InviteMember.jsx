import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "primeicons/primeicons.css";
import axios from "axios";
import { ProgressSpinner } from "primereact/progressspinner";
import toast from "react-hot-toast";
    
const InviteMemberModal = (props) => {
    const { visible = false, setVisible } = props;
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        email: "",
        designation: "",
        employeeId: "",
        message: "",
    });

    async function handleSubmit() {
        try {
            setLoading(true);
            const apiResponse = await axios.post("/api/v1/auth/register", data);
            if (apiResponse.data.success) {
                toast.success("Successfully registered");
                setData({
                    email: "",
                    designation: "",
                    employeeId: "",
                    message: "",
                });
            } else {
                toast.error("Something went wrong!");
            }
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }
    return (
        <Dialog
            visible={visible}
            onHide={() => setVisible(false)}
            className="w-[90%] md:w-[60%] min-h-[450px] !bg-white rounded-2xl shadow-xl "
            closable={false}
        >
            <div>
                <button
                    onClick={() => setVisible(false)}
                    className=" p-2  rounded-full hover:bg-gray-100 cursor-pointer absolute top-3 right-3 text-gray-600 hover:text-blue-900 transition-all "
                >
                    <i className="pi pi-times text-2xl hover:text-blue-900"></i>
                </button>
                <div className=" rounded-2xl  relative p-3 pt-0">
                    <h2 className="text-2xl font-bold text-black-600">
                        Invite Member - Busitron IT Solutions Pvt Ltd
                    </h2>
                    <hr className="border-gray-300 my-3" />
                    <p className="text-gray-500 text-center text-s font-medium bg-gray-100 p-2 rounded-md mt-2.5 flex items-center gap-2">
                        <i className="pi pi-info-circle text-black-500 text-s mt-0.5"></i>
                        Employees receive an email to log in and update their
                        profile through the self-service portal.
                    </p>
                    <div className="mt-4 space-y-4">
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Email
                            </label>
                            <InputText
                                placeholder="e.g johndoe@gmail.com"
                                className="w-full border border-gray-300 rounded-md p-2 hover:border-blue-500 focus:border-blue-500 focus:ring-0"
                                value={data.email}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Designation
                            </label>
                            <InputText
                                placeholder="e.g HR"
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 hover:border-blue-500 focus:border-blue-500 focus:ring-0"
                                value={data.designation}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        designation: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Employee ID
                            </label>
                            <InputText
                                placeholder="e.g abc123"
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 hover:border-blue-500 focus:border-blue-500 focus:ring-0"
                                value={data.employeeId}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        employeeId: e.target.value,
                                    }))
                                }
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Message
                            </label>
                            <InputTextarea
                                rows={3}
                                placeholder="Add message (Optional)"
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 hover:border-blue-500 focus:border-blue-500 focus:ring-0"
                                value={data.message}
                                onChange={(e) =>
                                    setData((prev) => ({
                                        ...prev,
                                        message: e.target.value,
                                    }))
                                }
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-start">
                        {loading ? (
                            <ProgressSpinner
                                style={{
                                    width: "50px",
                                    height: "50px",
                                }}
                                strokeWidth="8"
                                fill="var(--surface-ground)"
                                animationDuration=".5s"
                            />
                        ) : (
                            <Button
                                label="Send Invite"
                                icon="pi pi-send"
                                iconPos="left "
                                size="small"
                                className="bg-blue-500 text-white px-4 py-2 rounded-md  flex items-center gap-2 h-10"
                                onClick={handleSubmit}
                            />
                        )}
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default InviteMemberModal;
