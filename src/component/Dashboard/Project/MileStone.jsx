import React, { useState } from "react";
import "primeicons/primeicons.css"; 
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const Milestone = () => {
  const [visible, setVisible] = useState(false);
  const [milestoneTitle, setMilestoneTitle] = useState("");
  const [milestoneCost, setMilestoneCost] = useState("");
  const [status, setStatus] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [budgetCost, setBudgetCost] = useState("");
  const [milestones, setMilestones] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const statusOptions = [
    { label: "Complete", value: "Complete" },
    { label: "Incomplete", value: "Incomplete" },
  ];

  const handleSave = () => {
    if (editingId !== null) {
      setMilestones(
        milestones.map((milestone) =>
          milestone.id === editingId
            ? {
                ...milestone,
                title: milestoneTitle,
                cost: milestoneCost,
                status,
                budgetCost,
                startDate,
                endDate,
              }
            : milestone
        )
      );
    } else {
      const newMilestone = {
        id: milestones.length + 1,
        title: milestoneTitle,
        cost: milestoneCost,
        taskCount: milestones.length + 1,
        status,
        budgetCost,
        startDate,
        endDate,
      };
      setMilestones([...milestones, newMilestone]);
    }

    setVisible(false);
    resetForm();
  };

  const handleEdit = (milestone) => {
    setMilestoneTitle(milestone.title);
    setMilestoneCost(milestone.cost);
    setStatus(milestone.status);
    setBudgetCost(milestone.budgetCost);
    setStartDate(milestone.startDate);
    setEndDate(milestone.endDate);
    setEditingId(milestone.id);
    setVisible(true);
  };

  const resetForm = () => {
    setMilestoneTitle("");
    setMilestoneCost("");
    setStatus(null);
    setBudgetCost("");
    setStartDate(null);
    setEndDate(null);
    setEditingId(null);
  };

  return (
    <div className="p-6 rounded-lg">
      <div className="mb-6 flex justify-start">
        <Button
          label="Create Milestone"
          icon="pi pi-plus"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-lg hover:bg-blue-600 transition"
          onClick={() => setVisible(true)}
        />
      </div>

      <h2 className="text-2xl font-semibold mb-6">MILESTONES</h2>

      <DataTable value={milestones} className="shadow-lg rounded border-none p-5">
        <Column field="title" header="Milestone Title" />
        <Column field="cost" header="Milestone Cost" />
        <Column field="taskCount" header="Task Count" />
        <Column field="status" header="Status" />
        <Column field="budgetCost" header="Budget Cost" />
        <Column
          header="Action"
          body={(rowData) => (
            <div className="flex gap-2">
              <Button icon="pi pi-pencil" className="p-button-rounded p-button-success" onClick={() => handleEdit(rowData)} />
              <Button icon="pi pi-trash" className="p-button-rounded p-button-danger" onClick={() => setMilestones(milestones.filter((milestone) => milestone.id !== rowData.id))} />
            </div>
          )}
        />
      </DataTable>

      <Dialog header="Milestone Details" visible={visible} style={{ width: "55vw" }} className="shadow-2xl rounded-lg" onHide={() => setVisible(false)} modal>
        <div className="p-0">
          <h3 className="text-2xl font-semibold mb-4">{editingId !== null ? "Edit Milestone" : "Create Milestone"}</h3>
          <hr className="mb-1 border-gray-300" />

          <div className="grid grid-cols-2 gap-8 mb-6 rounded-2xl">
            <div>
              <label className="block text-m font-medium mb-1 text-gray-600">Milestone Title *</label>
              <InputText placeholder="Enter Milestone Title" value={milestoneTitle} onChange={(e) => setMilestoneTitle(e.target.value)} className="w-full p-4 border rounded-md shadow-sm hover:border-blue-500" />
            </div>
            <div>
              <label className="block text-m font-medium mb-1 text-gray-600">Milestone Cost</label>
              <InputText placeholder="E.g. 10000" value={milestoneCost} onChange={(e) => setMilestoneCost(e.target.value)} className="w-full p-2 border rounded-md shadow-sm hover:border-blue-500" />
            </div>
          </div>

          {/* Budget and Status in Flex Row */}
          <div className="flex gap-4 mb-6">
            
            <div className="flex-1">
              <label className="block text-m font-medium mb-1 text-gray-600">Status</label>
              <Dropdown
                value={status}
                options={statusOptions}
                onChange={(e) => setStatus(e.value)}
                placeholder="Select Status"
                className="w-full p-2 border rounded-md shadow-sm hover:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label className="block text-m font-medium mb-1 text-gray-600">Budget Cost</label>
              <InputText placeholder="Enter Amount" value={budgetCost} onChange={(e) => setBudgetCost(e.target.value)} className="w-full p-2 border rounded-md shadow-sm hover:border-blue-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-m font-medium mb-1 text-gray-600">Start Date</label>
              <Calendar value={startDate} onChange={(e) => setStartDate(e.value)} className="w-full p-2 shadow-sm" showIcon />
            </div>
            <div>
              <label className="block text-m font-medium mb-1 text-gray-600">End Date</label>
              <Calendar value={endDate} onChange={(e) => setEndDate(e.value)} className="w-full p-2 shadow-sm" showIcon />
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <Button label="Close" className="p-button-text" onClick={() => setVisible(false)} />
            <Button label="Save" className="bg-blue-500 text-white px-2 py-2 rounded-md" onClick={handleSave} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Milestone;
