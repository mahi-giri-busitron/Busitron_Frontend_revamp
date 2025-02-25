import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import axios from "axios";

const CompanySettings = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [company, setCompany] = useState({
        id: "",
        companyName: "",
        companyEmail: "",
        phoneNumber: "",
        website: "",
    });

    const items = [{ label: "Company Settings", icon: "pi pi-building" }];

    const handleInputChange = (e, field) => {
        setCompany({ ...company, [field]: e.target.value });
    };

    const fetchCompanyData = async () => {
        const response = await axios.get("/api/v1/setting/company_setting");
        setCompany({
            id: response.data.data[0]._id,
            companyName: response.data.data[0].companyName,
            companyEmail: response.data.data[0].companyEmail,
            phoneNumber: response.data.data[0].phoneNumber,
            website: response.data.data[0].website,
        });
    };

    const handleSave = async () => {
        await axios.post("/api/v1/setting/update_company_setting", company);
    };

    useEffect(() => {
        fetchCompanyData();
    }, []);

    return (
        <div>
            <div className="">
                <TabMenu
                    model={items}
                    activeIndex={activeIndex}
                    onTabChange={(e) => setActiveIndex(e.index)}
                />
            </div>
            <div className="p-5 bg-white shadow-md rounded-lg mb-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block font-medium">
                            Company Name <span className="text-red-600">*</span>
                        </label>
                        <InputText
                            value={company.companyName}
                            onChange={(e) =>
                                handleInputChange(e, "companyName")
                            }
                            className="w-full p-inputtext"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">
                            Company Email{" "}
                            <span className="text-red-600">*</span>
                        </label>
                        <InputText
                            value={company.companyEmail}
                            onChange={(e) =>
                                handleInputChange(e, "companyEmail")
                            }
                            className="w-full p-inputtext"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">
                            Company Phone{" "}
                            <span className="text-red-600">*</span>
                        </label>
                        <InputText
                            value={company.phoneNumber}
                            onChange={(e) =>
                                handleInputChange(e, "phoneNumber")
                            }
                            className="w-full p-inputtext"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">
                            Company Website{" "}
                        </label>
                        <InputText
                            value={company.website}
                            onChange={(e) => handleInputChange(e, "website")}
                            className="w-full p-inputtext"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <Button
                        label="Save"
                        className="mt-9"
                        icon="pi pi-check"
                        onClick={handleSave}
                    />
                </div>
            </div>
        </div>
    );
};

export default CompanySettings;
