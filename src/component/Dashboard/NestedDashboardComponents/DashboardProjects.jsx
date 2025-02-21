import React from "react";
const DashboardProjects = () => {
    return (
        <div>
            <div>
                <h2 className="font-semibold">Projects</h2>
                <div className="flex justify-between pt-5">
                    <div>
                        <p>1</p>
                        <p>Pending</p>
                    </div>
                    <div>
                        <p>0</p>
                        <p>Overdue</p>
                    </div>
                    <div>
                        <p
                            className="pi pi-list-check "
                            style={{ fontSize: "28px" }}
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default DashboardProjects;
