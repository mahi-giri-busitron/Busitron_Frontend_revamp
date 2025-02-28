import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { Divider } from "primereact/divider";

const CreateTicket = ({ onHide }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const [description, setDescription] = useState("");
    const [files, setFiles] = useState([]);

    const priorities = [
        { label: "Low", value: "Low" },
        { label: "Medium", value: "Medium" },
        { label: "High", value: "High" },
    ];

    const requesters = [
        { label: "John Doe", value: "John Doe" },
        { label: "Jane Smith", value: "Jane Smith" },
    ];

    const assignGroups = [
        { label: "Support Team", value: "Support Team" },
        { label: "IT Helpdesk", value: "IT Helpdesk" },
    ];

    const agents = [
        { label: "Agent 1", value: "Agent 1" },
        { label: "Agent 2", value: "Agent 2" },
    ];

    const projects = [
        { label: "Project A", value: "Project A" },
        { label: "Project B", value: "Project B" },
    ];

    const ticketTypes = [
        { label: "Bug", value: "Bug" },
        { label: "Feature Request", value: "Feature Request" },
    ];

    const onSubmit = (data) => {
        console.log("Form Submitted:", {
            ...data,
            description,
            files,
        });
        reset();
        setDescription("");
        setFiles([]);
        onHide();
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setFiles([...files, ...newFiles]);
    };

    const handleRemoveFile = (index) => {
        const updatedFiles = files.filter((_, i) => i !== index);
        setFiles(updatedFiles);
    };

    return (
        <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
            <div className="max-w-7xl mx-auto bg-white p-4 md:p-8 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold">
                            Ticket Details
                        </h2>
                        <Divider />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6">
                        <div>
                            <label className="font-medium">
                                Requester Name *
                            </label>
                            <Dropdown
                                {...register("requesterName", {
                                    required: "Requester Name is required",
                                })}
                                options={requesters}
                                optionLabel="label"
                                placeholder="Select Requester"
                                className={`w-full items-center h-10 mt-1 ${
                                    errors.requesterName ? "p-invalid" : ""
                                }`}
                            />
                            {errors.requesterName && (
                                <small className="p-error">
                                    {errors.requesterName.message}
                                </small>
                            )}
                        </div>
                        <div>
                            <label className="font-medium">Assign Team *</label>
                            <Dropdown
                                {...register("assignGroup", {
                                    required: "Assign Group is required",
                                })}
                                options={assignGroups}
                                optionLabel="label"
                                placeholder="Select Group"
                                className={`w-full items-center h-10 mt-1 ${
                                    errors.assignGroup ? "p-invalid" : ""
                                }`}
                            />
                            {errors.assignGroup && (
                                <small className="p-error">
                                    {errors.assignGroup.message}
                                </small>
                            )}
                        </div>
                        <div>
                            <label className="font-medium">Agent</label>
                            <Dropdown
                                {...register("agent", {
                                    required: "Agent is required",
                                })}
                                options={agents}
                                optionLabel="label"
                                placeholder="Select Agent"
                                className={`w-full items-center h-10 mt-1 ${
                                    errors.agent ? "p-invalid" : ""
                                }`}
                            />
                            {errors.agent && (
                                <small className="p-error">
                                    {errors.agent.message}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-4 md:mt-6">
                        <div>
                            <label className="font-medium">Project</label>
                            <Dropdown
                                {...register("project", {
                                    required: "Project is required",
                                })}
                                options={projects}
                                optionLabel="label"
                                placeholder="Select Project"
                                className={`w-full md:w-80 h-10 items-center mt-1 ${
                                    errors.project ? "p-invalid" : ""
                                }`}
                            />
                            {errors.project && (
                                <small className="p-error">
                                    {errors.project.message}
                                </small>
                            )}
                        </div>
                        <div>
                            <label className="font-medium">Type</label>
                            <Dropdown
                                {...register("ticketType", {
                                    required: "Ticket Type is required",
                                })}
                                options={ticketTypes}
                                optionLabel="label"
                                placeholder="Select Type"
                                className={`w-full md:w-80 h-10 items-center mt-1 ${
                                    errors.ticketType ? "p-invalid" : ""
                                }`}
                            />
                            {errors.ticketType && (
                                <small className="p-error">
                                    {errors.ticketType.message}
                                </small>
                            )}
                        </div>
                    </div>

                    <div className="mt-4 md:mt-6">
                        <label className="font-medium">Ticket Subject *</label>
                        <InputText
                            {...register("ticketSubject", {
                                required: "Ticket Subject is required",
                            })}
                            className={`w-full h-10 items-center mt-2 ${
                                errors.ticketSubject ? "p-invalid" : ""
                            }`}
                            placeholder="Enter ticket subject"
                        />
                        {errors.ticketSubject && (
                            <small className="p-error">
                                {errors.ticketSubject.message}
                            </small>
                        )}
                    </div>

                    <div className="mt-8 md:mt-14 cursor-pointer flex items-center">
                        <span className="font-semibold text-lg text-gray-700">
                            Other Details
                        </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 mt-3">
                        <div>
                            <label className="font-medium">Priority</label>
                            <Dropdown
                                {...register("priority", {
                                    required: "Priority is required",
                                })}
                                options={priorities}
                                optionLabel="label"
                                placeholder="Select Priority"
                                className={`w-full md:w-80 h-10 items-center mt-1 ${
                                    errors.priority ? "p-invalid" : ""
                                }`}
                            />
                            {errors.priority && (
                                <small className="p-error">
                                    {errors.priority.message}
                                </small>
                            )}
                        </div>
                        <div>
                            <label className="font-medium">Channel Name</label>
                            <Dropdown
                                {...register("channelName", {
                                    required: "Channel Name is required",
                                })}
                                options={ticketTypes}
                                optionLabel="label"
                                placeholder="Select Channel"
                                className={`w-full md:w-80 h-10 items-center mt-1 ${
                                    errors.channelName ? "p-invalid" : ""
                                }`}
                            />
                            {errors.channelName && (
                                <small className="p-error">
                                    {errors.channelName.message}
                                </small>
                            )}
                        </div>
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
                        {errors.description && (
                            <small className="p-error">
                                Description is required
                            </small>
                        )}
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
                                        const isImage =
                                            file.type.startsWith("image/");
                                        return (
                                            <div
                                                key={index}
                                                className="relative flex items-center bg-gray-100 p-2 rounded-lg w-full md:w-64"
                                            >
                                                {isImage ? (
                                                    <img
                                                        src={URL.createObjectURL(
                                                            file
                                                        )}
                                                        alt={file.name}
                                                        className="w-10 h-10 object-cover rounded-md mr-2"
                                                    />
                                                ) : (
                                                    <i className="pi pi-file text-gray-500 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-md mr-2"></i>
                                                )}

                                                <span className="text-sm flex-grow truncate">
                                                    {file.name}
                                                </span>
                                                <button
                                                    type="button"
                                                    className="absolute right-2 text-gray-500 hover:text-red-700"
                                                    onClick={() =>
                                                        handleRemoveFile(index)
                                                    }
                                                >
                                                    <i className="pi pi-times bg-amber-100 px-2"></i>
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-6 flex flex-col md:flex-row gap-4 w-full md:w-55">
                        <Button
                            type="submit"
                            label="Save"
                            size="small"
                            icon="pi pi-check"
                            className="p-2 px-4 text-white bg-blue-600 text-sm w-full md:w-auto"
                        />
                        <Button
                            label="Cancel"
                            severity="secondary"
                            outlined
                            size="small"
                            className="p-2 px-4 text-gray-600 text-sm w-full md:w-auto"
                            onClick={onHide}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTicket;
