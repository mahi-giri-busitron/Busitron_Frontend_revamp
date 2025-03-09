import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import CreateProject from "./CreateProject.jsx";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { useSelector, useDispatch } from "react-redux";
import { getAllprojects } from "../../../redux/projectslice.js";
import { fetchAllUser } from "../../../redux/userManagementSlice.js";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

const ProjectList = () => {
    const navigate = useNavigate();
    const [searchProject, setSearchProject] = useState("");
    const [isOpen, setIsOpen] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const projectsPerPage = 100;
    const [showAddProject, setShowAddProject] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [particular, setparticular] = useState(null);
    const { projects } = useSelector((state) => state.project);
    const dispatch = useDispatch();
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
        dispatch(getAllprojects());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchAllUser());
    }, []);

    useEffect(() => {
        if (particular) {
            setShowAddProject(true);
        }
    }, [particular]);

    const filteredProjects = useMemo(() => {
        return projects?.length
            ? projects.filter((project) =>
                  project.projectName
                      ?.toLowerCase()
                      .includes(searchProject.toLowerCase())
              )
            : [];
    }, [projects, searchProject]);

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(
        indexOfFirstProject,
        indexOfLastProject
    );

    const SendDataToEdit = (data) => {
        setparticular(data);
        setEditMode(true);
        setShowAddProject(true); // Ensure the modal opens in edit mode
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `/api/v1/project/projects/${id}`
            );
            if (response.data.statusCode === 200) {
                toast.success("Details deleted successfully!!");
                FetchProjects();
            } else {
                toast.error(response.data.message || "Something went wrong");
            }
        } catch (error) {
            console.error(
                "Error:",
                error.response ? error.response.data : error.message
            );
        }
    };

    return (
        <div className="p-4 sm:px-5 sm:text-sm text-xs overflow-x-auto">
            <div className="flex justify-between mb-4">
                {canAdd && (
                    <Button
                        label="Add Project"
                        onClick={() => {
                            setShowAddProject(true);
                            setEditMode(false); // Ensure editMode is false when adding a new project
                        }}
                        className="p-button-sm h-10"
                        icon="pi pi-plus"
                        severity="primary"
                    />
                )}

                <div className=" md:w-75 w-1/3">
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

            {showAddProject && (
                <CreateProject
                    visible={showAddProject}
                    onHide={() => {
                        setShowAddProject(false);
                        setEditMode(false); // Reset editMode when closing the modal
                    }}
                    onRemove={() => setparticular(null)}
                    Data={particular}
                    onCloseedit={() => setIsOpen(false)}
                    onRecall={() => FetchProjects()}
                    editMode={editMode} // Pass editMode state properly
                />
            )}

            <DataTable
                tableStyle={{ minWidth: "60rem" }}
                value={currentProjects}
                responsiveLayout="scroll"
                paginatorClassName="custom-pagination"
                currentPageReportTemplate="{first} to {last} of {totalRecords}"
                emptyMessage="No Projects available in the table"
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
                    field="projectName"
                    header="Project Name"
                    headerClassName="custom-table-header"
                    style={{ width: "30%", maxWidth: "500px" }}
                    body={(rowData) => {
                        const prjName = rowData.projectName;

                        return (
                            <span
                                className="text-gray-600 cursor-pointer hover:underline w-[100%] text-ellipsis overflow-hidden whitespace-nowrap "
                                onClick={() =>
                                    navigate(
                                        `/dashboard/project/${rowData._id}`
                                    )
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
                    field="projectMembers"
                    header="Members"
                    headerClassName="custom-table-header"
                    style={{ minWidth: "140px" }}
                    body={(rowData) => (
                        <div className="flex items-center relative">
                            <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-0"></i>
                            <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-4"></i>
                            <i className="pi pi-user text-gray-500 bg-gray-200 rounded-full text-xs p-1 absolute left-8"></i>
                            <span className="ml-12 absolute left-5">
                                +{rowData.projectMembers.length}
                            </span>
                        </div>
                    )}
                />
                <Column
                    field="startDate"
                    header="Start Date"
                    headerClassName="custom-table-header"
                    style={{ minWidth: "150px" }}
                    body={(rowData) =>
                        rowData.startDate
                            ? moment(rowData.startDate).format("DD-MM-YYYY")
                            : "N/A"
                    }
                />
                <Column
                    field="endDate"
                    header="End Date"
                    headerClassName="custom-table-header"
                    style={{ minWidth: "150px" }}
                    body={(rowData) =>
                        rowData.endDate
                            ? moment(rowData.endDate).format("DD-MM-YYYY")
                            : "N/A"
                    }
                />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div className="flex gap-3 items-center">
                            <button
                                onClick={() => {
                                    navigate(
                                        `/dashboard/project/${rowData._id}`,
                                        {
                                            state: rowData,
                                        }
                                    );
                                }}
                            >
                                <i className="pi pi-eye text-blue-500 cursor-pointer"></i>
                            </button>
                            {canEdit && (
                                <button onClick={() => SendDataToEdit(rowData)}>
                                    <i className="pi pi-pen-to-square text-green-500 cursor-pointer"></i>
                                </button>
                            )}

                            {canDelete && (
                                <button
                                    onClick={() => {
                                        handleDelete(rowData._id);
                                    }}
                                >
                                    <i className="pi pi-trash text-red-500 cursor-pointer"></i>
                                </button>
                            )}
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default ProjectList;
