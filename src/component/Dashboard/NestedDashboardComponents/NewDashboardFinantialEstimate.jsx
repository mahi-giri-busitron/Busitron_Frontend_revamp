import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getALlEstimates } from "../../../redux/estimateSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function NewDashboardFinantialEstimate() {
    const dispatch = useDispatch();

    const { allEstimateData, isLoading } = useSelector(
        (state) => state.estimate
    );
    const { currentUser } = useSelector((state) => state.user);
    console.log(currentUser.data.role);

    useEffect(() => {
        dispatch(getALlEstimates());
    }, [dispatch]);

    if (isLoading) return <p>Loading Estimates...</p>;

    return (
        <>
            {currentUser?.data?.role === "SuperAdmin" && (
                <DataTable value={allEstimateData || []} paginator rows={5}>
                    <Column
                        field="estimateNumber"
                        header="Estimate No"
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
                    ></Column>
                </DataTable>
            )}

            {currentUser?.data?.role === "Admin" && (
                <DataTable value={allEstimateData || []} paginator rows={5}>
                    <Column
                        field="estimateNumber"
                        header="Estimate No"
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
                            if (rowData.paymentStatus === "Paid") {
                                return "Recieved";
                            } else {
                                return "Not Recieved";
                            }
                        }}
                    ></Column>
                </DataTable>
            )}
        </>
    );
}
