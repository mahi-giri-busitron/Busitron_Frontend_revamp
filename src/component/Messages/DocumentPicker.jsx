import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToggleDocumentModal } from "../../redux/fileSlice";
import Dropzone from "dropzone";
import "dropzone/dist/dropzone.css";
import { sendDirectMessage } from "../../socket/socketConnection";
import { uploadToS3 } from "../../utils/aws";

export default function DocumentPicker() {
    const modalRef = useRef(null);
    const dropzoneRef = useRef(null);
    const formRef = useRef(null);
    const dispatch = useDispatch();

    const { currentConversation } = useSelector((state) => state.chat);
    const { currentUser } = useSelector((state) => state.user);
    const { doc } = useSelector((state) => state.file.modals);

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [message, setMessage] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        Dropzone.autoDiscover = false;

        if (!dropzoneRef.current && formRef.current) {
            dropzoneRef.current = new Dropzone(formRef.current, {
                url: "/file/post",
                acceptedFiles:
                    ".pdf,.ppt,.doc,.docx,.xls,.xlsx,.txt,.csv,.zip,.rar,.7z,.tar,.gz,.xml,.json,.html,.css,.js,.ts,.md,.log,.yaml,.yml",
                maxFilesize: 64,
                autoProcessQueue: false,
                addRemoveLinks: true,
                uploadMultiple: true,
                maxFiles: 8,
            });

            dropzoneRef.current.on("addedfile", () => {
                setSelectedFiles([...dropzoneRef.current.files]);
            });

            dropzoneRef.current.on("maxfilesexceeded", (file) => {
                dropzoneRef.current.removeFile(file);
            });
        }

        return () => {
            if (dropzoneRef.current) {
                dropzoneRef.current.off("addedfile");
                dropzoneRef.current.off("maxfilesexceeded");
                dropzoneRef.current.destroy();
                dropzoneRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        const keyHandler = ({ keyCode }) => {
            if (!doc || keyCode !== 27) return;
            dispatch(ToggleDocumentModal(false));
        };

        document.addEventListener("keydown", keyHandler);
        return () => document.removeEventListener("keydown", keyHandler);
    }, [doc, dispatch]);

    const uploadFilesToAws = async () => {
        if (selectedFiles.length === 0) return [];

        try {
            setIsUploading(true);
            const uploadPromises = selectedFiles.map(async (file) => {
                const formData = new FormData();
                formData.append("media", file);

                const fileUrl = await uploadToS3(formData);
                return {
                    name: file.name,
                    size: (file.size / (1024 * 1024)).toFixed(2),
                    url: fileUrl.files[0],
                };
            });

            const uploadedFiles = await Promise.all(uploadPromises);
            return uploadedFiles;
        } catch (error) {
            console.error("File upload failed:", error.message);
            return [];
        } finally {
            setIsUploading(false);
        }
    };

    const handleSendMessage = async () => {
        if (selectedFiles.length === 0) {
            alert("Please select at least one file!");
            return;
        }

        const uploadedUrls = await uploadFilesToAws();
        if (uploadedUrls.length === 0) {
            alert("File upload failed!");
            return;
        }

        const data = {
            conversationId: currentConversation,
            message: {
                author: currentUser.data._id,
                type: "Document",
                content: message,
                document: uploadedUrls[0],
            },
        };

        sendDirectMessage(data);
        setMessage("");
        setSelectedFiles([]);
        if (dropzoneRef.current) {
            dropzoneRef.current.removeAllFiles();
        }
        dispatch(ToggleDocumentModal(false));
    };

    return (
        <div
            className={`fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/90 px-4 py-5 ${
                doc ? "block" : "hidden"
            }`}
        >
            <div
                ref={modalRef}
                className="w-full max-w-2xl rounded-lg bg-white dark:bg-boxdark px-8 py-6"
            >
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-black dark:text-white">
                        Choose Documents
                    </h2>
                    <button
                        onClick={() => {
                            setSelectedFiles([]);
                            if (dropzoneRef.current) {
                                dropzoneRef.current.removeAllFiles();
                            }
                            dispatch(ToggleDocumentModal(false));
                        }}
                    >
                        <i className="pi pi-times text-xl"></i>
                    </button>
                </div>

                <div className="max-h-80 overflow-y-auto">
                    <div className="border border-stroke bg-white shadow-default rounded-lg p-4">
                        <form
                            ref={formRef}
                            id="upload"
                            className="dropzone border-dashed bg-gray hover:border-primary rounded-md"
                        >
                            <div className="dz-message text-center">
                                <div className="flex flex-col items-center justify-center">
                                    <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white shadow-md">
                                        <i className="pi pi-cloud-upload text-xl"></i>
                                    </div>
                                    <span className="font-medium text-black">
                                        Drop files here to upload
                                    </span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {isUploading && (
                    <p className="text-center text-sm text-gray-500 mt-2">
                        Uploading files...
                    </p>
                )}

                <div className="flex items-center justify-between mt-4 space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") handleSendMessage();
                        }}
                        className="border rounded-lg w-full p-2 border-stroke dark:border-strokedark bg-transparent"
                        placeholder="Type your message..."
                    />
                    <button
                        onClick={handleSendMessage}
                        className="p-2.5 border border-primary rounded-lg bg-primary hover:bg-opacity-90"
                    >
                        <i className="pi pi-send"></i>
                    </button>
                </div>
            </div>
        </div>
    );
}
