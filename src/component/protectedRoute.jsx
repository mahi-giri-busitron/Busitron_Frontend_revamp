import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchRolesPermissions } from "../redux/RolesPermissionsSlice";
import { GetNavigationData } from "./Dashboard/Navigation/NavigationConst";

const ProtectedRoute = ({ children }) => {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((store) => store.user);
    const { roles } = useSelector((store) => store.rolesPermissions);
    const location = useLocation();

    useEffect(() => {
        if (currentUser) {
            dispatch(fetchRolesPermissions());
        }
    }, [currentUser, dispatch]);

    if (!currentUser) {
        return <Navigate to="/signin" />;
    }

    const currentRole = currentUser?.data?.role;
    const isSuperAdmin = currentRole === "SuperAdmin";

    const allNavItems = GetNavigationData();

    const effectivePermissions = isSuperAdmin
        ? {} 
        : roles.find((r) => r.role === currentRole)?.permissions || {};

    const findNearestParentNav = (path) => {
        const sortedNavItems = allNavItems.sort(
            (a, b) => b.path.length - a.path.length
        );

        return sortedNavItems.find((navItem) => path.startsWith(navItem.path));
    };

    const matchedNavItem = findNearestParentNav(location.pathname);

    if (!matchedNavItem) {
        return <Navigate to="/unauthorized" />;
    }

    if (matchedNavItem.needsPermission && !isSuperAdmin) {
        const hasPermission =
            effectivePermissions[matchedNavItem.permissionKey]?.view;
        if (!hasPermission) {
            return <Navigate to="/unauthorized" />;
        }
    }

    return children;
};

export default ProtectedRoute;
