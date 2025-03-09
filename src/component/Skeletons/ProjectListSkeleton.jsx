import React from "react";
import "primeicons/primeicons.css";
import { Button } from "primereact/button";
import { Skeleton } from "primereact/skeleton";

const ProjectListSkeleton = () => {
    const { circleOrder = 0 } = props;

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 flex-row-reverse">
                <div
                    className={`col-span-2 md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  md:hidden order-${circleOrder}`}
                >
                    {[...Array(5)].map((_, index) => (
                        <div
                            key={index}
                            className="shadow-md  rounded-lg bg-white"
                        >
                            <Skeleton
                                width="100%"
                                height="4.5rem"
                                className="mb-2"
                            />
                        </div>
                    ))}
                </div>

                <div className="col-span-2 md:col-span-2 lg:col-span-4 bg-white p-4 shadow-md rounded-lg flex flex-col md:flex-row items-center ">
                    <div
                        className={`md:w-2/3 h-full flex flex-col items-center justify-center order-${circleOrder}`}
                    >
                        <Skeleton width="50%" height="3rem" className="mb-4" />
                        <div className="md:p-1 lg:p-1 w-full flex justify-center">
                            <Skeleton shape="circle" size="15rem" />
                        </div>
                        <div className=" mt-3 w-50 flex flex-wrap gap-4 justify-center">
                            <Skeleton width="3rem" />
                            <Skeleton width="3rem" />
                            <Skeleton width="3rem" />
                            <Skeleton width="3rem" />
                            <Skeleton width="3rem" />
                        </div>
                    </div>
                    <div className="md:w-1/3 mt-4 md:mt-0 md:ml-4 hidden md:block">
                        {[...Array(5)].map((_, index) => (
                            <div
                                key={index}
                                className="pl-4 shadow-md mt-2  rounded-lg bg-white"
                            >
                                <Skeleton
                                    width="10rem"
                                    height="4.5rem"
                                    className="mb-2"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <DataTable value={Array(10).fill({})} paginator rows={10}>
                <Column
                    field="employeeId"
                    header="User"
                    body={() => <Skeleton />}
                />
                <Column
                    field="name"
                    header="Completed"
                    body={() => <Skeleton />}
                />
                <Column
                    field="email"
                    header="Pending"
                    body={() => <Skeleton />}
                />
                <Column
                    field="phoneNumber"
                    header="Overdue"
                    body={() => <Skeleton />}
                />
                <Column
                    field="designation"
                    header="Complition Rate"
                    body={() => <Skeleton />}
                />
            </DataTable>
        </>
    );
};

export default ProjectListSkeleton;
