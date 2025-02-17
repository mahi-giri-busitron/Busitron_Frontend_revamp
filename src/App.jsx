import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { scroller } from "react-scroll";
import Navbar from "./component/Navbar.jsx";
import Footer from "./component/Footer.jsx";
import Home from "./component/Home.jsx";
import Signin from "./component/Sign.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import Dashboard from "./component/Dashboard.jsx";
import OtpVerification from "./pages/OtpVerification.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

function App() {
    const location = useLocation();
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
            <Navbar />
            <div className="pt-16">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/otp-verification" element={<OtpVerification />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
            <Footer />
        </>
    );
}

export default App;
