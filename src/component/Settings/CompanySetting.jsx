import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";

const CompanySettings = () => {
    const [activeIndex, setActiveIndex] = useState(0);

    const [company, setCompany] = useState({
        name: "Busitron IT Solutions Pvt Ltd",
        email: "info@busitron.com",
        phone: "9999999999",
        website: "https://busitron.com",
    });

    const handleInputChange = (e, field) => {
        setCompany({ ...company, [field]: e.target.value });
    };
    const items = [{ label: "Company Settings", icon: "pi pi-building" }];

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
                            value={company.name}
                            onChange={(e) => handleInputChange(e, "name")}
                            className="w-full p-inputtext"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">
                            Company Email{" "}
                            <span className="text-red-600">*</span>
                        </label>
                        <InputText
                            value={company.email}
                            onChange={(e) => handleInputChange(e, "email")}
                            className="w-full p-inputtext"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">
                            Company Phone{" "}
                            <span className="text-red-600">*</span>
                        </label>
                        <InputText
                            value={company.phone}
                            onChange={(e) => handleInputChange(e, "phone")}
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
                    <Button label="Save" className="mt-9" icon="pi pi-check" />
                </div>
            </div>
        </div>
    );
};

export default CompanySettings;
