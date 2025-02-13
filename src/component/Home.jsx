import React from "react";
import About from "../pages/About.jsx";
import Homepage from "../pages/Homepage.jsx";
import Location from "../pages/Location.jsx";
import Projects from "../pages/Projects.jsx";
import Service from "../pages/Service.jsx";
import Contact from "../pages/Contact.jsx";

const Home = () => {
    return (
        <React.Fragment>
            <Homepage />
            <About />
            <Service />
            <Projects />
            <Location />
            <Contact />
        </React.Fragment>
    );
};

export default Home;
