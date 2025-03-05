import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";
import { Dialog } from "primereact/dialog";
import { ScrollPanel } from "primereact/scrollpanel";
import moment from "moment/moment";
const SingleTicket = () => {
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [isDialogVisible, setDialogVisible] = useState(false);
    const location = useLocation();
    const taskData = location.state;
    console.log(taskData);

    useEffect(() => {
        if (taskData) {
            setUploadedFiles(taskData?.attachments);
        }
    }, []);

    console.log(uploadedFiles);
    

    return (
        <div className="p-4 h-full text-start">
            <div className="mx-auto">
                <div className="space-y-6">
                    <Card className="shadow-lg">
                        <div className="px-4 py-4 flex flex-col md:flex-row gap-6">
                            <div
                                className="w-full md:w-1/2 overflow-y-auto"
                                style={{ maxHeight: "70vh" }}
                            >
                                <div className="flex flex-wrap gap-3 mt-3 mb-8 items-center">
                                    {uploadedFiles.length > 0 && (
                                        <Button
                                            label={`View Attachments (${uploadedFiles.length})`}
                                            icon="pi pi-folder-open"
                                            className="p-button-text p-button-secondary p-button-sm w-full md:w-auto"
                                            onClick={() =>
                                                setDialogVisible(true)
                                            }
                                        />
                                    )}
                                </div>
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        Ticket Subject
                                    </h2>
                                    <div className="p-4 bg-gray-50 rounded">
                                        <p>{taskData?.ticketSubject}</p>
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        Description
                                    </h2>
                                    <div className="p-4 bg-gray-50 rounded">
                                        <p>
                                            {taskData?.description.replace(
                                                /<\/?[^>]+(>|$)/g,
                                                ""
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 overflow-y-auto"
                                style={{ maxHeight: "" }}
                            >
                                <Accordion
                                    className="w-full mb-4"
                                    activeIndex={0}
                                >
                                    <AccordionTab header="Ticket Details">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Requester Name:
                                                    </strong>
                                                </span>
                                                <span>
                                                    {taskData?.userId.name}
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>Ticket Num:</strong>
                                                </span>
                                                <span>
                                                    {taskData?.ticketID}
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Assign Team:
                                                    </strong>
                                                </span>
                                                <span>
                                                    {taskData?.assignTeam}
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>Status:</strong>
                                                </span>
                                                <span>{taskData?.status}</span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>Priority:</strong>
                                                </span>
                                                <span>
                                                    {taskData?.priority}
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                                <Accordion className="w-full" activeIndex={0}>
                                    <AccordionTab header="Dates">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Created Date:
                                                    </strong>
                                                </span>
                                                <span>
                                                    {moment(
                                                        taskData?.createdDate
                                                    )
                                                        .format("DD-MM-YYYY")
                                                        .toString()}
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Updated Date:
                                                    </strong>
                                                </span>
                                                <span>
                                                    {moment(
                                                        taskData?.updatedDate
                                                    )
                                                        .format("DD-MM-YYYY")
                                                        .toString()}
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Dialog
                header="Uploaded Files"
                visible={isDialogVisible}
                onHide={() => setDialogVisible(false)}
                className="w-full max-w-lg"
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
export default SingleTicket;
