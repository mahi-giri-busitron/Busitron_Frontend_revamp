import React from "react";
import { motion } from "framer-motion";

const data = [
    {
        id: 1,
        icon: "pi pi-apple",
        name: "Support",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!",
    },
    {
        id: 2,
        icon: "pi pi-graduation-cap",
        name: "Education",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!",
    },
    {
        id: 3,
        icon: "pi pi-user",
        name: "Volunteers",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!",
    },
    {
        id: 4,
        icon: "pi pi-box",
        name: "Donation",
        description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo, hic!",
    },
];

const Products = () => {
    return (
        <div className="product h-auto bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 items-center justify-center">
                    {data.map((item, index) => (
                        <motion.div
                            key={index}
                            className="product_card p-4 w-full"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: index * 0.2 }}
                            viewport={{ once: true }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div className="product_wrapper bg-white text-center p-4 shadow-lg rounded-lg">
                                <motion.span
                                    className="h-[50px] w-[50px] rounded-full flex justify-center items-center bg-[#00715D] text-white text-xl mx-auto"
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    viewport={{ once: true }}
                                >
                                    <i className={item.icon}></i>
                                </motion.span>
                                <h6 className="text-lg md:text-xl font-bold my-2 text-[#00715D]">
                                    {item.name}
                                </h6>
                                <p className="text-sm md:text-base text-gray-600">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Products;