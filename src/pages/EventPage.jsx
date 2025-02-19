import React from "react";
import { motion } from "framer-motion";

const data = [
    {
        id: 1,
        img: "https://plus.unsplash.com/premium_photo-1681426687411-21986b0626a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
        name: "Jassoore",
        date: "02/12/2025",
    },
    {
        id: 2,
        img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
        name: "Jassoore",
        date: "02/12/2025",
    },
    {
        id: 3,
        img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D",
        name: "Jassoore",
        date: "02/12/2025",
    },
];

const EventPage = () => {
    return (
        <div className="event_page hidden md:block">
            <div className="container mx-auto p-4 max-w-screen-lg">
                <div className="heading_content text-center">
                    <motion.h6
                        className="text-[#00715D] text-lg md:text-xl lg:text-2xl font-bold my-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Our Event
                    </motion.h6>
                    <motion.h1
                        className="text-xl md:text-2xl lg:text-3xl font-bold my-2"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Our Upcoming Event
                    </motion.h1>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            className="p-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                        >
                            <motion.div
                                className="image_wrapper_product text-white p-6 rounded-lg shadow-md flex justify-center items-center bg-center bg-no-repeat bg-cover h-[200px] relative overflow-hidden"
                                style={{ backgroundImage: `url(${item.img})` }}
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="content button_wrapper_left text-center">
                                    <h5 className="text-lg font-semibold">
                                        {item.name}
                                    </h5>
                                    <p className="text-sm">{item.date}</p>
                                </div>
                                {/* Overlay */}
                                <motion.div
                                    className="overlay bg-black bg-opacity-50 absolute inset-0 flex items-center justify-center opacity-0"
                                    whileHover={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-white font-bold">
                                        Hello World
                                    </div>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default EventPage;
