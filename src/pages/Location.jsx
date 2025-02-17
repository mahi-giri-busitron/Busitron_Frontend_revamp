import React from "react";
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
        <>
            <h1 className="text-4xl text-center font-bold md:my-8 md:mx-14 my-4 mx-10">
                Our Offices
            </h1>

            <div className="w-full max-w-[1240px] mx-auto px-2">
                <section className="flex flex-col md:grid md:grid-cols-2 gap-14 md:mx-20 mx-10 lg:mx-10">
                    {arr.map((item) => (
                        <div className="flex flex-col sm:flex-col md:block">
                            <img src={item.img} className="rounded-lg w-full" />
                            <div className="space-y-3 my-3 md:min-h-[320px]">
                                <h2 className="text-2xl font-bold">
                                    {item.name}
                                </h2>
                                <h3 className="text-xl font-semibold">
                                    {item.type}
                                </h3>
                                <p className="text-md font-sans">{item.reg}</p>
                                <p className="md:text-md font-serif ">
                                    {item.ad1}
                                </p>
                                <p className="md:text-md font-serif ">
                                    {item.ad2}
                                </p>
                                <p className="md:text-md ">{item.ad3}</p>
                                <p className="text-md font-semibold">
                                    Tel:
                                    <a
                                        href={`tel:${item.phone}`}
                                        className="text-blue-600"
                                    >
                                        {item.phone}
                                    </a>
                                </p>
                            </div>

                            <div className="md:my-0 my-2">
                                <iframe
                                    src={item.frame}
                                    width="270"
                                    height="300"
                                    className="border-0 w-full rounded-lg"
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        </div>
                    ))}
                </section>
            </div>
        </>
    );
};

export default Location;
