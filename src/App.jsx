import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
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
import Task from "./component/Dashboard/Task.jsx";
import Ticket from "./component/Dashboard/Ticket.jsx";
import Email from "./component/dashboard/Messages.jsx";
import Profile from "./component/Dashboard/Profile.jsx";
import Settings from "./component/Dashboard/Settings.jsx";
import Dashboard from "./component/Dashboard/Dashboard.jsx";
import DashboardHome from "./component/Dashboard/DashboardHome.jsx";
import Financial_Management from "./component/Dashboard/Financial_Management.jsx";
import Performance_Tracking from "./component/Dashboard/performance/PerformanceTracking.jsx";
import UserManagement from "./component/Dashboard/Users/UserManagement.jsx";
import CompanySetting from "./component/Settings/CompanySetting.jsx";
import BusinessAddress from "./component/Settings/BusinessAddress.jsx";
import AppSetting from "./component/Settings/AppSetting.jsx";
import RolePermissions from "./component/Settings/RolePermissions.jsx";
import TaskSettings from "./component/Settings/TaskSettings.jsx";
import ModuleSettings from "./component/Settings/ModuleSettings.jsx";
import SingleTask from "./component/Dashboard/SingleTask.jsx";
import Messages from "./component/dashboard/Messages.jsx";
import SingleTicket from "./component/Dashboard/SingleTicket.jsx";
import Project from "./component/Dashboard/Project/Project.jsx";
import SingleProject from "./component/Dashboard/Project/SingleProject.jsx";
import SingleEstimate from "./component/Dashboard/SingleEstimate.jsx";
import UserDetails from "./component/Dashboard/Users/UserDetails.jsx";
import UsrerPerformanceDetals from "./component/Dashboard/performance/UserperformanceDetails.jsx";
function App() {
    const location = useLocation();

    const privateRoutes = [
        "/dashboard",
        "/dashboard/project",
        "/dashboard/task",
        "/dashboard/ticket",
        "/dashboard/email",
        "/dashboard/profile",
        "/dashboard/setting",
    ];

    const isPrivateRoute = privateRoutes.some((route) =>
        location.pathname.startsWith(route)
    );

    useEffect(() => {
        const section = new URLSearchParams(location.search).get("scrollTo");

        if (section) {
            const scrollToSection = () => {
                const targetElement = document.getElementById(section);
                if (targetElement) {
                    scroller.scrollTo(section, {
                        duration: 800,
                        smooth: "easeInOutQuart",
                        offset: -80,
                    });
                } else {
                    console.warn(`Element with ID '${section}' not found.`);
                }
            };
            setTimeout(scrollToSection, 500);
        }
    }, [location]);

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

                <Route path="/:email/enter-new-password" element={<ResetPassword />} />
                <Route
                    path="/forgot-password"
                    element={<EnterEmailForResetPassword />}
                />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />}>
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
                        <Route path="project" element={<Project />} />
                        <Route path="project/:id" element={<SingleProject />} />
                        <Route path="task" element={<Task />} />
                        <Route path="task/:id" element={<SingleTask />} />
                        <Route path="ticket" element={<Ticket />} />
                        <Route path="message" element={< Messages/>} />
                        <Route path="ticket/:id" element={<SingleTicket />} />
                        <Route path="message" element={<Email />} />
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
                            <Route
                                path="module-settings"
                                element={<ModuleSettings />}
                            />
                        </Route>
                        <Route
                            path="/dashboard/user-management/emp/:empid"
                            element={<UserDetails />}
                        />
                        <Route
                            path="/dashboard/performance-tracking/:empid"
                            element={<UsrerPerformanceDetals />}
                        />
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!isPrivateRoute && <Footer />}
        </>
    );
}

export default App;
