import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { Editor } from "primereact/editor";
import { FileUpload } from "primereact/fileupload";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

const AddTask = ({ setShow }) => {

    const {control,register,handleSubmit,formState: { errors },setValue, trigger} = useForm();

    let priorityList = ["Low", "Medium", "High"];
    let taskCategoryList = ["Add", "Delete", "Update", "View"];
    let projectsList = ["FUll Stack ", "Front End", "Backend"];
    let assignedToValues = ["Rahul", "Akram", "Manash"];

    let disabledPastDate = new Date();   
    const [selectedFile, setSelectedFile] = useState(null)

    function onSubmit(data) {
        // console.log(data);
        let modifyData = {
            ...data,
            dueDate :  data.dueDate ? moment(data.dueDate, "DDMMYYYY").format("DD-MM-YYYY") : "",
            startDate: data.startDate ? moment(data.startDate, "DDMMYYYY").format("DD-MM-YYYY") : "",
        };
        // console.log("modifyData", modifyData);
    }

    return (
        <div className="p-1 bg-gray-100">
            <div className="mx-auto bg-white p-2 rounded-lg shadow-md">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid md:grid-cols-2 grid-cols-1 gap-12 mb-3">
                        <div>
                            <label className="font-medium">Task</label>
                            <InputText
                                className="h-10"
                                {...register("task", {
                                    required: "Task required",
                                })}
                            />
                            {errors.task && (
                                <p className="text-red-400 text-sm">
                                    {errors.task.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="font-medium">Task Category</label>
                            <Controller
                                name="taskCategory"
                                control={control}
                                rules={{ required: "Task Category required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={taskCategoryList}
                                        optionLabel="label"
                                        placeholder="Select Task Category"
                                        className="w-full h-10 items-center"
                                        onChange={(e) =>field.onChange(e.value)}
                                    />
                                )}
                            />
                            {errors.taskCategory && (
                                <p className="text-red-400 text-sm">
                                    {errors.taskCategory.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-1 mb-3">
                        <div className="w-full md:w-1/2">
                            <label className="font-medium">Projects</label>
                            <Controller
                                name="projects"
                                control={control}
                                rules={{ required: "Project required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={projectsList}
                                        optionLabel="label"
                                        placeholder="Select Projects"
                                        className="h-10 items-center"
                                        onChange={(e) =>field.onChange(e.value)}
                                    />
                                )}
                            />
                            {errors.projects && (
                                <p className="text-red-400 text-sm">
                                    {errors.projects.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-3">
                        <div>
                            <label className="font-medium">Start Date</label>
                            <div className="flex-auto">
                                <Controller
                                    name="startDate"
                                    control={control}
                                    rules={{ required: "Start Date required" }}
                                    render={({ field }) => (
                                        <Calendar
                                            id="buttondisplay"
                                            value={field.value}
                                            dateFormat="dd/mm/yy"
                                            className="h-10"
                                            minDate={disabledPastDate}
                                            onChange={(e)=>{
                                                field.onChange(e.value)
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
                                    rules={{ required: "Due Date required" }}
                                    render={({ field }) => (
                                        <Calendar
                                            id="buttondisplay"
                                            dateFormat="dd/mm/yy"
                                            className="h-10"
                                            value={field.value}
                                            minDate={disabledPastDate}
                                            onChange={(e) =>field.onChange(e.value)}
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

                    <div className="grid grid-cols-1 mb-3">
                        <div>
                            <label className="font-medium">Assigned To</label>
                            <Controller
                                name="assignedTo"
                                control={control}
                                rules={{ required: "Assigned To required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={assignedToValues}
                                        optionLabel="label"
                                        placeholder="Select Assigned Person"
                                        className="h-10 items-center"
                                        onChange={(e) =>field.onChange(e.value)}
                                    />
                                )}
                            />
                            {errors.assignedTo && (
                                <p className="text-red-400 text-sm">
                                    {errors.assignedTo.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 mb-3">
                        <div>
                            <label className="font-medium">Description</label>
                            <Editor
                                name="description"
                                className="w-full mt-1"
                                onTextChange={(e) => {
                                    let removeTag =e.htmlValue && e.htmlValue.replace(/<\/?p>/g, "");
                                    setValue("description", removeTag, {shouldValidate: true});
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

                    <div className="grid md:grid-cols-3 grid-cols-1 gap-6 my-3">
                        <div>
                            <label className="font-medium">Label</label>
                            <Controller
                                name="label"
                                control={control}
                                rules={{ required: "Label required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={assignedToValues}
                                        optionLabel="label"
                                        placeholder="Select Label"
                                        className="h-10 items-center"
                                        onChange={(e) =>
                                            field.onChange(e.value)
                                        }
                                    />
                                )}
                            />
                            {errors.label && (
                                <p className="text-red-400 text-sm">
                                    {errors.label.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="font-medium">Milestone</label>
                            <Controller
                                name="milestone"
                                control={control}
                                rules={{ required: "Milestone required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={priorityList}
                                        optionLabel="label"
                                        placeholder="Select Milestone"
                                        className="h-10 items-center"
                                        onChange={(e) =>field.onChange(e.value)}
                                    />
                                )}
                            />
                            {errors.milestone && (
                                <p className="text-red-400 text-sm">
                                    {errors.milestone.message}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="font-medium">Priority</label>
                            <Controller
                                name="priority"
                                control={control}
                                rules={{ required: "Priority required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        options={priorityList}
                                        optionLabel="label"
                                        placeholder="Select Priority"
                                        className="h-10 items-center"
                                        onChange={(e) =>field.onChange(e.value)}
                                    />
                                )}
                            />
                            {errors.priority && (
                                <p className="text-red-400 text-sm">
                                    {errors.priority.message}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="mb-3">
                        <i className="pi pi-paperclip text-gray-600 mr-2"></i>
                        Upload File
                        {selectedFile ? 
                        <div className="flex items-center my-2">
                            <span className="text-gray-700 ">{selectedFile.name}</span>
                            <i 
                                title="Remove File"
                                className="pi pi-times text-red-700 font-bold mx-2 cursor-pointer" 
                                onClick={() => {
                                    setSelectedFile(null);
                                    setValue("file", null, { shouldValidate: true });
                            }}></i>
                        </div> : 
                        <div className="my-3 text-center p-0">
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
                                    setSelectedFile(e.files[0])
                                    setValue("file", e.files[0], { shouldValidate: true });
                                }}
                            />
                        </div>}
                    </div>

                    <div className="md:w-55 flex gap-3 w-full">
                        <Button
                            type="submit"
                            label="Save"
                            size="small"
                            icon="pi pi-check"
                            className="p-2 px-4 text-white bg-blue-600 text-sm"
                        />
                        <Button
                            onClick={() => setShow(false)}
                            outlined
                            label="Cancel"
                            severity="secondary"
                            size="small"
                            className="p-2 px-4 text-gray-600 text-sm hover:text-blue-600"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
