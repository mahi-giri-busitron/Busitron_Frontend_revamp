import { Dropdown } from "primereact/dropdown";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "primereact/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { getALlEstimates } from "../../../redux/estimateSlice";

const UpdateEstimate = ({ selectedItem, setOpenUpdateModal }) => {
    const status = [
        { label: "Pending", value: "Pending" },
        { label: "In Progress", value: "In Progress" },
        { label: "Completed", value: "Completed" },
    ];

    const paymentStatus = [
        { label: "Approved", value: "Approved" },
        { label: "Paid", value: "Paid" },
    ];

    let [isDisabled, setIsDisabled] = useState(false);
    let dispatch = useDispatch();

    const { control, handleSubmit, setValue } = useForm();

    useEffect(() => {
        if (selectedItem) {
            setValue("projectStatus", selectedItem?.projectStatus);
            setValue("paymentStatus", selectedItem?.paymentStatus);
        }
    }, [selectedItem, setValue]);

    async function onSubmit(data) {
        setIsDisabled(true);
        try {
            let res = await axios.patch(
                `/api/v1/estimates/update/${selectedItem._id}`,
                data,
                { withCredentials: true }
            );
            // console.log(res.data?.success);
            if (res.data?.success) {
                toast.success(res.data.message, { duration: 2000 });
                setTimeout(() => {
                    setIsDisabled(false);
                    setOpenUpdateModal(false);
                    dispatch(getALlEstimates());
                }, 2100);
            }
        } catch (error) {
            // console.log(error);
            toast.error(error.message || "Some error in updating estimate");
            setIsDisabled(false);
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="">
                        <label className="block text-gray-700 font-medium">
                            Project Status{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="projectStatus"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    className="w-full h-10 items-center"
                                    options={status}
                                    placeholder="Select Currency"
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 font-medium">
                            Payment Status{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="paymentStatus"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    className="w-full h-10 items-center"
                                    options={paymentStatus}
                                    placeholder="Payment Status"
                                    onChange={(e) => field.onChange(e.value)}
                                />
                            )}
                        />
                    </div>
                </div>

                <div className="flex gap-4">
                    <Button
                        type="submit"
                        label="Update"
                        size="small"
                        icon="pi pi-check"
                        disabled={isDisabled}
                        className="p-2 px-4 text-white bg-blue-600 text-sm"
                    />
                    <Button
                        outlined
                        label="Cancel"
                        severity="secondary"
                        size="small"
                        className="p-2 px-4 text-gray-600 text-sm hover:text-blue-600"
                        onClick={() => setOpenUpdateModal(false)}
                    />
                </div>
            </form>
        </>
    );
};

export default UpdateEstimate;
