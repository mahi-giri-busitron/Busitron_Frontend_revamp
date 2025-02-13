import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import About from "./pages/About";
import Homepage from "./pages/Homepage";
import Location from "./pages/Location";
import Projects from "./pages/Projects";
import Service from "./pages/Service";
import Contact from "./pages/Contact";
import NotFoundPage from "./pages/NotFoundPage";
import "./index.css";
import Signin from "./component/Signin";
import PrivateRoute from "./component/PrivateRoute";
import Dashboard from "./component/Dashboard";
import { useState, useEffect } from "react";

function App() {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <Homepage />
                            <About />
                            <Service />
                            <Projects />
                            <Location />
                            <Contact />
                        </>
                    }
                />
                <Route path="/signin" element={<Signin />} />
                <Route path="*" element={<NotFoundPage />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
