import React, { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import axios from "axios";
import moment from "moment";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const taskCategoryList = [
    "Project Management",
    "Development",
    "UI",
    "Bug",
    "Testing",
    "Other",
];

const labelValues = [
    "Enhancement",
    "Bug",
    "Duplicate",
    "Documentation",
    "Helpmate",
];

const priorityList = ["Low", "Medium", "High"];

const assignedToValues = ["a", "b", "c"];



const AddTask = ({ setShow, task = null, mode = "add", users = [] }) => {
    const { currentUser } = useSelector((store) => store.user);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        watch,
    } = useForm();

    const [existingAttachments, setExistingAttachments] = useState([]);
    const [newFiles, setNewFiles] = useState([]);
    const fileUploadRef = useRef(null);
    const [verifiedUsers, setVerifiedUsers] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    // useEffect(() => {
    //     // Fetch verified users on component load
    //     const fetchVerifiedUsers = async () => {
    //         try {
    //             const response = await axios.get("/api/v1/users?status=verified"); // Adjust endpoint to match your backend
    //             setVerifiedUsers(response.data.users || []);
    //         } catch (error) {
    //             console.error("Failed to fetch verified users:", error);
    //             toast.error("Failed to fetch verified users.");
    //         }
    //     };

    //     fetchVerifiedUsers();
    // }, []);
    useEffect(() => {
        const dummyUsers = [
            { _id: "user1", name: "John Doe" },
            { _id: "user2", name: "Jane Smith" },
            { _id: "user3", name: "Alice Johnson" },
            { _id: "user4", name: "Bob Brown" },
            { _id: "user5", name: "Charlie Green" },
        ];

        setVerifiedUsers(dummyUsers);
    }, []);

    useEffect(() => {
        if (mode === "edit" && task) {
            setValue("title", task.title);
            setValue("taskCategory", task.taskCategory);
            setValue("startDate", new Date(task.startDate));
            setValue("dueDate", new Date(task.dueDate));
            setValue("assignedTo", task.assignedTo?.name); // set value to user ID, since Dropdown works with value
            setValue("description", task.description);
            setValue("label", task.label);
            setValue("priority", task.priority);
            setExistingAttachments(task.attachments || []);

            setValue("assignedBy", task.assignedBy?.name);
        } else {
            setValue("assignedBy", currentUser?.data?.name);
        }
    }, [mode, task, setValue, currentUser]);

    const handleFileUpload = async (event) => {
        const files = event.files.map((file) => ({
            file,
            status: "pending",
        }));

        setUploadedFiles((prev) => [...prev, ...files]);

        for (const fileObj of files) {
            try {
                // You can replace this with your actual upload logic (to S3, or your backend)
                const formData = new FormData();
                formData.append("file", fileObj.file);

                await axios.post("/api/v1/upload", formData); // Change to your actual upload URL

                setUploadedFiles((prev) =>
                    prev.map((f) =>
                        f.file === fileObj.file
                            ? { ...f, status: "uploaded" }
                            : f
                    )
                );
                toast.success(`${fileObj.file.name} uploaded successfully!`);
            } catch (error) {
                setUploadedFiles((prev) =>
                    prev.map((f) =>
                        f.file === fileObj.file ? { ...f, status: "failed" } : f
                    )
                );
                toast.error(`Failed to upload ${fileObj.file.name}`);
            }
        }
    };

    const removeExistingAttachment = (index) => {
        const updated = existingAttachments.filter((_, i) => i !== index);
        setExistingAttachments(updated);
    };

    const removeNewFile = (index) => {
        setNewFiles((prev) => prev.filter((_, i) => i !== index));
    };

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("taskCategory", data.taskCategory);
        formData.append(
            "startDate",
            moment(data.startDate).format("YYYY-MM-DD")
        );
        formData.append("dueDate", moment(data.dueDate).format("YYYY-MM-DD"));
        formData.append("assignedTo", data.assignedTo);
        formData.append("assignedBy", currentUser?.data?._id);
        formData.append("description", data.description);
        formData.append("label", data.label);
        formData.append("priority", data.priority);

        existingAttachments.forEach((fileUrl) => {
            formData.append("existingAttachments", fileUrl);
        });

        newFiles.forEach((file) => {
            formData.append("files", file);
        });

        try {
            if (mode === "edit" && task?._id) {
                await axios.put(`/api/v1/task/${task._id}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
                toast.success("Task updated successfully!");
            } else {
                const response = await axios.post(
                    "/api/v1/task/createTask",
                    formData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );

                toast.success("Task created successfully!");
            }
            setShow(false);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        }
    };
    const fileItemTemplate = (file, props) => {
        const fileStatus =
            uploadedFiles.find((f) => f.file.name === file.name)?.status ||
            "pending";

        let statusColor = "bg-gray-200"; // Default for pending
        let statusText = "Pending";

        if (fileStatus === "uploaded") {
            statusColor = "bg-green-200 text-green-800";
            statusText = "Uploaded";
        } else if (fileStatus === "failed") {
            statusColor = "bg-red-200 text-red-800";
            statusText = "Failed";
        } else if (fileStatus === "pending") {
            statusColor = "bg-orange-200 text-orange-800";
            statusText = "Pending";
        }

        return (
            <div className="flex justify-between items-center p-2 border-b ">
                <div className="gap-3">
                    <span className="font-medium gap-3">{file.name}</span>{" "}
                    <div
                        className={`inline-block text-xs px-2 py-1 rounded ${statusColor}`}
                    >
                        {statusText}
                    </div>
                </div>
                <button
                    type="button"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => props.onRemove(file)}
                >
                    ✖
                </button>
            </div>
        );
    };
    const emptyTemplate = () => {
        return (
            <div className="flex flex-col items-center justify-center gap-3  rounded-lg p-5 w-full bg-gray-50">
                <i
                    className="pi pi-image text-6xl text-gray-400 "
                    style={{
                        fontSize: "5em",
                        borderRadius: "50%",
                        backgroundColor: "var(--surface-b)",
                        color: "var(--surface-d)",
                    }}
                ></i>
                <span className="text-gray-500 text-lg font-medium">
                    Drag and Drop Image Here
                </span>
            </div>
        );
    };

    return (
        <div className="p-4 rounded-lg">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label>Task Title</label>
                    <InputText
                        {...register("title", {
                            required: "Title is required",
                        })}
                        className="w-full"
                    />
                    {errors.title && (
                        <small className="text-red-500">
                            {errors.title.message}
                        </small>
                    )}
                </div>

                {/* Task Category */}
                <div>
                    <label>Task Category</label>
                    <Controller
                        name="taskCategory"
                        control={control}
                        rules={{ required: "Task Category is required" }}
                        render={({ field }) => (
                            <Dropdown
                                {...field}
                                options={taskCategoryList}
                                placeholder="Select Category"
                                className="w-full"
                            />
                        )}
                    />
                    {errors.taskCategory && (
                        <small className="text-red-500">
                            {errors.taskCategory.message}
                        </small>
                    )}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label>Start Date</label>
                        <Controller
                            name="startDate"
                            control={control}
                            rules={{ required: "Start Date is required" }}
                            render={({ field }) => (
                                <Calendar
                                    {...field}
                                    showIcon
                                    dateFormat="dd/mm/yy"
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.startDate && (
                            <small className="text-red-500">
                                {errors.startDate.message}
                            </small>
                        )}
                    </div>

                    <div>
                        <label>Due Date</label>
                        <Controller
                            name="dueDate"
                            control={control}
                            rules={{ required: "Due Date is required" }}
                            render={({ field }) => (
                                <Calendar
                                    {...field}
                                    showIcon
                                    dateFormat="dd/mm/yy"
                                    className="w-full"
                                />
                            )}
                        />
                        {errors.dueDate && (
                            <small className="text-red-500">
                                {errors.dueDate.message}
                            </small>
                        )}
                    </div>
                </div>

                {/* Assigned To */}
                <div>
                    <label>Assigned To</label>
                    <Controller
                        name="assignedTo"
                        control={control}
                        rules={{ required: "Assignee is required" }}
                        render={({ field }) => (
                            <Dropdown
                                {...field}
                                options={verifiedUsers.map((user) => ({
                                    label: user.name,
                                    value: user._id,
                                }))}
                                placeholder="Select Assignee"
                                className="w-full"
                                value={field.value}
                                onChange={(e) => field.onChange(e.value)}
                            />
                        )}
                    />
                    {errors.assignedTo && (
                        <small className="text-red-500">
                            {errors.assignedTo.message}
                        </small>
                    )}
                </div>

                {/* Assigned By */}
                <div>
                    <label>Assigned By</label>
                    <InputText
                        value={watch("assignedBy")}
                        disabled
                        className="w-full bg-gray-100"
                    />
                </div>

                {/* Description */}
                <div>
                    <label>Description</label>
                    <Editor
                        value={watch("description")}
                        onTextChange={(e) => {
                            setValue("description", e.htmlValue);
                            trigger("description");
                        }}
                        style={{ height: "150px" }}
                    />
                    {errors.description && (
                        <small className="text-red-500">
                            {errors.description.message}
                        </small>
                    )}
                </div>

                {/* Labels & Priority */}
                <div className="grid grid-cols-2 gap-4 ">
                    <div>
                        <label htmlFor="label">label</label>
                        <Controller
                            name="label"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    options={labelValues}
                                    placeholder="Label"
                                    className="w-full"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label htmlFor="priority">priority</label>
                        <Controller
                            name="priority"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    options={priorityList}
                                    placeholder="Priority"
                                    className="w-full"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label htmlFor="status">Status</label>
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    options={priorityList}
                                    placeholder="Priority"
                                    className="w-full"
                                />
                            )}
                        />
                    </div>
                </div>

                {/* Attachments */}
                <div>
                    <label className="font-medium">Attachments</label>
                    {existingAttachments.map((file, index) => {
                        const fileExtension = file
                            .split(".")
                            .pop()
                            .toLowerCase();
                        const isImage = [
                            "jpg",
                            "jpeg",
                            "png",
                            "gif",
                            "webp",
                            "bmp",
                        ].includes(fileExtension);

                        return (
                            <div
                                key={index}
                                className="flex items-center gap-3 p-2 border-b"
                            >
                                {isImage ? (
                                    <a
                                        href={file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={file}
                                            alt={`Attachment ${index + 1}`}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <span className="text-blue-600 underline">
                                            Image {index + 1}
                                        </span>
                                    </a>
                                ) : (
                                    <a
                                        href={file}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="flex items-center gap-2 text-blue-600 underline"
                                    >
                                        📄 Document {index + 1}
                                    </a>
                                )}

                                <Button
                                    icon="pi pi-times"
                                    className="p-button-text text-red-500"
                                    onClick={() =>
                                        removeExistingAttachment(index)
                                    }
                                />
                            </div>
                        );
                    })}
                    <FileUpload
                        ref={fileUploadRef}
                        customUpload
                        uploadHandler={handleFileUpload}
                        multiple
                        itemTemplate={fileItemTemplate}
                        emptyTemplate={emptyTemplate}
                    />
                </div>

                <Button label="Save" type="submit" />
            </form>
        </div>
    );
};

export default AddTask;
