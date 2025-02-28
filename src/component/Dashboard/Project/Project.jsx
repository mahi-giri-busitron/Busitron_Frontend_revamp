import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import CreateProject from "./CreateProject.jsx";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
const projects = [
    {
        id: 1,
        name: "Full-Stack E-Commerce Platform with Payment Gateway Integration Full-Stack E-Commerce Platform with Payment Gateway Integration",
        members: 22,
        startDate: "17-02-2025",
        endDate: "25-02-2025",
    },
    {
        id: 2,
        name: "AI-Powered Job Portal with Resume Parsing and Smart Recommendations",
        members: 12,
        startDate: "18-02-2025",
        endDate: "26-02-2025",
    },
    {
        id: 3,
        name: "Real-Time Chat Application with WebSockets and Push Notifications",
        members: 27,
        startDate: "19-02-2025",
        endDate: "27-02-2025",
    },
    {
        id: 4,
        name: "Multi-Tenant SaaS-Based Project Management Dashboard",
        members: 15,
        startDate: "20-02-2025",
        endDate: "28-02-2025",
    },
    {
        id: 5,
        name: "Social Media Platform with Live Streaming and Video Sharing",
        members: 19,
        startDate: "21-02-2025",
        endDate: "01-03-2025",
    },
    {
        id: 6,
        name: "E-Learning Platform with Interactive Courses and AI-Powered Assessments",
        members: 24,
        startDate: "22-02-2025",
        endDate: "02-03-2025",
    },
    {
        id: 7,
        name: "Healthcare Management System with Doctor-Patient Video Consultations",
        members: 30,
        startDate: "23-02-2025",
        endDate: "03-03-2025",
    },
    {
        id: 8,
        name: "Blockchain-Integrated Digital Asset Marketplace for NFTs",
        members: 30,
        startDate: "24-02-2025",
        endDate: "04-03-2025",
    },
    {
        id: 9,
        name: "Automated Expense Tracker with AI-Based Financial Insights",
        members: 16,
        startDate: "25-02-2025",
        endDate: "05-03-2025",
    },
    {
        id: 10,
        name: "AI-Powered Blogging and Content Management System with SEO Optimization",
        members: 25,
        startDate: "26-02-2025",
        endDate: "06-03-2025",
    },
    {
        id: 11,
        name: "Full-Stack E-Commerce Platform with Payment Gateway Integration",
        members: 22,
        startDate: "17-02-2025",
        endDate: "25-02-2025",
    },
    {
        id: 12,
        name: "AI-Powered Job Portal with Resume Parsing and Smart Recommendations",
        members: 12,
        startDate: "18-02-2025",
        endDate: "26-02-2025",
    },
    {
        id: 13,
        name: "Real-Time Chat Application with WebSockets and Push Notifications",
        members: 27,
        startDate: "19-02-2025",
        endDate: "27-02-2025",
    },
    {
        id: 14,
        name: "Multi-Tenant SaaS-Based Project Management Dashboard",
        members: 15,
        startDate: "20-02-2025",
        endDate: "28-02-2025",
    },
    {
        id: 15,
        name: "Social Media Platform with Live Streaming and Video Sharing",
        members: 19,
        startDate: "21-02-2025",
        endDate: "01-03-2025",
    },
    {
        id: 16,
        name: "E-Learning Platform with Interactive Courses and AI-Powered Assessments",
        members: 24,
        startDate: "22-02-2025",
        endDate: "02-03-2025",
    },
    {
        id: 17,
        name: "Healthcare Management System with Doctor-Patient Video Consultations",
        members: 30,
        startDate: "23-02-2025",
        endDate: "03-03-2025",
    },
    {
        id: 18,
        name: "Blockchain-Integrated Digital Asset Marketplace for NFTs",
        members: 30,
        startDate: "24-02-2025",
        endDate: "04-03-2025",
    },
    {
        id: 19,
        name: "Automated Expense Tracker with AI-Based Financial Insights",
        members: 16,
        startDate: "25-02-2025",
        endDate: "05-03-2025",
    },
    {
        id: 20,
        name: "AI-Powered Blogging and Content Management System with SEO Optimization",
        members: 25,
        startDate: "26-02-2025",
        endDate: "06-03-2025",
    },
];

const ProjectList = () => {
    const navigate = useNavigate();
    const [searchProject, setSearchProject] = useState("");
    const [isOpen, setIsOpen] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 10;
    const [showAddProject, setShowAddProject] = useState(false);

    const filteredProjects = projects.filter((project) =>
        project.name.toLowerCase().includes(searchProject.toLowerCase())
    );

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );
    return (
        <div className="p-4 sm:px-5 sm:text-sm text-xs overflow-x-auto">
            <div className="flex justify-between mb-4">
                <Button
                    label="Add Task"
                    onClick={() => setShowAddProject(true)}
                    className="p-button-sm h-10"
                    icon="pi pi-plus"
                    severity="primary"
                />
                <div className=" md:w-75  w-1/3 ">
                    <IconField iconPosition="left" className="h-10 ">
                        <InputIcon className="pi pi-search h-10" />
                        <InputText
                            placeholder="Search"
                            className="h-10 w-full"
                            value={searchProject}
                            onChange={(e) => setSearchProject(e.target.value)}
                        />
                    </IconField>
                </div>
            </div>

            <CreateProject
                visible={showAddProject}
                onHide={() => setShowAddProject(false)}
            />

            <DataTable
                tableStyle={{ minWidth: "60rem" }}
                value={currentProjects}
                responsiveLayout="scroll"
                paginatorClassName="custom-pagination"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                emptyMessage="No data available in table"
                paginator
                rows={10}
                rowsPerPageOptions={[5, 10, 25, 50]}
                paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                tableClassName="custom-table"
            >
                <Column
                    field="id"
                    header="S.No"
                    headerClassName="custom-table-header"
                    body={(rowData, { rowIndex }) =>
                        indexOfFirstProject + rowIndex + 1
                    }
                    style={{ width: "30px" }}
                />
                <Column
                    field="name"
                    header="Project Name"
                    headerClassName="custom-table-header"
                    style={{ width: "30%", maxWidth: "500px" }}
                    body={(rowData) => {
                        const prjName = rowData.name;
                        return (
                            <span
                                className="text-gray-600 cursor-pointer hover:underline w-[100%] text-ellipsis overflow-hidden whitespace-nowrap "
                                onClick={() =>
                                    navigate(`/dashboard/project/${rowData.id}`)
                                }
                                style={{
                                    display: "inline-block",
                                    maxWidth: "100%",
                                }}
                            >
                                {prjName}
                            </span>
                        );
                    }}
                />
                <Column
                    field="members"
                    header="Members"
                    headerClassName="custom-table-header"
                    style={{ minWidth: "140px" }}
                    body={(rowData) => (
                        <div className="flex items-center relative">
                            <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-0"></i>
                            <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-4"></i>
                            <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-8"></i>
                            <span className="ml-12 absolute left-5">
                                +{rowData.members}
                            </span>
                        </div>
                    )}
                />
                <Column
                    field="startDate"
                    header="Start Date"
                    headerClassName="custom-table-header"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    field="endDate"
                    header="End Date"
                    headerClassName="custom-table-header"
                    style={{ minWidth: "150px" }}
                />
                <Column
                    header="Action"
                    headerClassName="custom-table-header"
                    body={(rowData) => (
                        <div className="relative sm:pl-5 pl-5">
                            <button
                                className="text-gray-500"
                                onClick={() =>
                                    setIsOpen(
                                        isOpen === rowData.id
                                            ? null
                                            : rowData.id
                                    )
                                }
                            >
                                ⋮
                            </button>
                            {isOpen === rowData.id && (
                                <div className="absolute right-0 mt-1 w-24 bg-white/70 backdrop-blur-md border rounded-lg shadow-lg">
                                    <button className="w-full px-2 py-1 text-left hover:bg-gray-200">
                                        Edit
                                    </button>
                                    <button className="w-full px-2 py-1 text-left hover:bg-gray-200">
                                        Duplicate
                                    </button>
                                    <button className="w-full px-2 py-1 text-left hover:bg-gray-200 text-red-500">
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default ProjectList;
