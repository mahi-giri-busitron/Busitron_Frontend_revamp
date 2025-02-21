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
import Project from "./component/Dashboard/Project.jsx";
import Task from "./component/Dashboard/Task.jsx";
import Ticket from "./component/Dashboard/Ticket.jsx";
import Email from "./component/Dashboard/Email.jsx";
import Profile from "./component/Dashboard/Profile.jsx";
import Settings from "./component/Dashboard/Settings.jsx";
import Dashboard from "./component/Dashboard/Dashboard.jsx";
import DashboardHome from "./component/Dashboard/DashboardHome.jsx";
import Financial_Management from "./component/Dashboard/Financial_Management.jsx";
import Performance_Tracking from "./component/Dashboard/Performance_Tracking.jsx";
import User_Management from "./component/Dashboard/User_Management.jsx";

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

                <Route path="/enter-new-password" element={<ResetPassword />} />
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
                            path="performance-tracking"
                            element={<Performance_Tracking />}
                        />
                        <Route
                            path="user-management"
                            element={<User_Management />}
                        />
                        <Route path="project" element={<Project />} />
                        <Route path="task" element={<Task />} />
                        <Route path="ticket" element={<Ticket />} />
                        <Route path="email" element={<Email />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="setting" element={<Settings />} />
                    </Route>
                </Route>
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
            {!isPrivateRoute && <Footer />}
        </>
    );
}

export default App;
