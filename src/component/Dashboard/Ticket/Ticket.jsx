import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import CreateTicket from "./CreateTicket";

const Ticket = () => {
    const [menuVisible, setMenuVisible] = useState(null);
    const menuRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");

    const [tickets, setTickets] = useState([
        {
            id: 1,
            sno: 1,
            ticketNo: "TKT001",
            ticketSubject: "Login Issue",
            createdBy: "Zohaib",
            priority: "High",
            status: "Open",
            action: "View",
        },
        {
            id: 2,
            sno: 2,
            ticketNo: "TKT002",
            ticketSubject: "Payment Failure",
            createdBy: "Zohaib",
            priority: "Medium",
            status: "Pending",
            action: "View",
        },
        {
            id: 3,
            sno: 3,
            ticketNo: "TKT003",
            ticketSubject: "Account Locked",
            createdBy: "Zohaib",
            priority: "Low",
            status: "Resolved",
            action: "View",
        },
        {
            id: 4,
            sno: 4,
            ticketNo: "TKT004",
            ticketSubject: "Feature Requestaaaaaaaaaaaaaaasdfghjk",
            createdBy: "Zohaib",
            priority: "High",
            status: "Open",
            action: "View",
        },
        {
            id: 5,
            sno: 5,
            ticketNo: "TKT005",
            ticketSubject: "Bug Report",
            createdBy: "Zohaib",
            priority: "Medium",
            status: "Closed",
            action: "View",
        },
        {
            id: 6,
            sno: 6,
            ticketNo: "TKT006",
            ticketSubject: "Performance Issue",
            createdBy: "Zohaib",
            priority: "Low",
            status: "Resolved",
            action: "View",
        },
        {
            id: 7,
            sno: 7,
            ticketNo: "TKT007",
            ticketSubject: "UI Bug",
            createdBy: "Mahesh",
            priority: "High",
            status: "Open",
            action: "View",
        },
        {
            id: 8,
            sno: 8,
            ticketNo: "TKT008",
            ticketSubject: "API Failure",
            createdBy: "Mahesh",
            priority: "Medium",
            status: "Pending",
            action: "View",
        },
        {
            id: 9,
            sno: 9,
            ticketNo: "TKT009",
            ticketSubject: "Database Error",
            createdBy: "Zohaib",
            priority: "Low",
            status: "Resolved",
            action: "View",
        },
        {
            id: 10,
            sno: 10,
            ticketNo: "TKT010",
            ticketSubject: "Security Issue",
            createdBy: "Zohaib",
            priority: "High",
            status: "Open",
            action: "View",
        },
    ]);
    const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
    const [filteredTickets, setFilteredTickets] = useState(tickets);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);

        const filtered = tickets.filter(
            (ticket) =>
                ticket.ticketNo.toLowerCase().includes(term) ||
                ticket.ticketSubject.toLowerCase().includes(term) ||
                ticket.createdBy.toLowerCase().includes(term) ||
                ticket.priority.toLowerCase().includes(term) ||
                ticket.status.toLowerCase().includes(term)
        );

        setFilteredTickets(filtered);
    };

    useEffect(() => {
        setFilteredTickets(tickets);
    }, [tickets]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuVisible(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const statusTemplate = (rowData) => {
        let statusColor;
        switch (rowData.status) {
            case "Open":
                statusColor = "bg-red-200 text-blue-800";
                break;
            case "Pending":
                statusColor = "bg-yellow-200 text-yellow-800";
                break;
            case "Resolved":
                statusColor = "bg-green-100 text-green-800";
                break;
            case "Closed":
                statusColor = "bg-green-400 text-green-800";
                break;
            default:
                statusColor = "bg-gray-100 text-gray-800";
        }

        return (
            <span
                className={`px-2 py-1 rounded-md text-sm w-[120px] flex items-center justify-center ${statusColor}`}
            >
                {rowData.status}
            </span>
        );
    };

    const truncateText = (text, maxLength) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    const ticketNoTemplate = (rowData) => {
        const truncatedText = truncateText(rowData.ticketNo, 10);
        return (
            <span className="truncate cursor-default" title={rowData.ticketNo}>
                {truncatedText}
            </span>
        );
    };

    const ticketSubjectTemplate = (rowData) => {
        const truncatedText = truncateText(rowData.ticketSubject, 20);
        return (
            <span
                className="truncate cursor-pointer"
                title={rowData.ticketSubject}
            >
                {truncatedText}
            </span>
        );
    };

    return (
        <>
            <ConfirmDialog />

            <div className="p-6 bg-gray-100 relative">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {[
                        "Total Tickets",
                        "Open Tickets",
                        "Pending Tickets",
                        "Resolved Tickets",
                        "Closed Tickets",
                    ].map((title, index) => (
                        <Card
                            key={index}
                            className="flex items-center justify-between shadow-md gap-4 w-full h-26"
                        >
                            <div>
                                <p className="font-bold text-gray-600 ml-3 text-sm mb-6">
                                    {title}
                                </p>
                                <p className="text-md font-bold ml-3 text-blue-500">
                                    0
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>
                <div className="flex justify-between">
                    <div className="mb-4">
                        <Button
                            icon="pi pi-plus"
                            label="Create Ticket"
                            severity="primary"
                            className="md:w-42 h-10"
                            size="small"
                            onClick={() => setShowCreateTicketModal(true)}
                        />
                    </div>
                    <div className="flex flex-wrap items-start">
                        <IconField iconPosition="left" className="h-10">
                            <InputIcon className="pi pi-search h-10" />
                            <InputText
                                placeholder="Search"
                                className="h-10 w-full md:w-auto"
                                value={searchTerm}
                                onChange={handleSearch}
                            />
                        </IconField>
                    </div>
                </div>
                <div className="card">
                    <DataTable
                        value={filteredTickets}
                        dataKey="id"
                        paginator
                        size="normal"
                        removableSort
                        rows={10}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown "
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        className="shadow-md text-sm"
                    >
                        <Column
                            field="ticketNo"
                            header="Ticket No"
                            body={ticketNoTemplate}
                        />
                        <Column
                            field="ticketSubject"
                            header="Ticket Subject"
                            body={ticketSubjectTemplate}
                        />
                        <Column field="createdBy" header="Created By" />
                        <Column field="priority" header="Priority" />
                        <Column
                            field="status"
                            header="Status"
                            body={statusTemplate}
                        />
                        <Column
                            header="Action"
                            body={(rowData) => (
                                <div className="flex gap-3 items-center">
                                    <button>
                                        <i className="pi pi-eye text-blue-500 cursor-pointer"></i>
                                    </button>
                                    <button>
                                        <i className="pi pi-pen-to-square text-green-500 cursor-pointer"></i>
                                    </button>
                                    <button>
                                        <i className="pi pi-trash text-red-500 cursor-pointer"></i>
                                    </button>
                                </div>
                            )}
                        />
                    </DataTable>
                </div>

                <Dialog
                    header="Create Ticket"
                    visible={showCreateTicketModal}
                    style={{ width: "75vw" }}
                    onHide={() => setShowCreateTicketModal(false)}
                    modal
                    className="p-fluid"
                >
                    <CreateTicket
                        onHide={() => setShowCreateTicketModal(false)}
                    />
                </Dialog>
            </div>
        </>
    );
};

export default Ticket;
