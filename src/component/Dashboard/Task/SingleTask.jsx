import { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { FileUpload } from "primereact/fileupload";
import { ScrollPanel } from "primereact/scrollpanel";
import { TabMenu } from "primereact/tabmenu";
import "quill/dist/quill.snow.css";
import CommentSection from "./SingleTasks/Comments";
import IssueDetailsAccordion from "./SingleTasks/DetailsAccordian";
import WorkLogSection from "./SingleTasks/WorkLog";
import HistorySection from "./SingleTasks/History";
import DatesSection from "./SingleTasks/DatesAccordian";
import { Card } from "primereact/card";
import { useLocation } from "react-router-dom";

const IssueDetails = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDialogVisible, setDialogVisible] = useState(false);

    const [activeIndex, setActiveIndex] = useState(0);
    const location = useLocation();
    const taskData = location.state;

    useEffect(() => {
        if (taskData) {
            setUploadedFiles(taskData?.attachments);
        }
    }, []);

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
        assignedTo: taskData?.assignedTo.name,
        assignedBy: taskData?.assignedBy.name,
        status: {
            label: taskData?.status,
            icon: "pi pi-pen-to-square",
            color: "text-green-500",
        },
        priority: {
            label: taskData?.priority,
            icon: "pi pi-exclamation-triangle",
            color: "text-red-500",
        },
        labels: {
            label: taskData?.label,
            icon: "pi pi-tag",
            color: "text-blue-500 cursor-pointer",
        },
    };

    const DateDetails = {
        Dates: {
            Due: { label: taskData?.dueDate },
            Created: { label: "3 days ago" },
            Updated: { label: "7 hours ago" },
            "Start Date": { label: taskData?.startDate },
            "End Date": { label: taskData?.endDate },
        },
    };

    return (
        <div className="min-h-screen bg-gray-100 p-2  text-gray-600 ">
            <div className="max-w-full flex justify-center items-start mx-auto bg-white shadow-lg rounded-lg p-4  gap-6">
                <div className="space-y-4 w-3/5 max-h-screen overflow-y-auto pr-4">
                    <p className="text-xs text-blue-500">{taskData?.taskID}</p>
                    <h1 className="text-2xl font-semibold text-gray-600 ">
                        {taskData?.title}
                    </h1>

                    <div className="flex flex-wrap gap-3 mt-3 items-center ">
                        {uploadedFiles.length > 0 && (
                            <Button
                                label={`View Attachments (${uploadedFiles.length})`}
                                icon="pi pi-folder-open"
                                className="p-button-text p-button-secondary p-button-sm"
                                onClick={() => setDialogVisible(true)}
                            />
                        )}
                    </div>

                    <div className="mt-7">
                        <h2 className="text-lg font-medium mt-2">
                            Description
                        </h2>
                        <div className="descrip">
                            <Card className="h-20 overflow-auto p-0 ">
                                <p className="m-0 ">
                                    {taskData.description
                                        ? taskData.description
                                        : "No description provided."}
                                </p>
                            </Card>
                        </div>
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
                                style={{ overflowX: "auto" }}
                            />
                        </div>
                        <div className="mt-4 rounded-lg  bg-white shadow-md ">
                            {activeIndex === 0 && (
                                <CommentSection
                                    showComments={true}
                                    taskData={taskData}
                                />
                            )}
                            {activeIndex === 1 && (
                                <WorkLogSection
                                    showWorkLog={true}
                                    workLog={workLogData}
                                    taskData={taskData}
                                />
                            )}
                            {activeIndex === 2 && (
                                <HistorySection
                                    showHistory={true}
                                    history={historyData}
                                    taskData={taskData}
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
                            taskData={taskData}
                        />
                    </div>
                </div>
            </div>

            {/* File Viewer Dialog */}
            <Dialog
                header="Uploaded Files"
                visible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
                className="w-full max-w-2xl"
            >
                {uploadedFiles.length > 0 ? (
                    <ScrollPanel style={{ height: "500px" }}>
                        <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-2">
                            {uploadedFiles.map((file, index) => {
                                if (!file) return null;

                                console.log(file);

                                const fileExtension = file.includes(".")
                                    ? file.split(".").pop().toLowerCase()
                                    : "";

                                const isImage = [
                                    "jpg",
                                    "jpeg",
                                    "png",
                                    "gif",
                                    "webp",
                                ].includes(fileExtension);
                                const isPDF = fileExtension === "pdf";

                                const fileName = file
                                    .split("/")
                                    .pop()
                                    .split("-")
                                    .slice(1)
                                    .join("-");
                                console.log(fileName);

                                return (
                                    <div
                                        key={index}
                                        className="flex flex-col items-center bg-gray-100 p-2 rounded-lg shadow-md"
                                    >
                                        {isImage ? (
                                            <a href={file}>
                                                <div className="flex flex-col justify-center items-center">
                                                    <img
                                                        src={file}
                                                        alt={file
                                                            .split("/")
                                                            .pop()
                                                            .split("-")
                                                            .slice(1)
                                                            .join("-")}
                                                        className="w-24 h-24 object-cover rounded-md mb-2"
                                                    />
                                                    <span className="text-center text-black">
                                                        {fileName}
                                                    </span>
                                                </div>
                                            </a>
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
                                    </div>
                                );
                            })}
                        </div>
                    </ScrollPanel>
                ) : (
                    <p className="text-center text-gray-500">
                        No files uploaded yet.
                    </p>
                )}
            </Dialog>
        </div>
    );
};

export default IssueDetails;
