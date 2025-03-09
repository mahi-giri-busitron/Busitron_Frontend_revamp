export const GetNavigationData = () => {
    return [
        { label: "Home", path: "/", icon: "pi pi-home", needsPermission: false },
        { label: "Dashboard", path: "/dashboard", icon: "pi pi-warehouse", needsPermission: false },
        {
            label: "Projects",
            path: "/dashboard/project",
            icon: "pi pi-sitemap",
            permissionKey: "projects",
            needsPermission: true,
        },
        {
            label: "Financial Management",
            path: "/dashboard/financial-management",
            icon: "pi pi-wallet",
            permissionKey: "financial_management",
            needsPermission: true,
        },
        {
            label: "Performance-Tracking",
            path: "/dashboard/performance-tracking",
            icon: "pi pi-sync",
            permissionKey: "Performance_tracking",
            needsPermission: true,
        },
        {
            label: "Tasks",
            path: "/dashboard/task",
            icon: "pi pi-pen-to-square",
            permissionKey: "tasks",
            needsPermission: true,
        },
        {
            label: "Manage Users",
            path: "/dashboard/user-management",
            icon: "pi pi-users",
            permissionKey: "manage_users",
            needsPermission: true,
        },
        {
            label: "Tickets",
            path: "/dashboard/ticket",
            icon: "pi pi-ticket",
            permissionKey: "tickets",
            needsPermission: true,
        },
        {
            label: "Messages",
            path: "/dashboard/message",
            icon: "pi pi-inbox",
            needsPermission: false,
        },
        {
            label: "Profile",
            path: "/dashboard/profile",
            icon: "pi pi-user",
            needsPermission: false,
        },
        {
            label: "Settings",
            path: "/dashboard/setting",
            icon: "pi pi-cog",
            permissionKey: "settings",
            needsPermission: true,
        },
    ];
};
