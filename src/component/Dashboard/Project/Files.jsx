import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";
import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";

export default function FileManager({ projectId }) {
    const [files, setFiles] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const fileUploadRef = useRef(null);
    const { roles = [] } = useSelector((store) => store.rolesPermissions) || {};
    const { currentUser } = useSelector((store) => store.user);
    const userRole = currentUser?.data?.role;
    const userPermissions =
        roles.find((r) => r.role === userRole)?.permissions?.projects || {};

    const canView = userRole === "SuperAdmin" || userPermissions.view;
    const canAdd = userRole === "SuperAdmin" || userPermissions.add;
    const canEdit = userRole === "SuperAdmin" || userPermissions.update;
    const canDelete = userRole === "SuperAdmin" || userPermissions.delete;

    useEffect(() => {
        if (!projectId) return;
        const fetchFiles = async () => {
            try {
                const { data } = await axios.get(
                    `/api/v1/project/projects/${projectId}`
                );
                setFiles(data.data.attachments || []);
            } catch (error) {
                toast.error("Failed to load files.");
            }
        };
        fetchFiles();
    }, [projectId]);

    const openDialog = () => setDialogVisible(true);

    const handleUpload = async (event) => {
        const formData = new FormData();
        event.files.forEach((file) => formData.append("attachments", file)); // FIXED: Changed 'files' to 'attachments'
        try {
            const apiResponse = await axios.post(
                `/api/v1/project/projects/${projectId}/files`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (apiResponse.status === 200) {
                setFiles(
                    apiResponse.data.data.map((file) => ({
                        ...file,
                        link: file.startsWith("https") ? file : `${file}`,
                    }))
                );
                setDialogVisible(false);
                toast.success("Files uploaded successfully!");
            }
        } catch (error) {
            toast.error("File upload failed.");
        } finally {
        }
    };

    const downloadFile = async (file) => {
        if (!file?.link) {
            toast.error("Invalid file link");
            return;
        }

        try {
            const response = await fetch(file.link);
            const blob = await response.blob();

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = file.filename || "download";

            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            toast.error(error.response ? error.response.data : error.message);
        }
    };

    const confirmDelete = (file) => {
        confirmDialog({
            message: `Are you sure you want to delete "${file.filename}"?`,
            header: "Confirm Deletion",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleDeleteFile(file),
        });
    };

    const handleDeleteFile = async (file) => {
        try {
            await axios.delete(
                `/api/v1/project/projects/${projectId}/files/${file.filename}`
            );
            setFiles((prev) =>
                prev.filter((f) => f.filename !== file.filename)
            );
            toast.success(`Deleted file: ${file.filename}`);
        } catch (error) {
            toast.error("File deletion failed.");
        }
    };

    const fileNameTemplate = (rowData) => {
        const fileLink = rowData?.link ? rowData.link : "#";
        const fileName = fileLink
            .split("/")
            .pop()
            .split("-")
            .slice(1)
            .join("-");

        return (
            <a
                href={fileLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                {fileName}
            </a>
        );
    };

    const actionBodyTemplate = (rowData) => (
        <div className="flex gap-2">
            <Button
                icon="pi pi-download"
                onClick={() => downloadFile(rowData)}
                className="p-button-text p-button-sm"
            />
            <Button
                icon="pi pi-trash"
                onClick={() => confirmDelete(rowData)}
                className="p-button-danger p-button-text p-button-sm"
            />
        </div>
    );
    return (
        <div className="py-4">
            <div className="my-4 mx-5">
                <ConfirmDialog />
                <div className="flex gap-2 flex-wrap md:flex-nowrap">
                    {canAdd && (
                        <Button
                            label="Add Files"
                            icon="pi pi-plus"
                            onClick={openDialog}
                        />
                    )}
                </div>
                <div className="py-4">
                    <DataTable value={files} emptyMessage="No files added yet.">
                        <Column
                            field="filename"
                            header="File Name"
                            body={fileNameTemplate}
                        />
                        <Column header="Actions" body={actionBodyTemplate} />
                    </DataTable>
                </div>

                <Dialog
                    header="Upload Files"
                    visible={dialogVisible}
                    onHide={() => setDialogVisible(false)}
                    style={{ width: "40vw" }}
                >
                    <FileUpload
                        ref={fileUploadRef}
                        name="attachments[]"
                        multiple
                        accept="image/*,application/pdf,application/msword"
                        customUpload
                        uploadHandler={handleUpload}
                        emptyTemplate={
                            <p className="m-0">
                                Drag and drop files here to upload (Max 5
                                files).
                            </p>
                        }
                    />
                </Dialog>
            </div>
        </div>
    );
}
