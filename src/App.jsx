import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { scroller } from "react-scroll";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./component/Home.jsx";
import Signin from "./component/Sign.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import EnterEmailForResetPassword from "./pages/EnterEmailForResetPassword.jsx";
import Create_User from "./pages/Create_User.jsx";
import Task from "./component/Dashboard/Task/Task.jsx";
import Ticket from "./component/Dashboard/Ticket/Ticket.jsx";
import Profile from "./component/Dashboard/Profile.jsx";
import Settings from "./component/Dashboard/Settings.jsx";
import Dashboard from "./component/Dashboard/Dashboard.jsx";
import DashboardHome from "./component/Dashboard/DashboardHome.jsx";
import Financial_Management from "./component/Dashboard/Financial/Financial_Management.jsx";
import Performance_Tracking from "./component/Dashboard/performance/PerformanceTracking.jsx";
import UserManagement from "./component/Dashboard/Users/UserManagement.jsx";
import CompanySetting from "./component/Settings/CompanySetting.jsx";
import BusinessAddress from "./component/Settings/BusinessAddress.jsx";
import AppSetting from "./component/Settings/AppSetting.jsx";
import RolePermissions from "./component/Settings/RolePermissions.jsx";
import TaskSettings from "./component/Settings/TaskSettings.jsx";
import ModuleSettings from "./component/Settings/ModuleSettings.jsx";
import SingleTask from "./component/Dashboard/Task/SingleTask.jsx";
import Messages from "./component/Dashboard/Messages.jsx";
import SingleTicket from "./component/Dashboard/Ticket/SingleTicket.jsx";
import Project from "./component/Dashboard/Project/Project.jsx";
import SingleProject from "./component/Dashboard/Project/SingleProject.jsx";
import SingleEstimate from "./component/Dashboard/Financial/SingleEstimate.jsx";
import UserDetails from "./component/Dashboard/Users/UserDetails.jsx";
import UsrerPerformanceDetals from "./component/Dashboard/performance/UserperformanceDetails.jsx";
import ChangePassword from "./component/Dashboard/ChangePassword.jsx";
import ProtectedRoute from "./component/protectedRoute.jsx";
import Unauthorized from "./pages/Unauthorisedpage.jsx";
import OfflinePage from "./component/offlinePage.jsx";

function App() {
    const location = useLocation();
    const [isOnline, setIsOnline] = useState(navigator.onLine);

    const privateRoutes = [
        "/dashboard",
        "/dashboard/project",
        "/dashboard/task",
        "/dashboard/ticket",
        "/dashboard/email",
        "/dashboard/profile",
        "/dashboard/setting",
        "/unauthorized",
    ];

    const isPrivateRoute = privateRoutes.some((route) =>
        location.pathname.startsWith(route)
    );

    useEffect(() => {
        const updateOnlineStatus = () => setIsOnline(navigator.onLine);

        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);

        return () => {
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    useEffect(() => {
        const section = new URLSearchParams(location.search).get("scrollTo");
        if (section) {
            setTimeout(() => {
                scroller.scrollTo(section, {
                    duration: 800,
                    smooth: "easeInOutQuart",
                    offset: -80,
                });
            }, 500);
        }
    }, [location]);

    if (!isOnline) {
        return <OfflinePage />;
    }

    return (
        <>
            {!isPrivateRoute && <Navbar />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signin" element={<Signin />} />
                <Route
                    path="/signin/otp-verification"
                    element={<OtpVerification />}
                />
                <Route path="/signin/create-user" element={<Create_User />} />

                <Route
                    path="/:email/enter-new-password"
                    element={<ResetPassword />}
                />
                <Route
                    path="/forgot-password"
                    element={<EnterEmailForResetPassword />}
                />

                <Route path="/unauthorized" element={<Unauthorized />} />

                <Route
                    path="/dashboard/*"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route path="" element={<DashboardHome />} />
                    <Route
                        path="financial-management"
                        element={<Financial_Management />}
                    />
                    <Route
                        path="financial-management/:estimateId"
                        element={<SingleEstimate />}
                    />
                    <Route
                        path="performance-tracking"
                        element={<Performance_Tracking />}
                    />
                    <Route
                        path="user-management"
                        element={<UserManagement />}
                    />
                    <Route
                     path="changePassword"
                      element={<ChangePassword />}
                       />
                    <Route path="project" element={<Project />} />
                    <Route path="project/:id" element={<SingleProject />} />
                    <Route path="task" element={<Task />} />
                    <Route path="task/:id" element={<SingleTask />} />
                    <Route path="ticket" element={<Ticket />} />
                    <Route path="message" element={<Messages />} />
                    <Route path="ticket/:id" element={<SingleTicket />} />
                    <Route path="profile" element={<Profile />} />
                    
                    <Route path="setting" element={<Settings />}>
                        <Route
                            path="company-settings"
                            element={<CompanySetting />}
                        />
                        <Route
                            path="business-address"
                            element={<BusinessAddress />}
                        />
                        <Route
                         path="app-settings"
                          element={<AppSetting />}
                           />
                        <Route
                            path="role-permissions"
                            element={<RolePermissions />}
                        />
                        <Route
                            path="task-settings"
                            element={<TaskSettings />}
                        />
                        {/* <Route
                            path="module-settings"
                            element={<ModuleSettings />}
                        /> */}
                    </Route>
                    <Route
                        path="user-management/emp/:empid"
                        element={<UserDetails />}
                    />
                    <Route
                        path="performance-tracking/:empid"
                        element={<UsrerPerformanceDetals />}
                    />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!isPrivateRoute && <Footer />}
        </>
    );
}

export default App;







