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
import DeleteModal from "../../../shared/DeleteModal";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Ticket = () => {
    const menuRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [tickets, setTickets] = useState([]);
    const [originalTickets, setOriginalTickets] = useState([]);
    const [shouldReload, setShouldReload] = useState(false);
    const [showCreateTicketModal, setShowCreateTicketModal] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [confirmVisible, setConfirmVisible] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [ticketsCount, setTicketCount] = useState({
        Total_Tickets: 0,
        Open_Tickets: 0,
        Pending_Tickets: 0,
        Resolved_Tickets: 0,
        Closed_Tickets: 0,
    });

    const { currentUser } = useSelector((store) => store.user);
    const navigate = useNavigate();

    // Fetch Tickets
    const fetchTickets = useCallback(async () => {
        try {
            const response = await axios.get("/api/v1/ticket/getAllTickets");
            setTickets(response.data.data);
            setOriginalTickets(response.data.data);
            const counts = {
                Total_Tickets: response.data.data.length,
                Open_Tickets: 0,
                Pending_Tickets: 0,
                Resolved_Tickets: 0,
                Closed_Tickets: 0,
            };

            response.data.data.forEach((each) => {
                if (each.status === "Open") counts.Open_Tickets++;
                else if (each.status === "Pending") counts.Pending_Tickets++;
                else if (each.status === "Resolved") counts.Resolved_Tickets++;
                else if (each.status === "Closed") counts.Closed_Tickets++;
            });

            setTicketCount(counts);
        } catch (error) {
            console.error("Error fetching tasks:", error);
        }
    }, []);

    useEffect(() => {
        fetchTickets();
    }, [fetchTickets, shouldReload]);

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
        setSelectedTicket(null);
        setShowCreateTicketModal(true);
    };

    const handleEditTicket = (ticket) => {
        setSelectedTicket(ticket);
        setShowCreateTicketModal(true);
    };

    const handleDelete = async () => {
        setConfirmVisible(false);
        const response = await axios.delete(
            `/api/v1/ticket/deleteTicketByID/${deleteId}`
        );

        if (response?.data.statusCode === 200) {
            setTickets(tickets.filter((ticket) => ticket._id !== deleteId));
            toast.success("Ticket deleted successfully!");
        } else {
            toast.error("Failed to delete ticket!");
        }
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
            <span
                className="truncate cursor-pointer hover:text-blue-600"
                onClick={() => {
                    navigate(`/dashboard/ticket/${rowData._id}`, {
                        state: rowData,
                    });
                }}
                title={cleanedText}
            >
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
                        {
                            name: "Total Tickets",
                            value: ticketsCount?.Total_Tickets || 0,
                        },
                        {
                            name: "Open Tickets",
                            value: ticketsCount?.Open_Tickets || 0,
                        },
                        {
                            name: "Pending Tickets",
                            value: ticketsCount?.Pending_Tickets || 0,
                        },
                        {
                            name: "Resolved Tickets",
                            value: ticketsCount?.Resolved_Tickets || 0,
                        },
                        {
                            name: "Closed Tickets",
                            value: ticketsCount?.Closed_Tickets || 0,
                        },
                    ].map((title, index) => (
                        <Card
                            key={index}
                            className="flex items-center justify-between shadow-md gap-4 w-full h-26"
                        >
                            <div>
                                <p className="font-bold text-gray-600 ml-3 text-sm mb-6">
                                    {title?.name}
                                </p>
                                <p className="text-md font-bold ml-3 text-blue-500">
                                    {title?.value}
                                </p>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Top Bar */}
                <div className="flex justify-between my-2 flex-wrap  gap-4">
                    <div className="flex gap-2">
                        <Button
                            icon="pi pi-plus"
                            label="Create Ticket"
                            severity="primary"
                            className=" h-10"
                            size="small"
                            onClick={handleCreateTicket} // Call handleCreateTicket
                        />
                    </div>
                    <div className="w-full md:w-100 ">
                        <IconField iconPosition="left" className="h-10 w-full">
                            <InputIcon className="pi pi-search h-10" />
                            <InputText
                                placeholder="Search"
                                className="h-10 w-full "
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </IconField>
                    </div>
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
                            className="cursor-pointer hover:text-blue-600"
                            body={(rowData) => (
                                <span
                                    title={rowData.ticketID}
                                    onClick={() => {
                                        navigate(
                                            `/dashboard/ticket/${rowData._id}`,
                                            {
                                                state: rowData,
                                            }
                                        );
                                    }}
                                >
                                    {rowData?.ticketID}
                                </span>
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
                                    <button
                                        className="cursor-pointer"
                                        onClick={() =>
                                            navigate(
                                                `/dashboard/ticket/${rowData._id}`,
                                                {
                                                    state: rowData,
                                                }
                                            )
                                        }
                                    >
                                        <i className="pi pi-eye text-blue-500 cursor-pointer"></i>
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleEditTicket(rowData)
                                        }
                                    >
                                        <i className="pi pi-pen-to-square text-green-500 cursor-pointer"></i>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setConfirmVisible(true);
                                            setDeleteId(rowData._id);
                                        }}
                                    >
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
                        setShouldReload={setShouldReload}
                    />
                </Dialog>
                <DeleteModal
                    visible={confirmVisible}
                    setVisible={setConfirmVisible}
                    handleDelete={handleDelete}
                />
            </div>
        </>
    );
};

export default Ticket;
