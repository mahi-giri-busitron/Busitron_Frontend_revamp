import React, { useState, useRef } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import toast from "react-hot-toast";

export default function FileManager() {
    const [files, setFiles] = useState([]);
    const [dialogVisible, setDialogVisible] = useState(false);
    const fileUploadRef = useRef(null);

    const openDialog = () => setDialogVisible(true);

    const handleUpload = (event) => {
        const uploadedFiles = event.files;
        setFiles((prev) => [...prev, ...uploadedFiles]);
        setDialogVisible(false);
        toast.success("Files uploaded successfully!");
    };

    const downloadFile = (file) => {
        const link = document.createElement("a");
        link.href = file.objectURL || URL.createObjectURL(file);
        link.download = file.name;
        link.click();
    };

    const confirmDelete = (file) => {
        confirmDialog({
            message: `Are you sure you want to delete "${file.name}"?`,
            header: "Confirm Deletion",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleDeleteFile(file),
            reject: () => {}, // Ensures dialog closes if rejected
        });
    };

    const handleDeleteFile = (file) => {
        setFiles((prev) => prev.filter((f) => f.name !== file.name));
        toast.success(`Deleted file: ${file.name}`);
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
            <ConfirmDialog />
            <Button label="Add Files" className="h-10" icon="pi pi-plus" onClick={openDialog} />

            <div className="py-4">
                <DataTable value={files} emptyMessage="No files added yet.">
                    <Column field="name" header="File Name" />
                    <Column header="Actions" body={actionBodyTemplate} />
                </DataTable>
            </div>

            {/* Upload Dialog */}
            <Dialog
                header="Upload Files"
                visible={dialogVisible}
                onHide={() => setDialogVisible(false)}
                style={{ width: "40vw" }}
            >
                <FileUpload
                    ref={fileUploadRef}
                    name="files[]"
                    multiple
                    accept="image/*,application/pdf,application/msword"
                    customUpload
                    uploadHandler={handleUpload}
                    emptyTemplate={
                        <p className="m-0">
                            Drag and drop files here to upload (Max 5 files).
                        </p>
                    }
                />
            </Dialog>
        </div>
    );
}
