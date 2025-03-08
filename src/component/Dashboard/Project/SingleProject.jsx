import React, { useEffect, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { useSearchParams, useParams } from "react-router-dom";
import Overview from "./Overview";
import TaskBoard from "./TaskBoard";
import Milestone from "./MileStone";
import FileUploadModal from "./Files";
import ProjectMembers from "./ProjectMembers.jsx";
import TaskAssignments from "./TaskAssignments.jsx";

const SingleProject = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentTab = searchParams.get("tab") || "overview";

    const items = [
        { label: "Overview", icon: "pi pi-home", route: "overview" },
        { label: "Members", icon: "pi pi-users", route: "members" },
        { label: "Files", icon: "pi pi-file", route: "files" },
        { label: "Milestones", icon: "pi pi-flag", route: "milestones" },
        { label: "Tasks", icon: "pi pi-list", route: "tasks" },
        { label: "Task Board", icon: "pi pi-th-large", route: "task-board" },
    ];

    const activeTabIndex =
        items.findIndex((item) => item.route === currentTab) || 0;
    const [activeIndex, setActiveIndex] = useState(activeTabIndex);

    useEffect(() => {
        setActiveIndex(activeTabIndex);
    }, [currentTab]);

    const handleTabChange = (e) => {
        const newTab = items[e.index].route;
        setSearchParams({ tab: newTab });
        setActiveIndex(e.index);
    };

    const renderContent = () => {
        switch (currentTab) {
            case "overview":
                return <Overview />;
            case "members":
                return (
                    <div>
                        <ProjectMembers />
                    </div>
                );
            case "files":
                return (
                    <div>
                        <div>
                            <FileUploadModal projectId={id} />
                        </div>
                    </div>
                );
            case "milestones":
                return (
                    <div>
                        <div>
                            {id ? (
                                <Milestone projectId={id} />
                            ) : (
                                <div>Loading milestones...</div>
                            )}
                        </div>
                    </div>
                );
            case "tasks":
                return (
                    <div>
                        <TaskAssignments />
                    </div>
                );
            case "task-board":
                return <TaskBoard />;
            default:
                return (
                    <div>
                        <h2>Overview</h2>
                        <p>Welcome to the project overview.</p>
                    </div>
                );
        }
    };

    return (
        <div className="card py-6">
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={handleTabChange}
            />
            <div className="">{renderContent()}</div>
        </div>
    );
};

export default SingleProject;
