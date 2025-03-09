import React, { useEffect, useRef, useState } from "react";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { ProgressSpinner } from "primereact/progressspinner";

const CreateProject = ({
    visible,
    onHide,
    Data,
    onRemove,
    onCloseedit,
    onRecall,
    editMode,
    setShouldReload
}) => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const fileUploadRef = useRef(null);

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        reset,
    } = useForm();

    const departmentValues = [
        "E-Commerce",
        "Medical & Healthcare",
        "Automotive",
        "Finance & FinTech",
        "Education & E-Learning",
        "Real Estate",
        "Retail & Supply Chain",
        "Travel & Hospitality",
        "Entertainment & Media",
        "Logistics & Transportation",
        "Manufacturing",
        "Government & Public Services",
        "Energy & Utilities",
        "Human Resources & Recruitment",
    ];

    let projectCatValues = [
        "Web Development",
        "Mobile App Development",
        "Software Development",
        "Cloud Computing",
        "AI & Machine Learning",
        "Blockchain",
        "Cybersecurity",
        "IoT (Internet of Things)",
        "Data Analytics & Big Data",
        "Game Development",
        "Embedded Systems",
        "CRM & ERP Solutions",
        "DevOps & Automation",
        "AR/VR (Augmented & Virtual Reality)",
    ];

    let disabledPastDate = new Date();

    const handleClose = (e) => {
        e.preventDefault();
        reset();
        onHide();
    };

    const onFileSelect = (event) => {
        setSelectedFiles((prevFiles) => [
            ...prevFiles,
            ...event.files, // Store actual File objects
        ]);
    };

    useEffect(() => {
        if (editMode && Data) {
            setValue("projectName", Data.projectName);
            setValue(
                "startDate",
                Data.startDate ? new Date(Data.startDate) : null
            );
            setValue("dueDate", Data.endDate ? new Date(Data.endDate) : null);
            setValue("department", Data.department);
            setValue("projectCat", Data.projectCategory);
            setValue("description", Data.projectSummary);
            // setSelectedFiles(Data.attachments || []);
            if (editMode && Data?.attachments) {
                setSelectedFiles(Data.attachments); // Load existing attachments
            }
        }
    }, [editMode, Data, setValue]);

    const removeFile = (index) => {
        setSelectedFiles((prevFiles) => {
            const updatedFiles = prevFiles.filter(
                (_, fileIndex) => fileIndex !== index
            );

            if (fileUploadRef.current) {
                fileUploadRef.current.clear(); // ✅ Correct way to clear files
            }

            return updatedFiles;
        });
    };

    async function onSubmit(data) {
        let formData = new FormData();

        formData.append("projectName", data.projectName);
        formData.append(
            "startDate",
            moment(data.startDate).format("YYYY-MM-DD")
        );
        formData.append("endDate", moment(data.dueDate).format("YYYY-MM-DD"));
        formData.append("projectCategory", data.projectCat);
        formData.append("department", data.department);
        formData.append("projectSummary", data.description);

        if (selectedFiles.length > 0) {
            selectedFiles.forEach((file) => {
                formData.append("attachments", file); // Append actual File objects
            });
        }

        try {
            if (!editMode) {
                setLoading(true);

                const response = await axios.post(
                    "/api/v1/project/projects",
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                toast.success("Project created successfully!");
                setShouldReload((prev)=> !prev)
            } else {
                const response = await axios.put(
                    `/api/v1/project/projects/${Data._id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                toast.success("Project updated successfully!");
            }
            reset();
            onHide();
            setSelectedFiles([]);
        } catch (error) {
            toast.error("Failed to create project. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <Dialog
            visible={visible}
            onHide={(e) => {
                handleClose(e);
                onRemove();
                onCloseedit();
            }}
            header="Add Project"
            className="w-11/12 md:w-1/2 p-fluid"
            style={{ width: "75vw" }}
        >
            <div className="p-1  rounded-lg border-3 border-gray-100">
                <div className="mx-auto bg-white p-2 rounded-lg shadow-md">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-1 grid-cols-1 gap-12 mb-3">
                            <div>
                                <label className="font-medium">
                                    Project Name
                                </label>
                                <InputText
                                    className="h-10"
                                    defaultValue={Data ? Data.projectName : ""}
                                    {...register("projectName", {
                                        required: "Project Name required",
                                    })}
                                />
                                {errors.task && (
                                    <p className="text-red-400 text-sm">
                                        {errors.task.projectName}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-3">
                            <div>
                                <label className="font-medium">
                                    Start Date
                                </label>
                                <div className="flex-auto">
                                    <Controller
                                        name="startDate"
                                        control={control}
                                        rules={{
                                            required: "Start Date required",
                                        }}
                                        render={({ field }) => (
                                            <Calendar
                                                id="buttondisplay"
                                                value={
                                                    field.value ??
                                                    (Data?.startDate
                                                        ? new Date(
                                                              Data.startDate
                                                          )
                                                        : null)
                                                }
                                                dateFormat="dd/mm/yy"
                                                className="h-10"
                                                minDate={disabledPastDate}
                                                onChange={(e) => {
                                                    field.onChange(e.value);
                                                }}
                                                showIcon
                                            />
                                        )}
                                    />
                                    {errors.startDate && (
                                        <p className="text-red-400 text-sm">
                                            {errors.startDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="font-medium">Due Date</label>
                                <div className="flex-auto">
                                    <Controller
                                        name="dueDate"
                                        control={control}
                                        rules={{
                                            required: "Due Date required",
                                        }}
                                        render={({ field }) => (
                                            <Calendar
                                                id="buttondisplay"
                                                dateFormat="dd/mm/yy"
                                                className="h-10"
                                                value={
                                                    field.value ??
                                                    (Data?.endDate
                                                        ? new Date(Data.endDate)
                                                        : null)
                                                }
                                                minDate={disabledPastDate}
                                                onChange={(e) =>
                                                    field.onChange(e.value)
                                                }
                                                showIcon
                                            />
                                        )}
                                    />
                                    {errors.dueDate && (
                                        <p className="text-red-400 text-sm">
                                            {errors.dueDate.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                            <div>
                                <label className="font-medium">
                                    Department
                                </label>
                                <Controller
                                    name="department"
                                    control={control}
                                    rules={{
                                        required: "Department is required",
                                    }}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            value={
                                                field.value ??
                                                Data?.department ??
                                                ""
                                            }
                                            options={departmentValues.map(
                                                (dep) => ({
                                                    label: dep,
                                                    value: dep,
                                                })
                                            )}
                                            optionLabel="label"
                                            placeholder="Select Department"
                                            className="h-10 items-center"
                                            onChange={(e) =>
                                                field.onChange(e.value)
                                            }
                                        />
                                    )}
                                />
                                {errors.department && (
                                    <p className="text-red-400 text-sm">
                                        {errors.department.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="font-medium">
                                    Project category
                                </label>
                                <Controller
                                    name="projectCat"
                                    control={control}
                                    rules={{
                                        required:
                                            "Project category is required",
                                    }}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            value={
                                                field.value ??
                                                Data?.projectCategory ??
                                                ""
                                            }
                                            options={projectCatValues.map(
                                                (cat) => ({
                                                    label: cat,
                                                    value: cat,
                                                })
                                            )}
                                            optionLabel="label"
                                            placeholder="Select Project Category"
                                            className="h-10 items-center"
                                            onChange={(e) =>
                                                field.onChange(e.value)
                                            }
                                        />
                                    )}
                                />

                                {errors.projectCat && (
                                    <p className="text-red-400 text-sm">
                                        {errors.projectCat.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-6 mb-3">
                            <div>
                                <label className="font-medium">
                                    Description
                                </label>
                                <Controller
                                    name="description"
                                    control={control}
                                    defaultValue={Data?.projectSummary || ""}
                                    render={({ field }) => (
                                        <Editor
                                            {...field}
                                            className="w-full mt-1"
                                            value={field.value}
                                            onTextChange={(e) => {
                                                const removeTag =
                                                    e.htmlValue?.replace(
                                                        /<\/?p>/g,
                                                        ""
                                                    ) || "";
                                                field.onChange(removeTag);
                                                setValue(
                                                    "projectSummary",
                                                    removeTag,
                                                    { shouldValidate: true }
                                                );
                                                trigger("projectSummary");
                                            }}
                                        />
                                    )}
                                />
                            </div>
                            {errors.description && (
                                <p className="text-red-400 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-3 ">
                            <label className="font-medium">Attachments</label>
                            <FileUpload
                                ref={fileUploadRef}
                                name="attachments"
                                multiple
                                accept="image/*"
                                maxFileSize={10000000}
                                customUpload
                                uploadHandler={onFileSelect}
                                emptyTemplate={
                                    <p className="p-2">
                                        Drag and drop files here or click to
                                        upload.
                                    </p>
                                }
                            />
                            <div>
                                {selectedFiles.length > 0 && (
                                    <div className="mt-2">
                                        {selectedFiles.map((file, index) => {
                                            if (!file) return null;

                                            const fileName = editMode
                                                ? typeof file === "object"
                                                    ? file.name
                                                    : file
                                                          .split("/")
                                                          .pop()
                                                          .split("-")
                                                          .slice(1)
                                                          .join("-")
                                                : file.name;

                                            return (
                                                <div
                                                    key={index}
                                                    className="flex justify-between items-center p-2 border"
                                                >
                                                    <span>
                                                        {fileName ||
                                                            `Attachment ${
                                                                index + 1
                                                            }`}
                                                    </span>
                                                    <Button
                                                        icon="pi pi-trash"
                                                        className="p-button-danger p-button-text"
                                                        onClick={() =>
                                                            removeFile(index)
                                                        }
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="md:w-55 flex gap-3 w-full justify-normal  ">
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
                                <>
                                    <Button
                                        type="submit"
                                        label="Save"
                                        size="small"
                                        icon="pi pi-check"
                                        className="p-2 px-4 text-white bg-blue-600 text-sm h-10"
                                    />
                                    <Button
                                        onClick={(e) => {
                                            handleClose(e);
                                            onRemove();
                                            onCloseedit();
                                        }}
                                        type="button"
                                        outlined
                                        label="Cancel"
                                        severity="secondary"
                                        size="small"
                                        className="p-2 px-4 text-gray-600 text-sm hover:text-blue-600 h-10"
                                    />
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default CreateProject;
