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
import { useDispatch, useSelector } from "react-redux";
import { ProgressSpinner } from "primereact/progressspinner";
import toast from "react-hot-toast";
import { fetchAllUser } from "../../../redux/userManagementSlice";

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

const statusList = [
    "To Do",
    "In Progress",
    "Review",
    "Pending",
    "Completed",
    "Close",
    "Deleted",
];

const AddTask = ({ setShow, task = null, mode = "add" }) => {
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
    const fileUploadRef = useRef(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [assignedBy, setAssignedBy] = useState([]);
    const [files, setFiles] = useState(existingAttachments);
    const [loading, setLoading] = useState(false);
    const [updatedAttachments, setUpdatedAttachments] = useState([]);

    const { users = [] } = useSelector((store) => store?.userManagement || {});

    useEffect(() => {
        if (users.length) {
            setAssignedBy(
                users.map((user) => ({
                    _id: user._id,
                    name: user.name,
                }))
            );
        }
    }, [users]);

    useEffect(() => {
        if (mode === "edit" && task) {
            setValue("title", task.title);
            setValue("taskCategory", task.taskCategory);
            setValue("startDate", new Date(task.startDate));
            setValue("dueDate", new Date(task.dueDate));
            setValue("assignedTo", task.assignedTo._id);
            setValue("assignedBy", task.assignedBy?.name);
            setValue("description", task.description);
            setValue("label", task.label);
            setValue("priority", task.priority);
            setValue("status", task.status);
            setValue("attachments", task?.attachments || []);
            setExistingAttachments(task?.attachments || []);
            setUpdatedAttachments(task?.attachments || []);
            setFiles(task?.attachments || []);
        } else {
            setValue("assignedBy", currentUser?.data?.name);
        }
    }, [mode, task, setValue, currentUser]);

    const handleFileUpload = async (event) => {
        if (!event.files || event.files.length === 0) return;

        const newFiles = event.files.map((file) => ({
            file,
            status: "pending",
        }));

        setUploadedFiles((prev) => [...prev, ...newFiles]);

        for (const fileObj of newFiles) {
            try {
                const formData = new FormData();
                formData.append("file", fileObj.file);
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

    const onSubmit = async (data) => {
        const formData = new FormData();

        // Append task details
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
        formData.append("status", data.status);

        // Append remaining existing attachments
        updatedAttachments.forEach((file) => {
            formData.append("attachments", file);
        });

        // Append newly uploaded files
        uploadedFiles.forEach((fileObj) => {
            if (fileObj.status === "uploaded") {
                formData.append("attachments", fileObj.file);
            }
        });

        try {
            if (mode === "edit" && task?._id) {
                setLoading(true);
                const response = await axios.put(
                    `/api/v1/task/${task._id}`,
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (response?.data.statusCode === 200) {
                    toast.success("Task updated successfully!");
                } else {
                    toast.error("Failed to update task!");
                }
            } else {
                setLoading(true);
                const response = await axios.post(
                    "/api/v1/task/createTask",
                    formData,
                    {
                        headers: { "Content-Type": "multipart/form-data" },
                    }
                );

                if (response?.data.statusCode === 201) {
                    toast.success("Task created successfully!");
                } else {
                    toast.error("Failed to create task!");
                }
            }
            setShow(false);
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong!"
            );
        } finally {
            setLoading(false);
        }
    };

    const removeExistingAttachment = (index) => {
        const updatedAttachments = existingAttachments.filter(
            (_, i) => i !== index
        );
        setExistingAttachments(updatedAttachments);
        setUpdatedAttachments(updatedAttachments);
        setFiles(updatedAttachments);
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
                                options={users.map((user) => ({
                                    label: user.name,
                                    value: user._id,
                                }))}
                                placeholder="Select Assignee"
                                className="w-full"
                                value={field.value}
                                onChange={(e) => {
                                    field.onChange(e.value);
                                }}
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
                <div className="grid grid-cols-3 gap-4 ">
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
                                    options={statusList}
                                    placeholder="Status"
                                    className="w-full"
                                />
                            )}
                        />
                    </div>
                </div>
                {/* Attachments */}
                <div>
                    <label className="font-medium">Attachments</label>

                    {/* Display Existing Attachments */}
                    {files.map((file, index) => {
                        const fileUrl =
                            typeof file === "string"
                                ? file
                                : URL.createObjectURL(file);
                        const fileExtension = fileUrl
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
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2"
                                    >
                                        <img
                                            src={fileUrl}
                                            alt={`Attachment ${index + 1}`}
                                            className="w-12 h-12 object-cover rounded"
                                        />
                                        <span className="text-blue-600 underline">
                                            Image {index + 1}
                                        </span>
                                    </a>
                                ) : (
                                    <a
                                        href={fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        download
                                        className="text-blue-600 underline"
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

                    {/* File Upload Component */}
                    <Controller
                        name="attachments"
                        control={control}
                        render={({ field }) => (
                            <FileUpload
                                ref={fileUploadRef}
                                name="files"
                                customUpload
                                uploadHandler={handleFileUpload}
                                multiple
                                emptyTemplate={
                                    <p className="text-gray-500">
                                        Drag and drop files here or click to
                                        upload
                                    </p>
                                }
                            />
                        )}
                    />
                </div>
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
                    <Button label="Save" type="submit" />
                )}
                ;
            </form>
        </div>
    );
};

export default AddTask;
