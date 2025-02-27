import React, { useState } from "react";
import "primeicons/primeicons.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const CreateProject = ({ visible, onHide }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file.name);
        }
    };

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            header="Add Project"
            className="w-11/12 md:w-1/2"
        >
            <div className="p-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-700">
                    Project Details
                </h3>
                <form>
                    <div>
                        <label className="block font-medium text-gray-700">
                            Project Name *
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded border-gray-300"
                            placeholder="Write a project name"
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block font-medium mt-4 text-gray-700">
                                Start Date *
                            </label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded border-gray-300"
                            />

                            <label className="block font-medium mt-4 text-gray-700">
                                Project Category
                            </label>
                            <div className="flex items-center gap-2">
                                <select className="flex-1 p-2 border rounded border-gray-300">
                                    <option>--</option>
                                </select>
                                <button className="px-3 py-1 bg-gray-200 text-black border rounded border-gray-300">
                                    Add
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block font-medium mt-4 text-gray-700">
                                Deadline *
                            </label>
                            <input
                                type="date"
                                className="w-full p-2 border rounded border-gray-300"
                            />

                            <label className="block font-medium mt-4 text-gray-700">
                                Department
                            </label>
                            <select className="w-full p-2 border rounded border-gray-300">
                                <option>Nothing selected</option>
                            </select>
                        </div>
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-gray-700">
                            Project Summary
                        </label>
                        <textarea
                            className="w-full p-2 border rounded border-gray-300"
                            placeholder="Enter project summary"
                        ></textarea>
                    </div>

                    <div className="mt-4">
                        <label className="block font-medium text-gray-700">
                            Add File
                        </label>
                        <div className="border border-gray-300 rounded p-4 flex justify-center items-center text-gray-500">
                            <label className="flex items-center w-full">
                                <i className="pi pi-paperclip text-gray-700 text-lg mr-2"></i>
                                <span className="flex-grow">
                                    {selectedFile || "Choose a file"}
                                </span>
                                <input
                                    type="file"
                                    className="hidden"
                                    onChange={handleFileChange}
                                />
                            </label>
                        </div>
                    </div>

                    <div className="mt-4 flex justify-end gap-4">
                        <Button label="Save Project" size="samll" className="h-10" />
                    </div>
                </form>
            </div>
        </Dialog>
    );
};

export default CreateProject;
