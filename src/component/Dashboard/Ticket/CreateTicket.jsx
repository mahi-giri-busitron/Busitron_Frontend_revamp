import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { Divider } from "primereact/divider";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";

const CreateTicket = ({ onHide, ticketData }) => {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);

    const { currentUser } = useSelector((store) => store?.user);

    const priorities = [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
    ];

    const assignGroups = [
        { label: "Support Team", value: "Support Team" },
        { label: "IT helpdesk", value: "IT helpdesk" },
    ];

    const status = [
        { label: "Open", value: "Open" },
        { label: "Pending", value: "Pending" },
        { label: "Resolved", value: "Resolved" },
        { label: "Closed", value: "Closed" },
    ];

    const ticketTypes = [
        { label: "Bug", value: "Bug" },
        { label: "Feature Request", value: "Feature Request" },
    ];

    useEffect(() => {
        if (ticketData) {
            reset({
                assignGroup: ticketData.assignTeam,
                status: ticketData.status,
                ticketType: ticketData.ticketType,
                priority: ticketData.priority,
                ticketSubject: ticketData.ticketSubject,
            });

            setDescription(ticketData.description);

            setFiles(
                Array.isArray(ticketData.attachments)
                    ? ticketData.attachments
                          .map((attachment) => attachment)
                          .filter((file) => file !== undefined)
                    : []
            );
        }
    }, [ticketData, reset]);

    const onSubmit = async (data) => {
        const formData = new FormData();

        formData.append("userId", currentUser?.data?._id);
        formData.append("assignTeam", data.assignGroup);
        formData.append("status", data.status);
        formData.append("ticketType", data.ticketType);
        formData.append("priority", data.priority);
        formData.append("ticketSubject", data.ticketSubject);
        formData.append("description", description);

        files.forEach((file) => {
            formData.append("attachments", file);
        });

        try {
            if (!ticketData) {
                const response = await axios.post(
                    "/api/v1/ticket/createTicket",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (response?.data?.statusCode === 201) {
                    toast.success(response.data.message);
                } else {
                    toast.error("Failed to create ticket");
                }
            } else {
                const response = await axios.put(
                    `/api/v1/ticket/${ticketData._id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (response?.data?.statusCode === 200) {
                    toast.success(response.data.message);
                } else {
                    toast.error("Failed to update ticket");
                }
            }

            reset();
            setDescription("");
            setFiles([]);
            onHide();
        } catch (error) {
            console.error("Error creating ticket:", error);
        }
    };

    const handleFileChange = (event) => {
        if (!event.target.files.length) return;
        const selectedFiles = Array.from(event.target.files).filter(
            (file) => file
        );
        setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    };

    const handleRemoveFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    return (
        <div className="p-1 rounded-lg border-3 border-gray-100">
            <div className="mx-auto bg-white p-2 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">
                            Ticket Details
                        </h2>
                        <Divider />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mt-4 md:mt-6">
                        <div>
                            <label className="font-medium">
                                Requester Name *
                            </label>
                            <InputText
                                value={currentUser?.data?.name || ""}
                                disabled
                                className="w-full h-12 mt-1 bg-gray-200"
                            />
                        </div>
                        <div>
                            <label className="font-medium">Assign Team *</label>
                            <Controller
                                name="assignGroup"
                                control={control}
                                rules={{ required: "Assign Group is required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={assignGroups}
                                        optionLabel="label"
                                        placeholder="Select Group"
                                        className={`w-full h-12 mt-1 ${
                                            errors.assignGroup
                                                ? "p-invalid"
                                                : ""
                                        }`}
                                    />
                                )}
                            />
                            {errors.assignGroup && (
                                <small className="p-error">
                                    {errors.assignGroup.message}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                        <div>
                            <label className="font-medium">Status</label>
                            <Controller
                                name="status"
                                control={control}
                                rules={{ required: "Status is required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={status}
                                        optionLabel="label"
                                        placeholder="Select Status"
                                        className={`w-full h-12 mt-1 ${
                                            errors.status ? "p-invalid" : ""
                                        }`}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Type</label>
                            <Controller
                                name="ticketType"
                                control={control}
                                rules={{ required: "Ticket Type is required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={ticketTypes}
                                        optionLabel="label"
                                        placeholder="Select Type"
                                        className={`w-full h-12 mt-1 ${
                                            errors.ticketType ? "p-invalid" : ""
                                        }`}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <label className="font-medium">Priority</label>
                            <Controller
                                name="priority"
                                control={control}
                                rules={{ required: "Priority is required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={priorities}
                                        optionLabel="label"
                                        placeholder="Select Priority"
                                        className={`w-full h-12 mt-1 ${
                                            errors.priority ? "p-invalid" : ""
                                        }`}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <div className="mt-4 md:mt-6">
                        <label className="font-medium">Ticket Subject *</label>
                        <InputText
                            {...register("ticketSubject", {
                                required: "Ticket Subject is required",
                            })}
                            className={`w-full h-12 mt-2 ${
                                errors.ticketSubject ? "p-invalid" : ""
                            }`}
                            placeholder="Enter ticket subject"
                        />
                    </div>

                    <div className="mt-4 md:mt-6">
                        <label className="font-medium">Description *</label>
                        <Editor
                            value={description}
                            onTextChange={(e) => setDescription(e.htmlValue)}
                            className={`w-full h-20 mt-1 ${
                                errors.description ? "p-invalid" : ""
                            }`}
                        />
                    </div>

                    <div className="mt-4 md:mt-6">
                        <div className="flex items-center mt-46 md:mt-24">
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer flex items-center"
                            >
                                <i className="pi pi-paperclip text-gray-600 mr-2"></i>
                                <span className="text-gray-600 font-bold">
                                    Upload File
                                </span>
                                <input
                                    id="file-upload"
                                    type="file"
                                    multiple
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>

                        {files.length > 0 && (
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-2">
                                    {files.map((file, index) => {
                                        if (!file) return null;

                                        const filePath = ticketData
                                            ? String(file)
                                            : file?.name ?? "";

                                        const fileExtension = filePath.includes(
                                            "."
                                        )
                                            ? filePath
                                                  .split(".")
                                                  .pop()
                                                  .toLowerCase()
                                            : "";

                                        const fileName = ticketData
                                            ? filePath.includes("/")
                                                ? filePath
                                                      .split("/")
                                                      .pop()
                                                      .split("-")
                                                      .slice(1)
                                                      .join("-")
                                                : filePath
                                            : filePath;

                                        const isImage = [
                                            "jpg",
                                            "jpeg",
                                            "png",
                                            "gif",
                                            "webp",
                                        ].includes(fileExtension);
                                        const isPDF = fileExtension === "pdf";

                                        return (
                                            <div
                                                key={index}
                                                className="relative flex items-center bg-gray-100 p-2 rounded-lg w-full border"
                                            >
                                                {isImage ? (
                                                    <img
                                                        src={String(file)}
                                                        alt={fileName}
                                                        className="w-10 h-10 object-cover rounded-md mr-2"
                                                    />
                                                ) : isPDF ? (
                                                    <a
                                                        href={String(file)}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center text-blue-600"
                                                    >
                                                        <i className="pi pi-file-pdf text-red-600 flex items-center justify-center rounded-md mr-2"></i>
                                                        <span className="underline">
                                                            {fileName}
                                                        </span>
                                                    </a>
                                                ) : (
                                                    <i className="pi pi-file text-gray-500 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md mr-2"></i>
                                                )}

                                                {isImage ? (
                                                    <span className="text-sm flex-grow truncate">
                                                        {fileName}
                                                    </span>
                                                ) : null}

                                                <button
                                                    type="button"
                                                    className="absolute right-2 text-gray-500 cursor-pointer hover:text-red-500"
                                                    onClick={() =>
                                                        handleRemoveFile(index)
                                                    }
                                                >
                                                    <i className="pi pi-times px-2"></i>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-15 flex flex-col md:flex-row gap-4 w-full md:w-55">
                        <Button
                            type="submit"
                            label="Save"
                            size="small"
                            icon="pi pi-check"
                            className="p-2 px-4 text-white bg-blue-600 text-sm w-full md:w-auto  h-10"
                        />
                        <Button
                            label="Cancel"
                            severity="secondary"
                            outlined
                            size="small"
                            className="p-2 px-4 text-gray-600 text-sm w-full md:w-auto  h-10"
                            onClick={onHide}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicket;
