import React from "react";
import { motion } from 'framer-motion'
import { Button } from "primereact/button";
import Products from "./Products.jsx";
import EventPage from "./EventPage.jsx";

const Homepage = () => {
    return (
        <>
            <div className="h-auto bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center">
                        {/* Left Content */}
                        <motion.div
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="left_content p-4 my-4">
                                <motion.h6
                                    className="text-[#00715D] text-lg md:text-xl font-bold mb-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    Speak Hope for the Homeless
                                </motion.h6>
                                <motion.h1
                                    className="text-4xl md:text-3xl lg:text-[65px] leading-none font-bold my-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    Donate to children & senior citizens.
                                </motion.h1>
                                <motion.p
                                    className="my-4 text-sm md:text-base"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Sapiente vero omnis
                                    excepturi, reiciendis aperiam officia.
                                </motion.p>
                                <motion.div
                                    className="button_wrapper_left flex gap-2 flex-wrap m-0 md:m-4"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.1 }}
                                    viewport={{ once: true }}
                                >
                                    <Button label="Donate Now" className="rounded-[20px]" />
                                    <Button label="Join Volunteers" severity="success" className="sm:!ml-0" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Content */}
                        <motion.div
                            className="w-full md:w-1/2"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <div className="right-content p-4 my-4">
                                <figure className="h-[250px] md:h-[350px] w-full">
                                    <img
                                        src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                        className="h-full w-full rounded-[10px] object-cover"
                                        alt="Donation"
                                    />
                                </figure>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
            <Products />
            <EventPage />
        </>
    );
};

export default Homepage;