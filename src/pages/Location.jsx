import React from "react";
import { motion } from "framer-motion";
import pic1 from "../assets/office2.jpg";
import pic2 from "../assets/office3.jpeg";

const Location = () => {
    let arr = [
        {
            name: "Corporate",
            type: "Spirent Communications Plc",
            reg: "This is the registered office address of Spirent Communication Plc.",
            ad1: "2nd Floor, Uptown Cyberabad, 100 Feet Rd,",
            ad2: "Chanda Naik Nagar, Madhapur, Hyderabad,",
            ad3: "Telangana",
            img: pic1,
            phone: "+91 9000912345",
            frame: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1607296863!2d78.39084637341136!3d17.452019500943457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91006d28aae7%3A0x5a11d0e3f374bc19!2sBusitron%20IT%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1739270715695!5m2!1sen!2sin",
        },
        {
            name: "Operational",
            type: "Spirent Communications Inc",
            reg: "This is the registered office address of Spirent Communication Inc.",
            ad1: "BUSITRON 6th Floor, Tower 42,25 Old Broad St,",
            ad2: "London EC2N 1HQ,",
            ad3: "United Kingdom",
            img: pic2,
            phone: "+1 (408) 752-7100",
            frame: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19863.09560031221!2d-0.084091!3d51.51529!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d397fe5ce29%3A0x2389d518edc2a0cc!2sBUSITRON!5e0!3m2!1sen!2sin!4v1739279537120!5m2!1sen!2sin",
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <motion.h1
                className="text-4xl text-center font-bold md:my-8 md:mx-14 my-4 mx-10"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                Our Offices
            </motion.h1>

            <section className="flex flex-col md:grid md:grid-cols-2 gap-14 md:mx-16 mx-10">
                {arr.map((item, index) => (
                    <motion.div
                        key={index}
                        className="flex flex-col sm:flex-col md:block bg-white p-5 rounded-lg shadow-lg"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                    >
                        <motion.img
                            src={item.img}
                            className="rounded-lg w-full shadow-md"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            whileHover={{ scale: 1.05 }}
                        />

                        <motion.div
                            className="space-y-3 my-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <motion.h2
                                className="text-2xl font-bold"
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                            >
                                {item.name}
                            </motion.h2>

                            <motion.h3
                                className="text-xl font-semibold"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                            >
                                {item.type}
                            </motion.h3>

                            <motion.p
                                className="text-md font-sans"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                            >
                                {item.reg}
                            </motion.p>

                            <motion.p
                                className="text-md font-serif"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                            >
                                {item.ad1}
                            </motion.p>

                            <motion.p
                                className="text-md font-serif"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.8 }}
                            >
                                {item.ad2}
                            </motion.p>

                            <motion.p
                                className="text-md"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 0.9 }}
                            >
                                {item.ad3}
                            </motion.p>

                            <motion.p
                                className="text-md font-semibold"
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8, delay: 1 }}
                            >
                                Tel:
                                <a
                                    href={`tel:${item.phone}`}
                                    className="text-blue-600 ml-1"
                                >
                                    {item.phone}
                                </a>
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="md:my-0 my-2"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                        >
                            <motion.iframe
                                src={item.frame}
                                width="270"
                                height="300"
                                className="border-0 w-full rounded-lg"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                whileHover={{ scale: 1.02 }}
                            ></motion.iframe>
                        </motion.div>
                    </motion.div>
                ))}
            </section>
        </motion.div>
    );
};

export default Location;
