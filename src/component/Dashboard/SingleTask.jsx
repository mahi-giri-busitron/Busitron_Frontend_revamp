import { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { ScrollPanel } from "primereact/scrollpanel";
import { Menu } from "primereact/menu";
import { InputText } from "primereact/inputtext";
import { TabMenu } from "primereact/tabmenu";
import "quill/dist/quill.snow.css";
import CommentSection from "./SingleTasks/Comments";
import IssueDetailsAccordion from "./SingleTasks/DetailsAccordian";
import WorkLogSection from "./SingleTasks/WorkLog";
import HistorySection from "./SingleTasks/History";
import DatesSection from "./SingleTasks/DatesAccordian";
import { Card } from "primereact/card";

const IssueDetails = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [selectedFiles, Setselectedfiles] = useState(null);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const menu = useRef(null);
    const [subTasks, setSubTasks] = useState([]);
    const [showSubTaskDialog, setShowSubTaskDialog] = useState(false);
    const [subTaskText, setSubTaskText] = useState("");

    const [activeIndex, setActiveIndex] = useState(0);

    const onSelect = (event) => {
        const newFiles = event.files;
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    };

    const addSubTask = () => {
        if (subTaskText.trim()) {
            setSubTasks([...subTasks, subTaskText]);
            setSubTaskText("");
            setShowSubTaskDialog(false);
        }
    };

    const items = [
        { label: "Comments", icon: "pi pi-comments" },
        { label: "Work Log", icon: "pi pi-list" },
        { label: "History", icon: "pi pi-history" },
    ];

    const workLogData = [
        {
            author: "Varsha Rajendra Meshram",
            date: "20-Feb-2025",
            timeSpent: "1 day",
            description: "Completed task implementation.",
        },
    ];

    const historyData = [
        {
            author: "M Harisha",
            date: "04-Feb-2025",
            changes: [
                {
                    field: "Status",
                    original: "Open [1]",
                    new: "SW Dev [11400]",
                },
                {
                    field: "Remaining Estimate",
                    original: "1 day [28800]",
                    new: "0 minutes [0]",
                },
                { field: "Time Spent", original: "", new: "1 day [28800]" },
                { field: "Worklog Id", original: "", new: "1000286 [1000286]" },
            ],
        },
    ];

    const issueDetails = {
        assignee: "Naruto Uzumaki",
        reporter: "Uchiha Sasuke",
        priority: {
            label: "High",
            icon: "pi pi-exclamation-triangle",
            color: "text-red-500",
        },
        labels: {
            label: "Bug",
            icon: "pi pi-tag",
            color: "text-blue-500 cursor-pointer",
        },
        timeTracking: { label: "No time logged", icon: "pi pi-clock" },
    };

    const DateDetails = {
        Dates: {
            Due: { label: "27/Feb/25" },
            Created: { label: "3 days ago" },
            Updated: { label: "7 hours ago" },
            "Start Date": { label: "20/Feb/25" },
            "End Date": { label: "27/Feb/25" },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 p-2  text-gray-600 ">
            <div className="max-w-full flex justify-center items-start mx-auto bg-white shadow-lg rounded-lg p-4  gap-6">
                {/*left section*/}
                <div className="space-y-4 w-3/5 max-h-screen overflow-y-auto pr-4">
                    <p className="text-xs text-blue-500">SC-30</p>
                    <h1 className="text-2xl font-semibold text-gray-600 ">Task By ID??</h1>

                    <div className="flex flex-wrap gap-3 mt-3 items-center ">
                        {/* Attach File Button */}
                        <FileUpload
                            mode="basic"
                            chooseLabel="Attach"
                            customUpload={false}
                            auto
                            multiple
                            maxFileSize={1000000}
                            onSelect={onSelect}
                            className="p-button-secondary p-button-sm "
                        />

                        {/* View Files Button (Only Shows When Files Are Uploaded) */}
                        {uploadedFiles.length > 0 && (
                            <Button
                                label={`View Files (${uploadedFiles.length})`}
                                icon="pi pi-folder-open"
                                className="p-button-text p-button-secondary p-button-sm"
                                onClick={() => setDialogVisible(true)} // Replace with modal logic
                            />
                        )}

                        {/* More Options Menu */}
                        <div className="relative More_button">
                            <Button
                                icon="pi pi-ellipsis-v"
                                className="p-button-secondary "
                                onClick={(event) => menu.current.toggle(event)}
                                // label="More"
                            />
                            <Menu
                                model={[
                                    {
                                        label: "Create Sub-task",
                                        icon: "pi pi-plus",
                                        command: () =>
                                            console.log("Sub-task created"), // Replace with actual logic
                                    },
                                ]}
                                popup
                                ref={menu}
                            />
                        </div>
                    </div>

                    <div className="mt-7">
                        <h2 className="text-lg font-medium mt-2">Description</h2>
                        <div className="descrip">
                        <Card className="h-20 overflow-auto p-0 ">
                            <p className="m-0 ">
                                Lorem ipsum dolor sit amet, consectetur
                                adipisicing elit. Inventore sed consequuntur
                                error repudiandae numquam deserunt quisquam
                                repellat libero asperiores earum nam nobis,
                                culpa ratione quam perferendis esse, cupiditate
                                neque quas!
                            </p>
                        </Card>
                        </div>
                    </div>

                    <div>
                        {subTasks.length > 0 && (
                            <div className="mt-4">
                                <h2 className="text-lg font-medium">
                                    Sub-tasks
                                </h2>
                                <ul className="list-disc list-inside">
                                    {subTasks.map((task, index) => (
                                        <li
                                            key={index}
                                            className="text-gray-700"
                                        >
                                            {task}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    <div className="mt-7 w-full">
                        <h2 className="text-lg font-medium text-center md:text-left">
                            Activity
                        </h2>
                        <div className="flex justify-center md:justify-start">
                            <TabMenu
                                model={items}
                                activeIndex={activeIndex}
                                onTabChange={(e) => setActiveIndex(e.index)}
                                className="mt-2 w-full md:w-auto text-xs"
                                style={{ overflowX: "auto" }} // Prevents overflow on smaller screens
                            />
                        </div>
                        <div className="mt-4 rounded-lg  bg-white shadow-md ">
                            {activeIndex === 0 && (
                                <CommentSection showComments={true} />
                            )}
                            {activeIndex === 1 && (
                                <WorkLogSection
                                    showWorkLog={true}
                                    workLog={workLogData}
                                />
                            )}
                            {activeIndex === 2 && (
                                <HistorySection
                                    showHistory={true}
                                    history={historyData}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Section */}
                <div className="bg-white p-2 rounded-md self-start w-2/5 max-h-screen overflow-y-auto pr-4">
                    <IssueDetailsAccordion
                        activeIndex={activeIndex}
                        issueDetails={issueDetails}
                    />
                    <div className="mt-4">
                        <DatesSection
                            activeIndex={activeIndex}
                            issueDetails={DateDetails}
                        />
                    </div>
                </div>
            </div>

            {/* File Viewer Dialog */}
            <Dialog
                header="Uploaded Files"
                visible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
                className="w-full max-w-lg"
            >
                {uploadedFiles.length > 0 ? (
                    <ScrollPanel style={{ height: "300px" }}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-2">
                            {uploadedFiles.map((file, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center bg-gray-100 p-2 rounded-lg shadow-md"
                                >
                                    <img
                                        src={URL.createObjectURL(file)}
                                        alt={file.name}
                                        className="w-24 h-24 object-cover rounded-md mb-2"
                                    />
                                    <strong className="text-sm text-gray-700 text-center">
                                        {file.name}
                                    </strong>
                                    <span className="text-xs text-gray-500">
                                        {(file.size / 1024).toFixed(2)} KB
                                    </span>
                                </div>
                            ))}
                        </div>
                    </ScrollPanel>
                ) : (
                    <p className="text-center text-gray-500">
                        No files uploaded yet.
                    </p>
                )}
            </Dialog>

            {/*Dialog for subtasks*/}
            {/* <Dialog
                header="Create Sub-task"
                visible={showSubTaskDialog}
                onHide={() => setShowSubTaskDialog(false)}
            >
                <div className="p-4">
                    <InputText
                        value={subTaskText}
                        onChange={(e) => setSubTaskText(e.target.value)}
                        className="w-full p-2 border rounded"
                        placeholder="Enter sub-task title"
                    />
                    <Button
                        label="Add"
                        className="mt-4 p-button-primary"
                        onClick={addSubTask}
                    />
                </div>
            </Dialog> */}
        </div>
    );
};

export default IssueDetails;
