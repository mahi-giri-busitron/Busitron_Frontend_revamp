import React, { useEffect, useState } from "react";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

const CreateProject = ({ visible, onHide }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        trigger,
        reset,
    } = useForm();

    const departmentvalues = ["e-commerse", "meical", "automative"];
    let projectCatValues = ["Front End", "Back End", "Full Stac"];
    let disabledPastDate = new Date();

    const handleClose = (e) => {
        e.preventDefault();
        reset();
        onHide();
    };

    function onSubmit(data) {
        let modifyData = {
            ...data,
            dueDate: data.dueDate
                ? moment(data.dueDate, "DDMMYYYY").format("DD-MM-YYYY")
                : "",
            startDate: data.startDate
                ? moment(data.startDate, "DDMMYYYY").format("DD-MM-YYYY")
                : "",
        };
        onHide(); 
         reset();
    }
    return (
        <Dialog
            visible={visible}
            onHide={(e) => {
                handleClose(e);
            }}
            header="Add Project"
            className="w-11/12 md:w-1/2 p-fluid"
            style={{ width: "75vw" }}
        >
            <div className="p-1  rounded-lg border-3 border-gray-100">
                <div className="mx-auto bg-white p-2 rounded-lg shadow-md">
                    <form onSubmit={ handleSubmit(onSubmit)}>
                        <div className="grid md:grid-cols-1 grid-cols-1 gap-12 mb-3">
                            <div>
                                <label className="font-medium">
                                    Project Name
                                </label>
                                <InputText
                                    className="h-10"
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
                                                value={field.value}
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
                                                value={field.value}
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

                        <div className="grid grid-cols-1 mb-3 md:grid-cols-2 gap-6 mb-3">
                            <div>
                                <label className="font-medium">
                                    Department
                                </label>
                                <Controller
                                    name="department"
                                    control={control}
                                    rules={{
                                        required: "Department To required",
                                    }}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            options={departmentvalues}
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
                                        required: "Project category required",
                                    }}
                                    render={({ field }) => (
                                        <Dropdown
                                            {...field}
                                            options={projectCatValues}
                                            optionLabel="Project category"
                                            placeholder="Select Project category"
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
                                <Editor
                                    name="description"
                                    className="w-full mt-1"
                                    onTextChange={(e) => {
                                        let removeTag =
                                            e.htmlValue &&
                                            e.htmlValue.replace(/<\/?p>/g, "");
                                        setValue("description", removeTag, {
                                            shouldValidate: true,
                                        });
                                        trigger("description");
                                    }}
                                />
                            </div>
                            {errors.description && (
                                <p className="text-red-400 text-sm">
                                    {errors.description.message}
                                </p>
                            )}
                        </div>
                        <div className="mb-3 ">
                            <i className="pi pi-paperclip text-gray-600 mr-2"></i>
                            Upload File
                            {selectedFile ? (
                                <div className="flex items-center my-2 ">
                                    <span className="text-gray-700 ">
                                        {selectedFile.name}
                                    </span>
                                    <i
                                        title="Remove File"
                                        className="pi pi-times text-red-700 font-bold mx-2 cursor-pointer"
                                        onClick={() => {
                                            setSelectedFile(null);
                                            setValue("file", null, {
                                                shouldValidate: true,
                                            });
                                        }}
                                    ></i>
                                </div>
                            ) : (
                                <div className="my-3 text-center p-0 ">
                                    <FileUpload
                                        mode="basic"
                                        name="file"
                                        accept="image/*"
                                        maxFileSize={1000000}
                                        auto
                                        customUpload
                                        chooseLabel="Browse"
                                        className="text-sm leading-none"
                                        uploadHandler={(e) => {
                                            setSelectedFile(e.files[0]);
                                            setValue("file", e.files[0], {
                                                shouldValidate: true,
                                            });
                                        }}
                                    />
                                </div>
                            )}
                        </div>
                        
                        <div className="md:w-55 flex gap-3 w-full justify-normal  ">
                            <Button
                                type="submit"
                                label="Save"
                                size="small"
                                icon="pi pi-check"
                                className="p-2 px-4 text-white bg-blue-600 text-sm h-10"
                            />
                            <Button
                                onClick={ (e)=>handleClose(e)}
                                type="button"
                                outlined
                                label="Cancel"
                                severity="secondary"
                                size="small"
                                className="p-2 px-4 text-gray-600 text-sm hover:text-blue-600 h-10"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </Dialog>
    );
};

export default CreateProject;
