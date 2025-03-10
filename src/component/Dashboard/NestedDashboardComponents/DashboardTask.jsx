const DashboardTask = ({ Pending, overDue }) => {
    return (
        <div>
            <div>
                <h2 className="font-semibold text-xl">Tasks</h2>
                <div className="flex justify-between pt-5">
                    <div>
                        <p>{Pending || 0}</p>
                        <p>Pending</p>
                    </div>
                    <div>
                        <p>{overDue || 0}</p>
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
