import { Skeleton } from "primereact/skeleton";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

function UserManagementSkeleton() {
    return (
        <div className="p-4 md:p-6">
            <div className="flex flex-wrap items-center gap-4 mb-4 justify-between">
                <Skeleton width="10rem" height="3rem" />
                <div className="w-full md:w-100">
                    <Skeleton width="100%" height="40px" />
                </div>
            </div>
            <DataTable value={Array(10).fill({})} paginator rows={10}>
                <Column
                    field="employeeId"
                    header="EMP ID"
                    body={() => <Skeleton width="80px" />}
                />
                <Column
                    field="name"
                    header="Name"
                    body={() => <Skeleton width="120px" />}
                />
                <Column
                    field="email"
                    header="Email"
                    body={() => <Skeleton width="150px" />}
                />
                <Column
                    field="phoneNumber"
                    header="Phone Number"
                    body={() => <Skeleton width="100px" />}
                />
                <Column
                    field="designation"
                    header="Designation"
                    body={() => <Skeleton width="100px" />}
                />
                <Column
                    field="dob"
                    header="DOB"
                    body={() => <Skeleton width="80px" />}
                />
                <Column
                    field="role"
                    header="Role"
                    body={() => <Skeleton width="80px" />}
                />
                <Column
                    header="Action"
                    body={() => (
                        <div className="flex gap-3">
                            <Skeleton
                                width="30px"
                                height="30px"
                                shape="circle"
                            />
                            <Skeleton
                                width="30px"
                                height="30px"
                                shape="circle"
                            />
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
}

export default UserManagementSkeleton;
