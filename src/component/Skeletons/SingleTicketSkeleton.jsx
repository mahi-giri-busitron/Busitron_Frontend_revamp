import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

const SingleTicketSkeleton = (props) => {
    const { circleOrder = 0 } = props;

    return (
        <div className="p-4 h-full text-start">
            <div className="mx-auto">
                <div className="space-y-6">
                    <Card className="shadow-lg">
                        <div className="px-4 py-4 flex flex-col md:flex-row gap-6">
                            <div
                                className="w-full md:w-1/2 overflow-y-auto"
                                style={{ maxHeight: "70vh" }}
                            >
                                <div className="flex flex-wrap gap-3 mt-3 mb-8 items-center"></div>
                                <div className="mb-8">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        Ticket Subject
                                    </h2>
                                    <div className="p-4 bg-gray-50 rounded">
                                        <Skeleton height="3rem" />
                                    </div>
                                </div>
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        Description
                                    </h2>
                                    <div className="p-4 bg-gray-50 rounded">
                                        <Skeleton height="3rem" />
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 overflow-y-auto  "
                                style={{ maxHeight: "" }}
                            >
                                <div className="">
                                    <DataTable value={Array(5).fill({})}>
                                        <Column
                                            field="designation"
                                            header="Ticket Details"
                                            body={() => (
                                                <Skeleton height="3rem" />
                                            )}
                                        />
                                    </DataTable>
                                </div>

                                <div className="  mt-3">
                                    <DataTable value={Array(2).fill({})}>
                                        <Column
                                            field="designation"
                                            header="Dates"
                                            body={() => (
                                                <Skeleton height="3rem" />
                                            )}
                                        />
                                    </DataTable>
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
export default SingleTicketSkeleton;
