import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import "primeicons/primeicons.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolling, setScrolling] = useState(false);
    const [activeTab, setActiveTab] = useState("home");

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 1);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (nav) => {
        setMenuOpen(false);
        setActiveTab(nav.id);
        const scrollToSection = () => {
            const targetElement = document.getElementById(nav.id);
            if (targetElement) {
                scroller.scrollTo(nav.id, {
                    duration: 900,
                    smooth: "easeInOutQuart",
                    offset: -80,
                });
            }
        };
        if (location.pathname === "/") {
            setTimeout(scrollToSection, 300);
        } else {
            navigate(`/?scrollTo=${nav.id}`);
        }
    };

    const navLinks = [
        { id: "home", title: "Home" },
        { id: "about", title: "About" },
        { id: "services", title: "Services" },
        { id: "projects", title: "Projects" },
        { id: "location", title: "Location" },
        { id: "contact", title: "Contact" },
    ];

    const hideLoginPaths = [
        "/signin",
        "/signin/otp-verification",
        "/signin/create-user",
        "/otp-verification",
        "/enter-new-password",
        "/forgot-password",
    ];

    return (
        <nav
            className={`fixed top-0 left-0 w-full p-4 z-50 transition-all duration-300 ${
                scrolling ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    MyLogo
                </Link>

                <ul className="hidden md:flex space-x-3 lg:space-x-10 font-semibold text-base lg:text-lg md:text-sm md:space-x-4">
                    {navLinks.map((nav) => (
                        <li key={nav.id}>
                            <span
                                className={`cursor-pointer hover:text-blue-500 transition capitalize ${
                                    activeTab === nav.id
                                        ? "text-blue-500"
                                        : "text-gray-900"
                                }`}
                                onClick={() => handleNavClick(nav)}
                            >
                                {nav.title}
                            </span>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    {!hideLoginPaths.includes(location.pathname) && (
                        <Link
                            to="/signin"
                            className="hidden md:block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                        >
                            Login
                        </Link>
                    )}
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-2xl text-blue-600"
                    >
                        <i
                            className={`pi ${
                                menuOpen ? "pi-times" : "pi-bars"
                            }`}
                        />
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="fixed top-0 right-0 !h-[100%] w-[50%] bg-white shadow-lg p-4 md:hidden z-50">
                    <button
                        onClick={() => setMenuOpen(false)}
                        className="absolute top-4 right-4 text-2xl text-gray-700"
                    >
                        <i className="pi pi-times" />
                    </button>
                    <ul className="flex flex-col mt-8 space-y-5 text-md font-semibold">
                        {navLinks.map((nav) => (
                            <li key={nav.id}>
                                <span
                                    className={`cursor-pointer hover:text-blue-500 transition capitalize ${
                                        activeTab === nav.id
                                            ? "text-blue-500"
                                            : "text-gray-900"
                                    }`}
                                    onClick={() => handleNavClick(nav)}
                                >
                                    {nav.title}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        {!hideLoginPaths.includes(location.pathname) && (
                            <Link
                                to="/signin"
                                className="block w-1/2 py-2 text-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
