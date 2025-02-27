import { Dialog } from "primereact/dialog";

function TaskBoardAddTask({ visible, onHide }) {
    return (
        <Dialog
            header="Add Task"
            visible={visible}
            style={{ width: "50vw" }}
            onHide={onHide}
        >
            <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="projectName"
                            className="font-medium text-gray-700"
                        >
                            Project Name
                        </label>
                        <input
                            type="text"
                            placeholder="Enter the project name"
                            id="projectName"
                            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="companyName"
                            className="font-medium text-gray-700"
                        >
                            Company Name
                        </label>
                        <input
                            type="text"
                            placeholder="Company name"
                            id="companyName"
                            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col">
                        <label
                            htmlFor="startDate"
                            className="font-medium text-gray-700"
                        >
                            Start Date
                        </label>
                        <input
                            type="date"
                            id="startDate"
                            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label
                            htmlFor="endDate"
                            className="font-medium text-gray-700"
                        >
                            End Date
                        </label>
                        <input
                            type="date"
                            id="endDate"
                            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                        />
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <label
                            htmlFor="priority"
                            className="font-medium text-gray-700"
                        >
                            Priority
                        </label>
                        <select
                            id="priority"
                            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                        >
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="assignedTo"
                            className="font-medium text-gray-700"
                        >
                            Assigned To
                        </label>
                        <input
                            type="text"
                            placeholder="Enter assignee name"
                            id="assignedTo"
                            className="border border-gray-300 p-2 rounded focus:ring focus:ring-blue-300"
                        />
                    </div>

                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                        Save
                    </button>
                </div>
            </div>
        </Dialog>
    );
}

export default TaskBoardAddTask;
