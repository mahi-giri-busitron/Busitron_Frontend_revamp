import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getALlEstimates } from "../../../redux/estimateSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useNavigate } from "react-router-dom";

export default function NewDashboardFinantialEstimate() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { allEstimateData, isLoading } = useSelector(
        (state) => state.estimate
    );
    const { currentUser } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getALlEstimates());
    }, [dispatch]);

    if (isLoading) return <p>Loading Estimates...</p>;

    return (
        <div className="rounded-md min-h-96">
            {currentUser?.data?.role === "SuperAdmin" && (
                <DataTable
                    value={allEstimateData || []}
                    paginator
                    rows={5}
                    currentPageReportTemplate="{first} to {last} of {totalRecords}"
                    paginatorTemplate=" FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink RowsPerPageDropdown"
                >
                    <Column
                        field="estimateNumber"
                        header="Estimate No"
                        body={(rowData) => (
                            <span
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() =>
                                    navigate(
                                        `/dashboard/financial-management/${rowData._id}`
                                    )
                                }
                            >
                                {rowData.estimateNumber}
                            </span>
                        )}
                    ></Column>
                    <Column field="clientId.name" header="Client"></Column>
                    <Column
                        field="finalAmount"
                        header="Final Amount"
                        body={(rowData) => (
                            <span className="text-red-500">
                                {rowData.currency} {rowData.finalAmount}
                            </span>
                        )}
                    ></Column>
                    <Column
                        field="paymentStatus"
                        header="Payment Status"
                        body={(rowData) => {
                            const commonClasses =
                                "py-1 px-2 rounded-md w-[120px] text-center inline-block";
                            if (rowData.paymentStatus === "Paid") {
                                return (
                                    <span
                                        className={`bg-green-600 ${commonClasses}`}
                                    >
                                        {rowData.paymentStatus}
                                    </span>
                                );
                            } else {
                                return (
                                    <span
                                        className={`bg-green-200 ${commonClasses}`}
                                    >
                                        {rowData.paymentStatus}
                                    </span>
                                );
                            }
                        }}
                    ></Column>
                </DataTable>
            )}

            {currentUser?.data?.role === "Admin" && (
                <DataTable value={allEstimateData || []} paginator rows={5}>
                    <Column
                        field="estimateNumber"
                        header="Estimate No"
                        body={(rowData) => (
                            <span
                                className="cursor-pointer hover:text-blue-500"
                                onClick={() =>
                                    navigate(
                                        `/dashboard/financial-management/${rowData._id}`
                                    )
                                }
                            >
                                {rowData.estimateNumber}
                            </span>
                        )}
                    ></Column>
                    <Column field="userId.name" header="Created By"></Column>
                    <Column
                        field="finalAmount"
                        header="Final Amount"
                        body={(rowData) => (
                            <span className="text-green-500">
                                {rowData.currency} {rowData.finalAmount}
                            </span>
                        )}
                    ></Column>
                    <Column
                        field="paymentStatus"
                        header="Payment Status"
                        body={(rowData) => {
                            const commonClasses =
                                "py-1 px-2 rounded-md w-[120px] text-center inline-block";
                            if (rowData.paymentStatus === "Paid") {
                                return (
                                    <span
                                        className={`bg-green-300 ${commonClasses}`}
                                    >
                                        Received
                                    </span>
                                );
                            } else {
                                return (
                                    <span
                                        className={`bg-red-400 text-white ${commonClasses}`}
                                    >
                                        Not Received
                                    </span>
                                );
                            }
                        }}
                    ></Column>
                </DataTable>
            )}
        </div>
    );
}
