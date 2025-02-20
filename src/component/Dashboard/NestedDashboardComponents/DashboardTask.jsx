const DashboardTask = () => {
    return (
        <div>
            <div>
                <h2 className="font-semibold">Tasks</h2>
                <div className="flex justify-between pt-5">
                    <div>
                        <p>0</p>
                        <p>Pending</p>
                    </div>
                    <div>
                        <p>0</p>
                        <p>Overdue</p>
                    </div>
                    <div>
                        <p
                            className="pi pi-list "
                            style={{ fontSize: "28px" }}
                        ></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardTask;
