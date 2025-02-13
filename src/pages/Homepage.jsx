import React from "react";

import { Button } from "primereact/button";
import Products from "./Products";
import EventPage from "./EventPage";

const Homepage = () => {
    return (
        <div className="h-auto bg-white" >
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap items-center ">
                    {/* Left Content */}
                    <div className="w-full md:w-1/2 ">
                        <div className="left_content p-4 my-4">
                            <h6 className="text-[#00715D] text-lg md:text-xl font-bold mb-3">
                                Speak Hope for the Homeless
                            </h6>
                            <h1 className="text-4xl md:text-3xl lg:text-[65px] leading-none font-bold my-4">
                                Donate to children & senior citizens.
                            </h1>
                            <p className="my-4 text-sm md:text-base">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Sapiente vero omnis excepturi,
                                reiciendis aperiam officia.
                            </p>
                            <div className="button_wrapper_left flex gap-2 flex-wrap">
                                <Button
                                    label="Donate Now"
                                    className="rounded-[20px]"
                                />
                                <Button
                                    label="Join Volunteers"
                                    severity="success"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Right Content */}
                    <div className="w-full md:w-1/2 ">
                        <div className="right-content p-4 my-4">
                            <figure className="h-[250px] md:h-[350px] w-full">
                                <img
                                    src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                    className="h-full w-full rounded-[10px] object-cover"
                                    alt="Donation"
                                />
                            </figure>
                        </div>
                    </div>
                </div>
            </div>
            <Products />
            <EventPage />
        </div>
    );
};

export default Homepage;
