import React, { useRef, useEffect } from "react";
import About from "../pages/About.jsx";
import Homepage from "../pages/Homepage.jsx";
import Location from "../pages/Location.jsx";
import Projects from "../pages/Projects.jsx";
import Service from "../pages/Service.jsx";
import Contact from "../pages/Contact.jsx";
import Navbar from "../component/Navbar.jsx";

const Home = () => {
    const sectionRefs = useRef({
        home: null,
        about: null,
        services: null,
        projects: null,
        location: null,
        contact: null,
    });

    useEffect(() => {
        sectionRefs.current.home = document.getElementById("home");
        sectionRefs.current.about = document.getElementById("about");
        sectionRefs.current.services = document.getElementById("services");
        sectionRefs.current.projects = document.getElementById("projects");
        sectionRefs.current.location = document.getElementById("location");
        sectionRefs.current.contact = document.getElementById("contact");
    }, []);

    return (
        <div className="pt-10">
            <Navbar sectionRefs={sectionRefs} />
            <div id="home" ref={(el) => (sectionRefs.current.home = el)}>
                <Homepage />
            </div>
            <div id="about" ref={(el) => (sectionRefs.current.about = el)}>
                <About />
            </div>
            <div id="services" ref={(el) => (sectionRefs.current.services = el)}>
                <Service />
            </div>
            <div id="projects" ref={(el) => (sectionRefs.current.projects = el)}>
                <Projects />
            </div>
            <div id="location" ref={(el) => (sectionRefs.current.location = el)}>
                <Location />
            </div>
            <div id="contact" ref={(el) => (sectionRefs.current.contact = el)}>
                <Contact />
            </div>
        </div>
    );
};

export default Home;
