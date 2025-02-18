import React from "react";
import { motion } from "framer-motion";
import ServiceLogo from "../assets/images/service.webp";
import Clock from "../assets/images/clock.webp";
import Money from "../assets/images/money.webp";
import Up from "../assets/images/up.webp";

const services = [
    {
        icon: Up,
        title: "Designed for steady long-term growth",
        description:
            "We’re on a mission to consistently outperform global stock markets. Our multi-manager global equities strategy does the heavy lifting, so you don’t have to.",
    },
    {
        icon: ServiceLogo,
        title: "Broad but highly selective",
        description:
            "We focus on finding strong companies with the best potential returns from around the world. Covering a whole range of industries and regions.",
    },
    {
        icon: Clock,
        title: "Aimed at smoothing out highs and lows",
        description:
            "We carefully manage our portfolio to make sure you don’t have too many eggs in one basket. Keeping risk under control and avoiding excessive volatility.",
    },
    {
        icon: Money,
        title: "A proven dividend track record",
        description:
            "We’re committed to increasing your dividends every year and have done so for five decades and counting.",
    },
];

const ServicesPage = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-white px-6 py-12"
        >
            {/* Page Heading */}
            <motion.div
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex justify-center items-start py-6"
            >
                <h1 className="text-4xl font-bold text-gray-900 text-center">
                    Our Services
                </h1>
            </motion.div>

            {/* Section Title */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center mb-12"
            >
                <div className="group w-fit mx-auto">
                    <h2 className="text-1xl md:text-3xl font-bold text-purple-800 cursor-pointer py-3">
                        Why Choose Our Investment Services?
                    </h2>
                    <motion.hr
                        initial={{ width: "20%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1 }}
                        className="w-16 border-amber-500 border-2 mb-4"
                    />
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                    Since 1888, we’ve been helping investors find their comfort
                    zone. Seeking out the best opportunities for returns, while
                    carefully managing risk. As one of the UK’s most established
                    investment trusts, we’ve navigated the ups and downs of
                    stock markets time and time again.
                </p>
            </motion.div>

            {/* Services Grid */}
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 },
                }}
                transition={{ staggerChildren: 0.1, duration: 0.6 }}
                className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12"
            >
                {services.map((service, index) => (
                    <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-6 bg-gray-100 rounded-xl shadow-lg text-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="flex justify-center mb-4"
                        >
                            <img
                                src={service.icon}
                                alt={service.title}
                                className="w-24 h-24 rounded-full"
                            />
                        </motion.div>
                        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600 text-sm md:text-base">
                            {service.description}
                        </p>
                    </motion.div>
                ))}
            </motion.div>

            {/* Video Section */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="w-fit flex flex-col items-center justify-center p-4 md:flex-row shadow-md rounded-l my-12"
            >
                <div className="flex flex-col justify-center items-center lg:ml-[173px] md:flex-row gap-7">

                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full md:w-1/2 text-center md:text-left mb-6 md:mb-0"
                    >
                        <div className="group w-fit mx-auto md:mx-0">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 cursor-pointer py-3">
                                Welcome to Our Video Section
                            </h2>
                            <motion.hr
                                initial={{ width: "20%" }}
                                animate={{ width: "100%" }}
                                transition={{ duration: 1 }}
                                className="w-16 border-amber-500 border-2 mb-4"
                            />
                        </div>
                        <p className="text-gray-700 leading-relaxed">
                            We believe in bringing you the best of the best.
                            Rather than relying on just one fund manager, we
                            have ten. An elite team with complementary talents -
                            handpicked by a leading investment manager, WTW, to
                            increase opportunity and spread risk.
                            <br />
                            We believe in bringing you the best of the best.
                            Rather than relying on just one fund manager, we
                            have ten. An elite team with complementary talents -
                            handpicked by a leading investment manager, WTW, to
                            increase opportunity and spread risk.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="w-full h-auto md:w-1/2 flex items-center justify-center"
                    >
                        <video
                            className="w-full max-w-md rounded-lg shadow-lg"
                            autoPlay
                            muted
                            loop
                            controls
                        >
                            <source
                                src="https://www.w3schools.com/html/mov_bbb.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ServicesPage;
