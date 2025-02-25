import React, { useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useRef } from "react";

const deatail = [
    {
        id: 1,
        name: "Ajay mishra",
        emails: "ajaymf500@gmail.com",
        contact: "123456789",
    },
    {
        id: 2,
        name: "Sai mahesh",
        emails: "saimahes@gmail.com",
        contact: "5241639874",
    },
];

const cities = [
    { label: "New York", code: "NY" },
    { label: "Rome", code: "RM" },
    { label: "London", code: "LDN" },
    { label: "Istanbul", code: "IST" },
    { label: "Paris", code: "PRS" },
];

const Profile = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [details, setDetails] = useState(deatail);
    const [value, setValue] = useState("");
    const [selectedTitle, setSelectedTitle] = useState(null);
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [date, setDate] = useState(null);
    const [textarea, setTextarea] = useState("");
    const [lang, setLang] = useState(null);
    const [status, setStatus] = useState(null);

    const fileInputRef = useRef(null);
    const handleOnTabChange = (e) => {
        setActiveIndex(e.index);
    };
    const handleClick = () => {
        fileInputRef.current.click(); // Triggers the file input
    };
    const handleFileChange = (event) => {
        console.log(event.target.files); // Handle the selected files
    };

    const numberoptions = [
        { label: "91", value: 1 },
        { label: "92", value: 2 },
    ];

    const titleOptions = [
        { label: "MR", value: 1 },
        { label: "MR.s", value: 2 },
    ];

    const genderOptions = [
        { label: "Male", value: 1 },
        { label: "Female", value: 2 },
        { label: "Other", value: 3 },
    ];

    const languageOptions = [
        { label: "English", value: 1 },
        { label: "Hindi", value: 2 },
        { label: "Telugu", value: 3 },
    ];

    const maritalOptions = [
        { label: "Married", value: 1 },
        { label: "UnMarried", value: 2 },
        { label: "Bachlors", value: 3 },
    ];

    return (
        <div className="profile_parent_wrapper">
            <div className="Prifile_wrapper">
                <div className="card">
                    <TabView
                        activeIndex={activeIndex}
                        onTabChange={handleOnTabChange}
                    >
                        <TabPanel header="Profile">
                            <div className="profile_input_picker relative w-full max-w-[150px]">
                                <h5 className="my-2">Profile Picture</h5>
                                <label
                                    htmlFor="fileInput"
                                    className="profile-pic"
                                >
                                    <figure className=" group flex justify-center items-center border border-[#e5e7eb] w-[150px] h-[150px]">
                                        <img
                                            id="previewImage"
                                            className="h-full w-full"
                                            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                                            alt="Profile Picture"
                                        />
                                    </figure>
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <span
                                    onClick={handleClick}
                                    className="mt-0 mr-0 absolute flex items-center justify-center h-10 w-10 left-[110px] -bottom-0 bg-[#00715d] text-white"
                                >
                                    <i className="pi pi-pencil"></i>
                                </span>
                            </div>
                            <div className="form_wrapper my-5">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p>Your Name</p>
                                        <div className="input_name flex">
                                            <Dropdown
                                                value={selectedTitle}
                                                onChange={(e) =>
                                                    setSelectedTitle(e.value)
                                                }
                                                options={titleOptions}
                                                placeholder="Mr."
                                                className="w-1/4"
                                                optionLabel="label"
                                            />

                                            <InputText
                                                className="w-full"
                                                value={value}
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <p>Your Email</p>
                                        <div className="email">
                                            <InputText
                                                className="w-full"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Your Password</p>
                                        <div className="card flex justify-content-center">
                                            <div className="p-inputgroup w-full md:w-30rem">
                                                <InputNumber placeholder="Password" />
                                                <span className="p-inputgroup-addon">
                                                    <i className="pi pi-eye"></i>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-4 my-5">
                                    <div>
                                        <p>Mobile</p>
                                        <div className="input_name flex">
                                            <Dropdown
                                                value={selectedTitle} // Adjust if needed for mobile title/number
                                                onChange={(e) =>
                                                    setSelectedTitle(e.value)
                                                }
                                                options={numberoptions}
                                                placeholder="91"
                                                className="w-1/4"
                                                optionLabel="label"
                                            />

                                            <InputText
                                                className="w-full"
                                                value={value}
                                                onChange={(e) =>
                                                    setValue(e.target.value)
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Gender</p>
                                        <div className="card flex justify-content-center">
                                            <Dropdown
                                                value={gender}
                                                onChange={(e) =>
                                                    setGender(e.value)
                                                }
                                                options={genderOptions}
                                                placeholder="Select Gender"
                                                className="w-full md:w-14rem"
                                                optionLabel="label"
                                                checkmark={true}
                                                highlightOnSelect={false}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <p>Country</p>
                                        <div className="card flex justify-content-center">
                                            <Dropdown
                                                value={selectedCity}
                                                onChange={(e) =>
                                                    setSelectedCity(e.value)
                                                }
                                                options={cities}
                                                placeholder="Select a City"
                                                className="w-full md:w-14rem"
                                                optionLabel="label"
                                                checkmark={true}
                                                highlightOnSelect={false}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4 my-7">
                                <div>
                                    <p>Calendar</p>
                                    <div className="card flex justify-content-center">
                                        <Calendar
                                            value={date}
                                            onChange={(e) => setDate(e.value)}
                                            className="w-full"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Change language</p>
                                    <div className="card flex justify-content-center">
                                        <Dropdown
                                            value={lang}
                                            onChange={(e) => setLang(e.value)}
                                            options={languageOptions}
                                            placeholder="Select Language"
                                            className="w-full md:w-14rem"
                                            optionLabel="label"
                                            checkmark={true}
                                            highlightOnSelect={false}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <p>Marital Status</p>
                                    <div className="card flex justify-content-center">
                                        <Dropdown
                                            value={status} // Consider using a different state variable here if it's not country-related
                                            onChange={(e) => setStatus(e.value)}
                                            options={maritalOptions}
                                            placeholder="marital Status"
                                            className="w-full md:w-14rem"
                                            optionLabel="label"
                                            checkmark={true}
                                            highlightOnSelect={false}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="place_text_area my-7">
                                <p>Your Address</p>
                                <div className="card flex justify-content-center">
                                    <InputTextarea
                                        value={textarea}
                                        onChange={(e) =>
                                            setTextarea(e.target.value)
                                        }
                                        rows={3}
                                        cols={30}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                            <div className="place_text_area my-7">
                                <p>About</p>
                                <div className="card flex justify-content-center">
                                    <InputTextarea
                                        value={textarea}
                                        onChange={(e) =>
                                            setTextarea(e.target.value)
                                        }
                                        rows={3}
                                        cols={30}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel header="Emergency Contact">
                            <div className="emergency_wrapper">
                                <div class="grid grid-cols-3 gap-4 p-4">
                                    {details.map((data) => (
                                        <div
                                            class="detail_card   shadow-[0px_3px_8px_rgba(0,0,0,0.24)] p-4"
                                            key={data.id}
                                        >
                                            <ul
                                                type="none"
                                                className="m-0 mb-2"
                                            >
                                                <li>
                                                    <p>Name:</p>
                                                    <p>{data.name}</p>
                                                </li>
                                                <li>
                                                    <p>Email:</p>
                                                    <p>{data.emails}</p>
                                                </li>
                                                <li>
                                                    <p>Contact:</p>
                                                    <p>{data.contact}</p>
                                                </li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </TabPanel>
                    </TabView>
                </div>
            </div>
            {
                <div className={` ${activeIndex === 0 ? "block" : "hidden "}`}>
                    <div className="profile_button">
                        <Button label="Submit" />
                    </div>
                </div>
            }
        </div>
    );
};

export default Profile;
