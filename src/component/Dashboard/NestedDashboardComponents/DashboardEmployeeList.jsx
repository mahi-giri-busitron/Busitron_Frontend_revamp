import React from "react";
const DashboardEmployeeList = () => {
    const employees = [
        {
            name: "RamaVeeraManikantaBalaji",
            email: "balaji1@gmail.com",
            dob: "03-07-2000",
        },
        {
            name: "PavanReddy",
            email: "pavankumarreddy123456@gmail.com",
            dob: "03-07-2000",
        },
        { name: "Leela", email: "leela123@gmail.com", dob: "03-07-2000" },
        {
            name: "Zoheb Shaik",
            email: "zoheb.shaik.developer@gmail.com",
            dob: "03-07-2000",
        },
        { name: "Rakesh", email: "rokybahi@gmail.com", dob: "03-07-2000" },
        {
            name: "Mahesh Giri",
            email: "mahesh123@gmail.com",
            dob: "03-07-2000",
        },
        {
            name: "Manikanta Laveti 321 hhhh ddd",
            email: "mani123@gmail.com",
            dob: "03-07-2000",
        },
    ];
    return (
        <div className="pt-4 px-4">
            <div className="border-b-2 border-gray-200 pb-2">
                <div className="flex justify-between font-semibold text-lg mt-3 px-3">
                    <p className="w-16">S.No</p>
                    <p className="flex-1 min-w-[80px] ">Name</p>
                    <p className="flex-1 min-w-[150px]">Email</p>
                    <p className="w-32 pl-3">DOB</p>
                </div>
            </div>  
            <div className="border-gray-200 rounded-md mt-2">
                {employees.map((employee, index) => (
                    <div
                        key={index}
                        className="flex justify-between text-[0.9rem] items-center text-gray-600 py-4 border-b-1 border-gray-200 px-3"
                    >
                        <p className="  w-16 truncate pr-4">{index + 1}</p>
                        <p className="flex-1 min-w-[80px]  truncate pr-4">
                            {employee.name}
                        </p>
                        <p className="flex-1 min-w-[150px] truncate pr-4">
                            {employee.email}
                        </p>
                        <p className="w-32 pl-3">{employee.dob}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DashboardEmployeeList;
