import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dropdown } from "primereact/dropdown";
import { Dialog } from "primereact/dialog";
import CreateTicket from "./CreateTicket.jsx";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

const Ticket = () => {
    const [rowClick, setRowClick] = useState(false);
    const [selectedTickets, setSelectedTickets] = useState([]);
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
            ticketNo: "TKT003345678999999999999999999",
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
    const [showSidebar, setShowSidebar] = useState(false);
    const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
    const [filteredTickets, setFilteredTickets] = useState(tickets);

    const priorities = [
        { label: "All", value: "All" },
        { label: "High", value: "High" },
        { label: "Medium", value: "Medium" },
        { label: "Low", value: "Low" },
    ];

    const channels = [
        { label: "All", value: "All" },
        { label: "Email", value: "Email" },
        { label: "Chat", value: "Chat" },
        { label: "Phone", value: "Phone" },
    ];

    const types = [
        { label: "All", value: "All" },
        { label: "Technical", value: "Technical" },
        { label: "Billing", value: "Billing" },
        { label: "General", value: "General" },
    ];

    // Function to handle search
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
        setFilteredTickets(tickets); // Initialize filteredTickets with all tickets
    }, [tickets]);

    const toggleMenu = (id) => {
        setMenuVisible(menuVisible === id ? null : id);
    };

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

    const actionTemplate = (rowData) => {
        return (
            <div className="relative" ref={menuRef}>
                <Button
                    icon="pi pi-ellipsis-v"
                    className="p-button-text h-1"
                    severity="secondary"
                    size="small"
                    onClick={() => toggleMenu(rowData.id)}
                />

                {menuVisible === rowData.id && (
                    <div className="absolute right-20 w-36 bg-white border shadow-md rounded-md z-10">
                        <ul className="py-1 text-sm text-gray-700">
                            <li
                                className="px-4 py-2 cursor-pointer text-black hover:bg-gray-100 flex items-center"
                                onClick={() =>
                                    alert(`Viewing ${rowData.ticketNo}`)
                                }
                            >
                                <i className="pi pi-eye mr-2"></i>
                                <span>View</span>
                            </li>
                            <li
                                className="px-4 py-2 cursor-pointer text-black hover:bg-gray-100 flex items-center"
                                onClick={() =>
                                    alert(`Deleting ${rowData.ticketNo}`)
                                }
                            >
                                <i className="pi pi-trash mr-2"></i>
                                <span>Delete</span>
                            </li>
                            <li
                                className="px-4 py-2 cursor-pointer text-black hover:bg-gray-100 flex items-center"
                                onClick={() =>
                                    alert(`Editing ${rowData.ticketNo}`)
                                }
                            >
                                <i className="pi pi-user-edit mr-2"></i>
                                <span>Edit</span>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        );
    };

    const statusTemplate = (rowData) => {
        let statusColor;
        switch (rowData.status) {
            case "Open":
                statusColor = "bg-blue-100 text-blue-800";
                break;
            case "Pending":
                statusColor = "bg-orange-100 text-orange-800";
                break;
            case "Closed":
                statusColor = "bg-red-100 text-red-800";
                break;
            case "Resolved":
                statusColor = "bg-green-100 text-green-800";
                break;
            default:
                statusColor = "bg-gray-100 text-gray-800";
        }

        return (
            <span className={`px-2 py-1 rounded-md text-sm ${statusColor}`}>
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

    function handleDelete(id) {
        let modifyData = initialData.filter((taskId) => taskId.taskNo !== id);
        setTableData(modifyData);
    }

    const deleteConfirmation = (id) => {
        confirmDialog({
            message: "Are you sure you want to delete this record?",
            header: "Delete Confirmation",
            icon: "pi pi-info-circle",
            defaultFocus: "reject",
            acceptClassName: "p-button-danger",
            accept: () => handleDelete(id),
            reject: () => console.log("Delete Cancelled"),
        });
    };

    return (
        <>
            <ConfirmDialog />

            <div className="p-6 bg-gray-100 relative">
                <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                    <div className="flex flex-wrap items-start">
                        <IconField iconPosition="left" className="h-10">
                            <InputIcon className="pi pi-search h-10" />
                            <InputText
                                placeholder="Search"
                                className="h-10 w-full md:w-auto"
                                value={searchTerm}
                                onChange={handleSearch} // Add onChange handler
                            />
                        </IconField>
                    </div>
                    <div className="items-end">
                        <Button
                            icon="pi pi-filter-fill"
                            label="Filters"
                            severity="secondary"
                            className="p-button-outlined h-9"
                            size="small"
                            onClick={() => setShowSidebar(!showSidebar)}
                        />
                    </div>
                </div>

                <div
                    className={`fixed top-20 right-0 z-40 w-66 h-screen p-4 overflow-y-auto bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
                        showSidebar ? "translate-x-0" : "translate-x-full"
                    }`}
                >
                    <div className="flex justify-between items-center mb-4">
                        <h5 className="text-base font-semibold text-black uppercase">
                            Filters
                        </h5>
                        <button
                            type="button"
                            onClick={() => setShowSidebar(false)}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="sr-only">Close menu</span>
                        </button>
                    </div>
                    <div className="overflow-y-auto h-[calc(90vh-9rem)]">
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Group
                            </label>
                            <InputText
                                placeholder="Nothing selected"
                                className="w-full md:w-54 h-10"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Agent
                            </label>
                            <InputText
                                placeholder="Nothing selected"
                                className="w-full md:w-54 h-10"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                            </label>
                            <Dropdown
                                options={priorities}
                                placeholder="All"
                                className="w-full md:w-54 h-10 items-center"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Channel Name
                            </label>
                            <Dropdown
                                options={channels}
                                placeholder="All"
                                className="w-full md:w-54 h-10 items-center"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Type
                            </label>
                            <Dropdown
                                options={types}
                                placeholder="All"
                                className="w-full md:w-54 h-10 items-center"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                            </label>
                            <Dropdown
                                options={priorities}
                                placeholder="All"
                                className="w-full md:w-54 h-10 items-center"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Channel Name
                            </label>
                            <Dropdown
                                options={channels}
                                placeholder="All"
                                className="w-full md:w-54 h-10 items-center"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <Button
                            label="Clear"
                            outlined
                            severity="secondary"
                            className="w-24 h-10"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                    {[
                        "Total Tickets",
                        "Closed Tickets",
                        "Open Tickets",
                        "Pending Tickets",
                        "Resolved Tickets",
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

                <div className="card">
                    <DataTable
                        value={filteredTickets}
                        dataKey="id"
                        paginator
                        size="normal"
                        removableSort
                        rows={5}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown "
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        className="shadow-md text-sm"
                        responsiveLayout="scroll"
                    >
                        <Column
                            field="sno"
                            header="S.No"
                            style={{ width: "10%" }}
                        />
                        <Column
                            field="ticketNo"
                            header="Ticket"
                            body={ticketNoTemplate}
                            sortable
                            style={{ width: "15%" }}
                        />
                        <Column
                            field="ticketSubject"
                            header="Ticket Subject"
                            body={ticketSubjectTemplate}
                            style={{ width: "20%" }}
                        />
                        <Column
                            field="createdBy"
                            header="Created By"
                            style={{ width: "15%" }}
                        />
                        <Column
                            field="priority"
                            header="Priority"
                            style={{ width: "15%" }}
                        />
                        <Column
                            field="status"
                            header="Status"
                            body={statusTemplate}
                            style={{ width: "15%" }}
                        />
                        <Column
                            header="Action"
                            body={(rowData) => (
                                <div className="flex gap-2 items-center">
                                    <button
                                        title="View"
                                        className="text-blue-500 hover:text-blue-700 hover:animate-ping"
                                        onClick={() => handleView(rowData)}
                                    >
                                        <i className="pi pi-eye mx-2 cursor-pointer"></i>
                                    </button>
                                    <button
                                        title="Delete"
                                        className="text-red-500 hover:text-red-700 hover:animate-bounce"
                                        onClick={() =>
                                            deleteConfirmation(rowData.taskNo)
                                        }
                                    >
                                        <i className="pi pi-trash cursor-pointer"></i>
                                    </button>
                                </div>
                            )}
                            headerClassName="custom-table-header"
                            style={{ width: "10%" }}
                        />
                    </DataTable>
                </div>

                <Dialog
                    header="Create Ticket"
                    visible={showCreateTicketModal}
                    style={{ width: "90vw" }}
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
