import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import CreateProject from "./CreateProject.jsx";

const projects = [
    {
        id: 1,
        name: "Full-Stack E-Commerce Platform with Payment Gateway Integration",
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
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    return (
        <div className="p-6 sm:p-4 sm:text-sm text-xs overflow-x-auto">
            <div className="flex justify-between mb-4">
                <button
                    className="px-4 py-2 bg-black text-white rounded"
                    onClick={() => setShowAddProject(true)}
                >
                    + Add Project
                </button>
                <div className="relative w-1/3">
                    <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"></i>
                    <input
                        type="text"
                        placeholder="Search here"
                        className="border p-2 pl-10 rounded w-full overflow-hidden text-ellipsis whitespace-nowrap"
                        value={searchProject}
                        onChange={(e) => setSearchProject(e.target.value)}
                    />
                </div>
            </div>

            <CreateProject
                visible={showAddProject}
                onHide={() => setShowAddProject(false)}
            />

            <div className="min-w-[600px] grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] gap-4 bg-gray-100 p-3 font-semibold border-b border-gray-300 sm:grid-cols-[0.3fr_1.4fr_0.8fr_0.6fr_0.6fr_0.3fr]">
                <div>S.No</div>
                <div>Project Name</div>
                <div>Members</div>
                <div>Start Date</div>
                <div>End Date</div>
                <div>Action</div>
            </div>

            {currentProjects.map((project, index) => (
                <div
                    key={project.id}
                    className="min-w-[600px] grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] gap-2 p-3 border-b border-gray-300 items-center sm:grid-cols-[0.3fr_1.4fr_0.8fr_0.6fr_0.6fr_0.3fr]"
                >
                    <div>{indexOfFirstProject + index + 1}</div>
                    <div
                        className="text-gray-600 cursor-pointer hover:underline w-[85%] text-ellipsis overflow-hidden whitespace-nowrap"
                        onClick={() => navigate(`/dashboard/project/${project.id}`)}
                    >
                        {project.name}
                    </div>
                    <div className="flex items-center relative">
                        <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-0"></i>
                        <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-4"></i>
                        <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-8"></i>
                        <span className="ml-12 absolute left-5">
                            +{project.members}
                        </span>
                    </div>
                    <div>{project.startDate}</div>
                    <div>{project.endDate}</div>
                    <div className="relative sm:pl-5 pl-5">
                        <button
                            className="text-gray-500"
                            onClick={() =>
                                setIsOpen(
                                    isOpen === project.id ? null : project.id
                                )
                            }
                        >
                            ⋮
                        </button>
                        {isOpen === project.id && (
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
                </div>
            ))}

            <div className="flex justify-center items-center gap-4 mt-4">
                <button
                    className={`px-4 py-2 bg-gray-300 rounded ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    <i className="pi pi-angle-left text-blue-500 text-xl"></i>
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className={`px-4 py-2 bg-gray-300 rounded ${
                        currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                    }`}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    <i className="pi pi-angle-right text-blue-500 text-xl"></i>
                </button>
            </div>
        </div>
    );
};

export default ProjectList;
