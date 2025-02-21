export const GetNavigationData = () => {
    return [
        { label: "Home", path: "/", icon: "pi pi-home" },
        { label: "Dashboard", path: "/dashboard", icon: "pi pi-warehouse" },
        {
            label: "Projects",
            path: "/dashboard/project",
            icon: "pi pi-sitemap",
        },
        {
            label: "Financial Management",
            path: "/dashboard/financial-management",
            icon: "pi pi-wallet",
        },
        {
            label: "Performance-Tracking",
            path: "/dashboard/performance-tracking",
            icon: "pi pi-sync",
        },
        {
            label: "Tasks",
            path: "/dashboard/task",
            icon: "pi pi-pen-to-square",
        },
        {
            label: "Manage Users",
            path: "/dashboard/user-management",
            icon: "pi pi-users",
        },
        { label: "Tickets", path: "/dashboard/ticket", icon: "pi pi-ticket" },
        { label: "Messages", path: "/dashboard/message", icon: "pi pi-inbox" },
        { label: "Profile", path: "/dashboard/profile", icon: "pi pi-user" },
        { label: "Settings", path: "/dashboard/setting", icon: "pi pi-cog" },
    ];
};
