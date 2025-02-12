import React from "react";
// import pic1 from "../assets/image.webp";
// import pic2 from "../assets/about2.webp";
import pic1 from "../assets/office2.jpg";
import pic2 from "../assets/office3.jpeg";

const Location = () => {
    return (
        <React.Fragment>
            <h1 className="text-4xl font-semibold md:my-5 md:mx-6 my-4 mx-1">
                Head Offices
            </h1>
            <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-14 md:mx-6 mx-2">
                <div>
                    <img src={pic1} className="rounded-lg" />
                </div>
                <div>
                    <img src={pic2} className="rounded-lg" />
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-14 md:mx-6 mx-2 bg-white text-black my-5">
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold">Corporate</h2>
                    <h3 className="text-xl font-semibold">
                        Spirent Communications plc
                    </h3>
                    <p className="text-md font-sans">
                        This is the registered office address of Spirent
                        Communications plc.
                    </p>
                    {/* <p className="text-md">Registered in England number 470893</p> */}
                    <p className="text-md font-serif">
                        2nd Floor, Uptown Cyberabad, 100 Feet Rd,
                    </p>
                    <p className="text-md font-serif">
                        Chanda Naik Nagar, Madhapur, Hyderabad,
                    </p>
                    <p className="text-md">Telangana</p>
                    <p className="text-md font-semibold">
                        Tel:{" "}
                        <a href="tel:+919000912345" className="text-blue-600">
                            +91 9000912345
                        </a>
                    </p>
                </div>

                <div className="space-y-3">
                    <h2 className="text-2xl font-bold">Operational</h2>
                    <h3 className="text-xl font-semibold">
                        Spirent Communications Inc.
                    </h3>
                    <p className="text-md font-serif">
                        BUSITRON6th Floor, Tower 42,25 Old Broad St,
                    </p>
                    <p className="text-md font-serif">London EC2N 1HQ,</p>
                    <p className="text-md font-serif">United Kingdom</p>
                    <p className="text-md font-semibold">
                        Tel:{" "}
                        <a href="tel:+14087527100" className="text-blue-600">
                            +1 (408) 752-7100
                        </a>
                    </p>
                </div>
            </section>
            <section className="grid sm:grid-cols-1 md:grid-cols-2 gap-14 md:mx-6 mx-2 my-4">
                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.1607296863!2d78.39084637341136!3d17.452019500943457!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb91006d28aae7%3A0x5a11d0e3f374bc19!2sBusitron%20IT%20Solutions%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1739270715695!5m2!1sen!2sin"
                        width="400"
                        height="400"
                        className="border-0 w-full rounded-lg"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>

                <div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d19863.09560031221!2d-0.084091!3d51.51529!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48761d397fe5ce29%3A0x2389d518edc2a0cc!2sBUSITRON!5e0!3m2!1sen!2sin!4v1739279537120!5m2!1sen!2sin"
                        width="400"
                        height="400"
                        className="border-0 w-full rounded-lg"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Location;
