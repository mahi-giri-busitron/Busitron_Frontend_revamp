import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { scroller } from "react-scroll";
import "primeicons/primeicons.css";
import { useSelector } from "react-redux";

const Navbar = ({ sectionRefs }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [scrolling, setScrolling] = useState(false);
    const [activeTab, setActiveTab] = useState("home");
    const navbarRef = useRef(null);
    const { currentUser } = useSelector((store) => store.user);

    const navLinks = [
        { id: "home", title: "Home" },
        { id: "about", title: "About" },
        { id: "services", title: "Services" },
        { id: "projects", title: "Projects" },
        { id: "location", title: "Location" },
        { id: "contact", title: "Contact" },
    ];

    useEffect(() => {
        setMenuOpen(false);
    }, [location]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 1);

            for (const nav of navLinks) {
                const section = sectionRefs?.current[nav.id];
                if (section) {
                    const rect = section.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveTab(nav.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavClick = (nav) => {
        setMenuOpen(false);
        setActiveTab(nav.id);

        if (location.pathname === "/") {
            setTimeout(() => {
                scroller.scrollTo(nav.id, {
                    duration: 900,
                    smooth: "easeInOutQuart",
                    offset: -80,
                });
            }, 300);
        } else {
            navigate(`/?scrollTo=${nav.id}`);
        }
    };

    const handleLoginClick = () => {
        window.scrollTo(0, 0);
        navigate("/signin");
    };

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
            ref={navbarRef}
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
                                        ? "text-blue-500 border-b-2 border-blue-500"
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
                    {!hideLoginPaths.includes(location.pathname) &&
                        (currentUser ? (
                            <Link
                                to="/dashboard"
                                className="hidden md:block px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="hidden md:block px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Login
                            </button>
                        ))}
                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden text-2xl text-blue-600"
                    >
                        <i className="pi pi-bars" />
                    </button>
                </div>
            </div>

            <div
                className={`fixed top-0 right-0 h-full w-[50%] bg-white shadow-lg p-2 md:hidden z-50 transform transition-transform duration-300 ${
                    menuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <button
                    onClick={() => setMenuOpen(false)}
                    className="absolute top-4 right-4 text-2xl text-gray-700"
                >
                    <i className="pi pi-times" />
                </button>

                <ul className="flex flex-col mt-12 space-y-5 text-md font-semibold">
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
                    {!hideLoginPaths.includes(location.pathname) &&
                        (currentUser ? (
                            <Link
                                to="/dashboard"
                                className="w-1/2 px-2 py-1 mx-auto text-center rounded-md bg-green-500 text-white hover:bg-green-700"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <button
                                onClick={handleLoginClick}
                                className="w-1/2 py-1  mx-auto text-center rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Login
                            </button>
                        ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
