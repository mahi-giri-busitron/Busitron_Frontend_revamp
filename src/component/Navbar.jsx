import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import "primeicons/primeicons.css";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (nav) => {
        setMenuOpen(false);
        const scrollToSection = () => {
            const targetElement = document.getElementById(nav.id);
            if (targetElement) {
                scroller.scrollTo(nav.id, {
                    duration: 900,
                    smooth: "easeInOutQuart",
                    offset: -80,
                });
            } else {
                console.warn(`Element with ID '${nav.id}' not found.`);
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

    return (
        <motion.nav
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className={`fixed top-0 left-0 w-full p-4 z-50 transition-all duration-300 ${
                scrolling ? "bg-white shadow-md" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center px-4 md:px-8">
                <Link to="/" className="text-2xl font-bold text-blue-600">
                    MyLogo
                </Link>

                <ul className="hidden md:flex space-x-3 lg:space-x-10 font-semibold text-base lg:text-lg">
                    {navLinks.map((nav) => (
                        <motion.li key={nav.id} whileHover={{ scale: 1.1 }}>
                            <span
                                className="cursor-pointer hover:text-blue-500 transition capitalize text-gray-900"
                                onClick={() => handleNavClick(nav)}
                            >
                                {nav.title}
                            </span>
                        </motion.li>
                    ))}
                </ul>

                <div className="flex items-center space-x-4 sm:space-x-6">
                    {/* Hide login button if on signin page */}
                    {location.pathname !== "/signin" && (
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

            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ duration: 0.4 }}
                        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg p-4 md:hidden"
                    >
                        <button
                            onClick={() => setMenuOpen(false)}
                            className="absolute top-4 right-4 text-2xl text-gray-700"
                        >
                            <i className="pi pi-times" />
                        </button>
                        <ul className="flex flex-col mt-8 space-y-2 text-lg font-semibold">
                            {navLinks.map((nav) => (
                                <motion.li
                                    key={nav.id}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <span
                                        className="block py-2 hover:text-blue-500 transition capitalize text-gray-900"
                                        onClick={() => handleNavClick(nav)}
                                    >
                                        {nav.title}
                                    </span>
                                </motion.li>
                            ))}
                        </ul>
                        <div className="mt-4">
                            {/* Hide login button in mobile menu if on signin page */}
                            {location.pathname !== "/signin" && (
                                <Link
                                    to="/signin"
                                    className="block w-full px-4 py-2 text-center rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                                >
                                    Login
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
