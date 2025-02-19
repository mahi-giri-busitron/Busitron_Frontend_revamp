import React from "react";
import About from "../pages/About.jsx";
import Homepage from "../pages/Homepage.jsx";
import Location from "../pages/Location.jsx";
import Projects from "../pages/Projects.jsx";
import Service from "../pages/Service.jsx";
import Contact from "../pages/Contact.jsx";

const Home = () => {
    return (
        <div className="pt-12">
            <div id="home">
                <Homepage />
            </div>
            <div id="about">
                <About />
            </div>
            <div id="services">
                <Service />
            </div>
            <div id="projects">
                <Projects />
            </div>
            <div id="location">
                <Location />
            </div>
            <div id="contact">
                <Contact />
            </div>
        </div>
    );
};

export default Home;
