import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Accordion, AccordionTab } from "primereact/accordion";
import { Divider } from "primereact/divider";
import { useDispatch, useSelector } from "react-redux";
import { getSingleEstimate } from "../../../redux/estimateSlice";
import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import moment from "moment";

const SingleEstimate = () => {
    let { estimateId } = useParams();

    let dispatch = useDispatch();
    let singleEstimateData = useSelector(
        (store) => store?.estimate?.singleEstimateData
    );

    let isSingleLoading = useSelector(
        (store) => store?.estimate?.isSingleLoading
    );

    useEffect(() => {
        dispatch(getSingleEstimate(estimateId));
    }, [estimateId]);

    if (isSingleLoading) {
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
                                    <div className="mb-4">
                                        <h2 className="text-lg font-bold text-gray-600 mb-2">
                                            Estimate Subject
                                        </h2>
                                        <div className="p-4 bg-gray-50 rounded">
                                            <Skeleton height="3rem" />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <h2 className="text-lg font-bold text-gray-600 mb-2">
                                            Project Name
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
                                        </DataTable>{" "}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="mx-auto">
                <div className="space-y-6">
                    <Card className="shadow-lg">
                        <div className="px-4 py-4 flex flex-col md:flex-row gap-6">
                            <div
                                className="w-full md:w-1/2 overflow-y-auto"
                                style={{ maxHeight: "70vh" }}
                            >
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        Estimate Number
                                    </h2>
                                    <div className="p-4 bg-gray-50 rounded">
                                        <p>
                                            {singleEstimateData?.estimateNumber}
                                        </p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        Project Name
                                    </h2>
                                    <div className="p-4 bg-gray-50 rounded">
                                        <p>{singleEstimateData?.projectName}</p>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        File Attachments
                                    </h2>
                                    {singleEstimateData?.uploadedFile
                                        ?.length ? (
                                        singleEstimateData.uploadedFile.map(
                                            (val) => {
                                                let fileName = val
                                                    ?.split("/")
                                                    .pop()
                                                    .split("-")
                                                    .slice(1)
                                                    .join("-");
                                                return (
                                                    <div
                                                        className="p-1 text-sm underline text-blue-600"
                                                        key={val}
                                                    >
                                                        <a
                                                            target="_blank"
                                                            href={val}
                                                            rel="noopener noreferrer"
                                                        >
                                                            {fileName}
                                                        </a>
                                                    </div>
                                                );
                                            }
                                        )
                                    ) : (
                                        <p>NA</p>
                                    )}
                                </div>
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-gray-600 mb-2">
                                        Description
                                    </h2>
                                    <div className="p-4 bg-gray-50 rounded">
                                        <p>
                                            {singleEstimateData?.description ||
                                                "NA"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="w-full md:w-1/2 overflow-y-auto"
                                style={{ maxHeight: "" }}
                            >
                                <Accordion
                                    className="w-full mb-2"
                                    activeIndex={0}
                                >
                                    <AccordionTab header="Estimate Details">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>Client Name</strong>
                                                </span>
                                                <span>
                                                    {
                                                        singleEstimateData
                                                            ?.clientId?.name
                                                    }
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>Assign By</strong>
                                                </span>
                                                <span>
                                                    {
                                                        singleEstimateData
                                                            ?.userId?.name
                                                    }
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Project Status
                                                    </strong>
                                                </span>
                                                <span>
                                                    {
                                                        singleEstimateData?.projectStatus
                                                    }
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Payment Status
                                                    </strong>
                                                </span>
                                                <span
                                                    className={`${
                                                        singleEstimateData?.paymentStatus ==
                                                        "Paid"
                                                            ? "bg-green-400 text-black"
                                                            : "bg-gray-200"
                                                    } py-1 px-2 rounded-md`}
                                                >
                                                    {
                                                        singleEstimateData?.paymentStatus
                                                    }
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>Amount </strong>
                                                </span>
                                                <span>
                                                    {
                                                        singleEstimateData?.currency
                                                    }{" "}
                                                    {singleEstimateData?.amount}
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Tax % | Tax Amount
                                                    </strong>
                                                </span>
                                                <span>
                                                    {
                                                        singleEstimateData?.taxPercentage
                                                    }{" "}
                                                    |{" "}
                                                    {
                                                        singleEstimateData?.taxAmount
                                                    }
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Final Amount
                                                    </strong>
                                                </span>
                                                <span>
                                                    {
                                                        singleEstimateData?.currency
                                                    }{" "}
                                                    {
                                                        singleEstimateData?.finalAmount
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                                <Accordion className="w-full" activeIndex={0}>
                                    <AccordionTab header="Dates">
                                        <div className="space-y-2">
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Created Date:
                                                    </strong>
                                                </span>
                                                <span>
                                                    {moment(
                                                        singleEstimateData?.createdAt
                                                    )
                                                        .local()
                                                        .format("DD-MM-YYYY")}
                                                </span>
                                            </div>
                                            <Divider className="my-1" />
                                            <div className="flex justify-between">
                                                <span>
                                                    <strong>
                                                        Project Due Date:
                                                    </strong>
                                                </span>
                                                <span>
                                                    {
                                                        singleEstimateData?.validTill
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </AccordionTab>
                                </Accordion>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default SingleEstimate;
