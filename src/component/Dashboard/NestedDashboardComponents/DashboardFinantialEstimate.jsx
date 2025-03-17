import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getALlEstimates } from "../../../redux/estimateSlice";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function DashboardFinantialEstimate() {
    const dispatch = useDispatch();
    
    const { allEstimateData, isLoading } = useSelector((state) => state.estimate);
    const userRole = useSelector((state) => state.auth?.role || "Guest"); 

    useEffect(() => {
        dispatch(getALlEstimates()); 
    }, [dispatch]);

    if (isLoading) return <p>Loading Estimates...</p>;

    return (
        <div className="card">
            
            {userRole?.toLowerCase() === "superadmin" && (
                <>
                    <h3>Super Admin - Estimates</h3>
                    <DataTable value={allEstimateData || []} paginator rows={10}>
                        <Column field="estimateNumber" header="Estimate No"></Column>
                        <Column field="clientName" header="Client"></Column>
                        <Column field="finalAmount" header="Final Amount"></Column>
                        <Column field="paymentStatus" header="Payment Status"></Column>
                    </DataTable>
                </>
            )}

            
            {userRole === "Admin" && (
                <>
                    <h3>Admin - Estimates</h3>
                    <DataTable value={allEstimateData || []} paginator rows={10}>
                        <Column field="estimateNumber" header="Estimate No"></Column>
                        <Column field="createdBy" header="Created By"></Column>
                        <Column field="finalAmount" header="Final Amount"></Column>
                        <Column field="paymentStatus" header="Payment Status"></Column>
                    </DataTable>
                </>
            )}
        </div>
    );
}
