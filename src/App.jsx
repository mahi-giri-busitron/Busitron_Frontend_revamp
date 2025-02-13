import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer.jsx";
import Navbar from "./component/Navbar.jsx";
import NotFoundpage from "./pages/NotFoundpage.jsx";
import "./index.css";
import Signin from "./component/Signin.jsx";
import PrivateRoute from "./component/PrivateRoute.jsx";
import Dashboard from "./component/Dashboard.jsx";
import { useState, useEffect } from "react";
import Home from "./component/Home.jsx";

function App() {
    const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
    ).matches;
    const [darkMode, setDarkMode] = useState(prefersDark);

    // Apply theme globally
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);

    return (
        <Router>
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
            <div className="pt-20">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="*" element={<NotFoundpage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                </Routes>
            </div>

            <Footer />
        </Router>
    );
}

export default App;
