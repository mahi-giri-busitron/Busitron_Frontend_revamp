import React, {
    useState,
    useEffect,
    useRef,
    useCallback,
    useMemo,
} from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Card } from "primereact/card";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Dialog } from "primereact/dialog";
import { ConfirmDialog } from "primereact/confirmdialog";
import CreateTicket from "./CreateTicket";
import axios from "axios";
import { debounce } from "lodash";

const Ticket = () => {
    const menuRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tickets, setTickets] = useState([]);
    const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);

    // Fetch Tickets
    const fetchTickets = useCallback(async () => {
        try {
            const response = await axios.get("/api/v1/ticket/getAllTickets");
            setTickets(response.data.data);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets]);

    // Handle Search with Debounce
    const handleSearch = useCallback(
        debounce((term) => {
            setSearchTerm(term.toLowerCase());
        }, 300),
        []
    );

    // Filter Tickets
    const filteredTickets = useMemo(() => {
        if (!searchTerm) return tickets;
        return tickets.filter(
            ({ ticketID, ticketSubject, assignedBy, priority, status }) =>
                ticketID.toLowerCase().includes(searchTerm) ||
                ticketSubject.toLowerCase().includes(searchTerm) ||
                assignedBy.name.toLowerCase().includes(searchTerm) ||
                priority.toLowerCase().includes(searchTerm) ||
                status.toLowerCase().includes(searchTerm)
        );
    }, [searchTerm, tickets]);

    const handleCreateTicket = () => {
        setSelectedTicket(null); // No ticket data for creation
        setShowCreateTicketModal(true);
    };

    const handleEditTicket = (ticket) => {
        setSelectedTicket(ticket); // Pass ticket data for editing
        setShowCreateTicketModal(true);
    };

    // Status Styling
    const statusTemplate = ({ status }) => {
        const statusClasses = {
            Open: "bg-red-200 text-blue-800",
            Pending: "bg-yellow-200 text-yellow-800",
            Resolved: "bg-green-100 text-green-800",
            Closed: "bg-green-400 text-green-800",
            Complete: "bg-blue-200 text-blue-800",
        };
        return (
            <span
                className={`px-2 py-1 rounded-md text-sm w-[120px] flex items-center justify-center ${
                    statusClasses[status] || "bg-gray-100 text-gray-800"
                }`}
            >
                {status}
            </span>
        );
    };

    const ticketSubjectTemplate = (rowData) => {
        const cleanedText = rowData.ticketSubject.replace(/(^"|"$)/g, ""); // Remove leading & trailing quotes
        const truncatedText = truncateText(cleanedText, 20);

        return (
            <span className="truncate cursor-pointer" title={cleanedText}>
                {truncatedText}
            </span>
        );
    };

    // Truncate Text
    const truncateText = (text, maxLength) =>
        text?.length > maxLength ? `${text.substring(0, maxLength)}...` : text;

    return (
        <>
            <ConfirmDialog />
            <div className="p-6 bg-gray-100">
                {/* Statistics Cards */}
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

                {/* Top Bar */}
                <div className="flex justify-between my-2">
                    <Button
                        icon="pi pi-plus"
                        label="Create Ticket"
                        severity="primary"
                        className="md:w-42 h-10"
                        size="small"
                        onClick={handleCreateTicket} // Call handleCreateTicket
                    />
                    <IconField iconPosition="left" className="h-10">
                        <InputIcon className="pi pi-search h-10" />
                        <InputText
                            placeholder="Search"
                            className="h-10 w-full md:w-auto"
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </IconField>
                </div>

                {/* Data Table */}
                <div className="card">
                    <DataTable
                        value={filteredTickets}
                        dataKey="_id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 15, 20]}
                        paginatorTemplate="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                        currentPageReportTemplate="{first} to {last} of {totalRecords}"
                        className="shadow-md text-sm"
                    >
                        <Column
                            field="ticketID"
                            header="Ticket No"
                            body={({ ticketID }) => (
                                <span title={ticketID}>{ticketID}</span>
                            )}
                        />
                        <Column
                            field="ticketSubject"
                            header="Ticket Subject"
                            body={ticketSubjectTemplate}
                        />
                        <Column field="assignedBy.name" header="Created By" />
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
                                    <button
                                        onClick={() =>
                                            handleEditTicket(rowData)
                                        }
                                    >
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

                {/* Create Ticket Modal */}
                <Dialog
                    header={selectedTicket ? "Edit Ticket" : "Create Ticket"}
                    visible={showCreateTicketModal}
                    style={{ width: "75vw" }}
                    onHide={() => setShowCreateTicketModal(false)}
                    modal
                    className="p-fluid"
                >
                    <CreateTicket
                        ticketData={selectedTicket} // Pass data if editing
                        onHide={() => setShowCreateTicketModal(false)}
                    />
                </Dialog>
            </div>
        </>
    );
};

export default Ticket;
