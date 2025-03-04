import axios from "axios";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch } from "react-redux";
import { fetchAllUser } from "../../../redux/userManagementSlice";

const DashboardEmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const dispatch = useDispatch();
    async function getEmployees() {
        try {
            const apiResponse = await dispatch(fetchAllUser());
            let employees = apiResponse?.payload?.data || [];
            const today = new Date();
            const todayMonth = today.getMonth() + 1;
            const todayDay = today.getDate();

            let upcomingBirthdays = employees
                .map((emp) => {
                    if (!emp.dateOfBirth) return null;

                    let dob = new Date(emp.dateOfBirth);
                    if (isNaN(dob.getTime())) return null;

                    let month = dob.getMonth() + 1;
                    let day = dob.getDate();

                    let nextBirthday = new Date(
                        today.getFullYear(),
                        month - 1,
                        day
                    );

                    if (
                        month < todayMonth ||
                        (month === todayMonth && day < todayDay)
                    ) {
                        nextBirthday.setFullYear(today.getFullYear() + 1);
                    }

                    return { ...emp, nextBirthday };
                })
                .filter((emp) => emp !== null)
                .sort((a, b) => a.nextBirthday - b.nextBirthday)
                .slice(0, 7);

            setEmployees(upcomingBirthdays);
        } catch (err) {
            console.error("Error fetching employees:", err.message);
        }
    }

    useEffect(() => {
        getEmployees();
    }, []);

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
                {employees &&
                    employees.map((employee, index) => (
                        <div
                            key={index}
                            className="flex justify-between text-[0.9rem] items-center text-gray-600 py-4 border-b-1 border-gray-200 px-3"
                        >
                            <p className="  w-16 truncate pr-4">{index + 1}</p>
                            <p className="flex-1 min-w-[80px]  truncate pr-4">
                                {employee?.name}
                            </p>
                            <p className="flex-1 min-w-[150px] truncate pr-4">
                                {employee?.email}
                            </p>
                            <p className="w-32 pl-3">
                                {moment(employee?.dateOfBirth).format(
                                    "DD-MM-YYYY"
                                )}
                            </p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default DashboardEmployeeList;
