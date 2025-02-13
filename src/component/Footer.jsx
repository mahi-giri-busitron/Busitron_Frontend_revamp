import React, { useEffect, useState } from "react";
import ArrowIcon from "../assets/svgs/arrow";
import LOGOFOO from "../assets/svgs/logoFooter";
import CodeIcon from "../assets/svgs/code";
import ProfileIcon from "../assets/svgs/profile";
import KORIcon from "../assets/svgs/kor";
import SettingIcon from "../assets/svgs/setting";

const services = [
    {
        label: "Remote Hiring for Overseas Developers",
        icon: <CodeIcon />,
        link: "#",
    },
    {
        label: "Remote Hiring for Non-Developers",
        icon: <ProfileIcon />,
        link: "#",
    },
    {
        label: "Hiring Foreigners Who Speak indian",
        icon: <KORIcon />,
        link: "#",
    },
    {
        label: "Services for Utilizing Overseas Developers",
        icon: <SettingIcon />,
        link: "#",
    },
];

const Footer = () => {
    return (
        <footer className="bg-[#FBFBFB] py-10 px-6 text-gray-700">
            <div className="max-w-7xl mx-auto space-y-10 p-5">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-8 items-start">
                    {/* Logo Section */}
                    <div className="flex flex-col items-start text-start">
                        <LOGOFOO />
                        <p className="mt-2 text-sm font-black text-[#343741]">
                            Lorem ipsum dolor sit, amet consectetur adipisicing
                            elit.
                        </p>
                        <div className="mt-4 text-xs font-black text-[#5E626F] space-y-1 ">
                            <p>010-0000-0000</p>
                            <p>aaaaaa@naver.com</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        {services.map((service, index) => (
                            <div
                                key={index}
                                className="bg-white p-4 rounded-lg flex flex-col items-start"
                            >
                                <span className="text-3xl">{service.icon}</span>
                                <p className="mt-2 font-black text-sm text-[#343741]">
                                    {service.label}
                                </p>
                                <a
                                    href={service.link}
                                    className="font-black text-xs text-[#5E626F] flex items-center mt-2 gap-1"
                                >
                                    Go to Service <ArrowIcon />
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
                    <div className="flex flex-col gap-6 lg:flex-row lg:w-full">
                        <div className="flex flex-wrap gap-6 lg:flex-nowrap lg:w-1/2">
                            <div className="flex-1">
                                <p className="font-black text-sm text-[#343741]">
                                    Company Name
                                </p>
                                <p className="text-[#5E626F] font-black text-xs">
                                    Lorem
                                </p>
                                <p className="text-[#5E626F] font-black text-xs">
                                    Lorem ipsum
                                </p>
                            </div>

                            <div className="flex-1">
                                <p className="font-black text-sm text-[#343741]">
                                    CEO
                                </p>
                                <p className="text-[#5E626F] font-black text-xs">
                                    Lorem ipsum Kim
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col lg:flex-row gap-6 lg:w-1/2">
                            <div className="flex-1">
                                <p className="font-black text-sm text-[#343741]">
                                    Lorem ipsum dolor sit
                                </p>
                                <p className="text-[#5E626F] font-black text-xs">
                                    427-86-01187
                                </p>
                                <p className="text-[#5E626F] font-black text-xs">
                                    U74110DL2016PTC290812
                                </p>
                            </div>

                            <div className="flex-1">
                                <p className="font-black text-sm text-[#343741]">
                                    Address
                                </p>
                                <p className="text-[#5E626F] font-black text-xs">
                                    Lorem, ipsum dolor sit amet consectetur
                                    adipisicing elit. Reiciendis
                                </p>
                                <p className="text-[#5E626F] font-black text-xs">
                                    Lorem ipsum dolor sit amet consectetur
                                    adipisicing elit. Eos, <br />
                                    110053 India
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-start text-sm text-gray-500">
                    © {new Date().getFullYear()} Lorem
                </div>
            </div>
        </footer>
    );
};

export default Footer;
