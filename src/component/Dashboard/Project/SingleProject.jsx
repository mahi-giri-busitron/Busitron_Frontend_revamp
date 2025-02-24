import React, { useEffect, useState } from "react";
import { TabMenu } from "primereact/tabmenu";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";

const SingleProject = () => {
    const { id } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

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
                return (
                    <div>
                        <h2>Project Overview</h2>
                        <p>Summary and goals.</p>
                    </div>
                );
            case "members":
                return (
                    <div>
                        <h2>Members</h2>
                        <p>List of project members.</p>
                    </div>
                );
            case "files":
                return (
                    <div>
                        <h2>Files</h2>
                        <p>Uploaded documents.</p>
                    </div>
                );
            case "milestones":
                return (
                    <div>
                        <h2>Milestones</h2>
                        <p>Key project milestones.</p>
                    </div>
                );
            case "tasks":
                return (
                    <div>
                        <h2>Tasks</h2>
                        <p>Task assignments.</p>
                    </div>
                );
            case "task-board":
                return (
                    <div>
                        <h2>Task Board</h2>
                        <p>Kanban-style board.</p>
                    </div>
                );
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
        <div className="card">
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={handleTabChange}
            />
            <div className="p-4">{renderContent()}</div>
        </div>
    );
};

export default SingleProject;
