import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import "primeicons/primeicons.css";

const Navbar = ({ darkMode, setDarkMode }) => {
    const [scrolled, setScrolled] = useState(false);
    const [toggle, setToggle] = useState(false);

    const navLinks = [
        { id: "home", title: "Home" },
        { id: "about", title: "About" },
        { id: "services", title: "Services" },
        { id: "projects", title: "Projects" },
        { id: "location", title: "Location" },
        { id: "contact", title: "Contact" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full p-4 z-50 transition-all duration-300 ${
                scrolled
                    ? "bg-black bg-opacity-50 backdrop-blur-md shadow-md"
                    : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo */}
                <Link
                    to="/"
                    className="text-2xl font-bold text-[#00715D] dark:text-white"
                >
                    MyLogo
                </Link>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex space-x-8 font-semibold text-lg mx-auto">
                    {navLinks.map((nav) => (
                        <li key={nav.id}>
                            <ScrollLink
                                to={nav.id}
                                smooth={true}
                                duration={500}
                                className={`cursor-pointer hover:text-[#00715D] transition capitalize ${
                                    scrolled || darkMode
                                        ? "text-white"
                                        : "text-gray-900"
                                }`}
                            >
                                {nav.title}
                            </ScrollLink>
                        </li>
                    ))}
                </ul>

                {/* Right Side - Theme Toggle & Login Button */}
                <div className="flex items-center space-x-6">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="relative flex items-center justify-center w-12 h-6 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-all duration-300 cursor-pointer"
                    >
                        <div
                            className={`absolute left-1 w-5 h-5 bg-white rounded-full shadow-md transform transition-all duration-300 ${
                                darkMode
                                    ? "translate-x-6 bg-[#00715D]"
                                    : "bg-gray-800"
                            }`}
                        />
                        <i
                            className={`pi ${
                                darkMode
                                    ? "pi-moon text-[#00715D]"
                                    : "pi-sun text-gray-800"
                            } absolute left-7 transition-all duration-300`}
                        />
                    </button>

                    {/* Login Button */}
                    <button className="text-white bg-blue-600 px-5 py-2 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg cursor-pointer">
                        Login
                    </button>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setToggle(!toggle)}
                        className="md:hidden cursor-pointer"
                    >
                        <i
                            className={`pi ${
                                toggle ? "pi-times" : "pi-bars"
                            } text-2xl text-[#00715D]`}
                        />
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed top-0 right-0 h-full w-64 bg-black bg-opacity-90 z-50 transform ${
                    toggle ? "translate-x-0" : "translate-x-full"
                } transition-transform duration-300 md:hidden`}
            >
                <div className="flex flex-col p-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setToggle(false)}
                        className="self-end mb-4 cursor-pointer"
                    >
                        <i className="pi pi-times text-2xl text-white" />
                    </button>

                    {/* Mobile Nav Links */}
                    <ul className="flex flex-col space-y-6 text-lg">
                        {navLinks.map((nav) => (
                            <li key={nav.id}>
                                <ScrollLink
                                    to={nav.id}
                                    smooth={true}
                                    duration={500}
                                    className="cursor-pointer hover:text-[#00715D] transition text-white"
                                    onClick={() => setToggle(false)}
                                >
                                    {nav.title}
                                </ScrollLink>
                            </li>
                        ))}
                    </ul>

                    {/* Mobile Login Button */}
                    <div className="mt-6">
                        <button
                            className="block w-full text-center text-white bg-blue-600 px-5 py-2 rounded-lg font-semibold transition duration-300 ease-in-out hover:bg-blue-700 hover:shadow-lg cursor-pointer"
                            onClick={() => setToggle(false)}
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
