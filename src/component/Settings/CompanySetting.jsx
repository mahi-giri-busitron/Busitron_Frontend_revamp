import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

const CompanySettings = () => {
    const [company, setCompany] = useState({
        name: "Busitron IT Solutions Pvt Ltd",
        email: "info@busitron.com",
        phone: "9999999999",
        website: "https://busitron.com",
    });

    const handleInputChange = (e, field) => {
        setCompany({ ...company, [field]: e.target.value });
    };

    return (
        <div className="p-5 bg-white shadow-md rounded-lg mb-1">
            <h2 className="headerTag">Company Settings</h2>
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
                        Company Email <span className="text-red-600">*</span>
                    </label>
                    <InputText
                        value={company.email}
                        onChange={(e) => handleInputChange(e, "email")}
                        className="w-full p-inputtext"
                    />
                </div>
                <div>
                    <label className="block font-medium">
                        Company Phone <span className="text-red-600">*</span>
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
    );
};

export default CompanySettings;
