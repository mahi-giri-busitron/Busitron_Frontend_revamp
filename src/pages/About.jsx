import React from "react";
import about1 from "../assets/image.webp";
import about from "../assets/about.webp";
import about2 from "../assets/about1.webp";
import about3 from "../assets/about2.webp";
import { motion } from "framer-motion";

const sections = [
    {
        title: "Our Business",
        content:
            "Our innovative portfolio of products and services addresses the test, assurance, and automation challenges of a new generation of technologies: 5G, SD-WAN, Cloud, Autonomous Vehicles, and beyond.",
        image: about1,
        reverse: false,
    },
    {
        title: "Our Customers",
        content:
            "Each year we assure the promises that more than 1,500 customers worldwide make to their customers, spanning communications, transportation, government, defense, aerospace, financial services, healthcare, retail, and more.",
        image: about2,
        reverse: true,
    },
    {
        title: "Our Solutions",
        content:
            "Our network, cybersecurity, and positioning experts work closely with customers to understand their needs and deliver solutions that cover their entire technology lifecycle, from the lab to real-world deployment.",
        image: about3,
        reverse: false,
    },
];

const Section = ({ title, content, image, reverse }) => (
    <motion.section
        className="text-gray-600 body-font"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }} 
    >
        <div className="container px-5 lg:py-20 mx-auto flex flex-wrap items-center mb-2">
            {!reverse && (
                <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden">
                    <img
                        className="object-cover object-center w-full h-full lg:w-[32rem]"
                        src={image}
                        alt={title}
                    />
                </div>
            )}
            <div className="flex flex-wrap lg:w-1/2 sm:w-2/3 content-start sm:pr-10">
                <div className="w-full px-4 my-3 mx-auto">
                    <div className="group w-fit">
                        <h1 className="text-gray-900 text-2xl lg:text-[2.3rem] font-medium tracking-tight leading-tight mb-2 cursor-pointer">
                            {title}
                        </h1>
                        <hr className="w-16 border-amber-500 border-2 mb-4 transition-all duration-300 group-hover:w-full" />
                    </div>
                    <p className="text-[#656c6f] text-sm md:text-md lg:text-lg leading-relaxed font-serif">
                        {content}
                    </p>
                </div>
            </div>
            {reverse && (
                <div className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0">
                    <img
                        className="object-cover object-center w-full h-full lg:w-[32rem]"
                        src={image}
                        alt={title}
                    />
                </div>
            )}
        </div>
    </motion.section>
);

const About = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="min-h-screen bg-gray-200"
        >
            <div className="container px-5 py-12 mx-auto max-w-[1240px]">
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:py-20 mx-auto flex flex-wrap items-center">
                        <motion.div
                            className="flex flex-wrap lg:w-1/2 sm:w-2/3 content-start sm:pr-10"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-full px-4 mb-6 mx-auto">
                                <h1 className="text-gray-900 text-4xl font-medium tracking-tight leading-tight mb-2">
                                    About Us
                                </h1>
                                <p className="text-[#656c6f] text-lg leading-relaxed font-serif">
                                    Spirent is the leading global provider of
                                    automated test and assurance solutions for
                                    networks, cybersecurity, and positioning.
                                </p>
                            </div>
                        </motion.div>
                        <motion.div
                            className="lg:w-1/2 sm:w-1/3 w-full rounded-lg overflow-hidden mt-6 sm:mt-0"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <img
                                className="object-cover object-center w-full h-full lg:h-[20rem]"
                                src={about}
                                alt="About Us"
                            />
                        </motion.div>
                    </div>
                </section>
                <motion.div
                    className="flex flex-col text-center w-full my-10"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <p className="lg:w-2/3 mx-auto text-[#2c54cd] text-md md:text-lg lg:text-xl">
                        We stand behind your promise to deliver a new generation
                        of technologies to your customers. Our automated test
                        and assurance solutions accelerate technology
                        development in the lab and ensure new products and
                        services perform in the real world.
                    </p>
                </motion.div>
                {sections.map((section, index) => (
                    <Section key={index} {...section} />
                ))}
            </div>
        </motion.div>
    );
};

export default About;
