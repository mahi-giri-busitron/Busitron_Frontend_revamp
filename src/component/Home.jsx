// import React from "react";
// import About from "../pages/About.jsx";
// import Homepage from "../pages/Homepage.jsx";
// import Location from "../pages/Location.jsx";
// import Projects from "../pages/Projects.jsx";
// import Service from "../pages/Service.jsx";
// import Contact from "../pages/Contact.jsx";

// const Home = () => {
//     return (
//         <React.Fragment>
//             <div id="home">
//                 <Homepage />
//             </div>
//             <div id="about">
//                 <About />
//             </div>
//             <div id="services">
//                 <Service />
//             </div>
//             <div id="projects">
//                 <Projects />
//             </div>
//             <div id="location">
//                 <Location />
//             </div>
//             <div id="contact">
//                 <Contact />
//             </div>
//         </React.Fragment>
//     );
// };

// export default Home;

// Home.jsx
import React from "react";
import { motion } from "framer-motion";
import About from "../pages/About.jsx";
import Homepage from "../pages/Homepage.jsx";
import Location from "../pages/Location.jsx";
import Projects from "../pages/Projects.jsx";
import Service from "../pages/Service.jsx";
import Contact from "../pages/Contact.jsx";

const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, staggerChildren: 0.2 },
    },
};

const Home = () => {
    return (
        <React.Fragment>
            {[
                { id: "home", Component: Homepage },
                { id: "about", Component: About },
                { id: "services", Component: Service },
                { id: "projects", Component: Projects },
                { id: "location", Component: Location },
                { id: "contact", Component: Contact },
            ].map(({ id, Component }) => (
                <motion.div
                    key={id}
                    id={id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={sectionVariants}
                >
                    <Component />
                </motion.div>
            ))}
        </React.Fragment>
    );
};

export default Home;
