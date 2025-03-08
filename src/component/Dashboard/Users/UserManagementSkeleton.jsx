import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";
import { Card } from "primereact/card";
function UserDetailsSkeleton() {
    return (
        <div className="p-6  mx-auto">
            <Card className="shadow-lg">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-4">
                    <div className="w-1/2 md:w-1/5 aspect-square lg:max-w-[240px] h-full">
                        <Skeleton
                            className="mr-2 w-1/2 md:w-1/5 aspect-square lg:max-w-[240px]"
                            height="1"
                        ></Skeleton>
                    </div>
                    <div className="flex flex-col flex-1">
                        <div className="pb-3 ">
                            <Skeleton
                                height="2rem"
                                width="1/2"
                                className="mb-2"
                            ></Skeleton>

                            <Skeleton
                                height="2rem"
                                width="1/2"
                                className="mb-2"
                            ></Skeleton>

                            <Skeleton
                                height="2rem"
                                width="1/2"
                                className="mb-2"
                            ></Skeleton>

                            <hr></hr>
                        </div>
                        <div className="flex  flex-1 w-full  h-full  justify-around text-center mt-4">
                            <div className="shadow-lg p-4 flex-1 gap-3  flex-wrap flex flex-col justify-between h-full">
                                <Skeleton
                                    height="5rem"
                                    className="mb-2"
                                ></Skeleton>
                            </div>
                            <div className="shadow-lg p-4 flex-1 md:w-50 flex flex-col justify-between">
                                <Skeleton
                                    height="5rem"
                                    className="mb-2"
                                ></Skeleton>
                            </div>
                            <div className="shadow-lg p-4 flex-1 md:w-50 flex flex-col justify-between">
                                <Skeleton
                                    height="5rem"
                                    className="mb-2"
                                ></Skeleton>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
            <Divider />
            <Card className="shadow-lg mt-4">
                <div className="flex flex-wrap justify-between gap-2">
                    <Skeleton height="2rem" className="mb-2"></Skeleton>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>

                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>
                <div className="grid grid-cols-1  gap-4 text-gray-600">
                    <div className="grid grid-cols-2 lg:grid-cols-4  p-3 items-center  gap-4">
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                        <Skeleton height="2rem" className="mb-2"></Skeleton>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default UserDetailsSkeleton;
