import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scroller } from "react-scroll";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./component/Home.jsx";
import Signin from "./component/Signin.jsx";
import NotFoundpage from "./pages/NotFoundpage.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import Dashboard from "./component/Dashboard.jsx";

function App() {
    const location = useLocation();

    // Scroll to section when navigating with query parameter
    useEffect(() => {
        const section = new URLSearchParams(location.search).get("scrollTo");

        if (section) {
            const scrollToSection = () => {
                const targetElement = document.getElementById(section);
                if (targetElement) {
                    scroller.scrollTo(section, {
                        duration: 800,
                        smooth: "easeInOutQuart",
                        offset: -80, // Adjust for fixed navbar
                    });
                } else {
                    console.warn(`Element with ID '${section}' not found.`);
                }
            };

            // Wait for the DOM to fully load before scrolling
            setTimeout(scrollToSection, 500);
        }
    }, [location]);

    return (
        <>
            <Navbar />
            <div className="pt-20">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />

                    {/* Private Routes */}
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>

                    {/* 404 Not Found Route */}
                    <Route path="*" element={<NotFoundpage />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
