import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const PerformanceSkeleton = () => {
    return (
        <div className="p-6 bg-gray-100 min-h-screen border-2 border-amber-800">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 ">
                <div className="col-span-2 md:col-span-2 lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 md:mt-0 md:ml-4 md:hidden">
                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">Total Tasks</h3>
                        <p className="text-2xl font-semibold text-gray-700">
                            {/* {tasks?.totalTasks} */}
                        </p>
                    </Card>

                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">To Do</h3>
                        <p className="text-2xl font-semibold text-green-600">
                            {tasks?.["To Do"]}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">Completed</h3>
                        <p className="text-2xl font-semibold text-green-600">
                            {tasks?.Completed}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">Pending</h3>
                        <p className="text-2xl font-semibold text-yellow-500">
                            {tasks?.Pending}
                        </p>
                    </Card>
                    <Card className="shadow-md">
                        <h3 className="text-xl font-bold">Overdue</h3>
                        <p className="text-2xl font-semibold text-red-500">
                            {tasks?.overdue}
                        </p>
                    </Card>
                </div>
                <div className="col-span-2 md:col-span-2 lg:col-span-4 bg-white p-4 shadow-md rounded-lg flex flex-col md:flex-row items-center">
                    <div className="md:w-2/3 h-full  flex flex-col  items-center justify-center ">
                        <h3 className="text-xl font-bold mb-2">
                            Task Breakdown
                        </h3>
                        <div className="md:p-1 lg:p-1">
                            <Pie data={chartData} options={chartOptions} />
                        </div>
                    </div>
                    <div className="md:w-1/3 mt-4 md:mt-0 md:ml-4 hidden md:block">
                        <Card className="pl-4 shadow-md">
                            <h3 className="text-xl font-bold">Total Tasks</h3>
                            <p className="text-2xl font-semibold text-gray-700">
                                {tasks?.["totalTasks"]}
                            </p>
                        </Card>

                        <Card className="pl-4 shadow-md mt-4">
                            <h3 className="text-xl font-bold">To Do</h3>
                            <p className="text-2xl font-semibold text-green-600">
                                {tasks?.["To Do"]}
                            </p>
                        </Card>
                        <Card className="pl-4 shadow-md mt-4">
                            <h3 className="text-xl font-bold">Completed</h3>
                            <p className="text-2xl font-semibold text-green-600">
                                {tasks?.["Completed"]}
                            </p>
                        </Card>
                        <Card className="pl-4 shadow-md mt-4">
                            <h3 className="text-xl font-bold">Pending</h3>
                            <p className="text-2xl font-semibold text-yellow-500">
                                {tasks?.["Pending"]}
                            </p>
                        </Card>
                        <Card className="pl-4 shadow-md mt-4">
                            <h3 className="text-xl font-bold">Overdue</h3>
                            <p className="text-2xl font-semibold text-red-500">
                                {tasks?.["overdue"]}
                            </p>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
