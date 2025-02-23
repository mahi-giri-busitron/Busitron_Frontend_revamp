import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import "primeicons/primeicons.css";

const InviteMemberModal = (props) => {
    const { visible = false, setVisible } = props;
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
                            />
                        </div>
                        <div>
                            <label className="block font-semibold text-gray-700 mb-1">
                                Designation
                            </label>
                            <InputText
                                placeholder="e.g HR"
                                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 hover:border-blue-500 focus:border-blue-500 focus:ring-0"
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
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex justify-start">
                        <Button
                            label="Send Invite"
                            icon="pi pi-send"
                            iconPos="left"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md  flex items-center gap-2"
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
};

export default InviteMemberModal;
