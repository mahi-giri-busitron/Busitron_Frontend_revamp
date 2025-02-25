import { useState } from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

const FileUploadModal = () => {
    const [isOpen, setIsOpen] = useState(true);
  
    const handleFileUpload = () => {
        document.getElementById("fileInput").click();
    };
  
    return (
        <Dialog
            header={<span className="text-blue-700 font-semibold">Files</span>}
            visible={isOpen}
            onHide={() => setIsOpen(false)}
            style={{ width: "50vw", backgroundColor: "rgba(255, 255, 255, 0.8)" }}
            modal
        >
            <input 
                type="file" 
                id="fileInput" 
                style={{ display: "none" }}
            />
            <div className="flex flex-col items-center p-6 text-gray-700">
                <Button
                    icon="pi pi-plus"
                    label="Upload Files"
                    className="p-button-outlined p-button-secondary"
                    onClick={handleFileUpload}
                />
            </div>
        </Dialog>
    );
};

export default FileUploadModal;
