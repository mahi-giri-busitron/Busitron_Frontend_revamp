import React, { useState } from 'react';
import { TabMenu } from 'primereact/tabmenu';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import { Button } from 'primereact/button';

const ModuleSettings = () => {
  const roles = ['Admin', 'Employee', 'Client', 'Custom Modules'];
  const toggleOptions = [
    'Projects', 'Tickets', 'Invoices', 'Estimates',
    'Events', 'Messages', 'Tasks', 'Time Logs',
    'Contracts', 'Notices', 'Payments', 'Orders',
    'Knowledge Base', 'Clients', 'Employees', 'Attendance',
    'Expenses', 'Leaves', 'Leads', 'Holidays',
    'Products', 'Reports', 'Bank Account'
  ];

  const [activeRole, setActiveRole] = useState(0);
  const [toggleStates, setToggleStates] = useState({});
  const [savedStates, setSavedStates] = useState({});

  const handleToggleChange = (option, value) => {
    const role = roles[activeRole];
    setToggleStates((prevState) => ({
      ...prevState,
      [role]: {
        ...prevState[role],
        [option]: value
      }
    }));
  };

  const handleSave = () => {
    setSavedStates(toggleStates);
  };

  return (
    <div className="p-4">
      <Button label="Save" icon="pi pi-save" onClick={handleSave} className="mb-4" />
      <TabMenu
        model={roles.map((role, index) => ({
          label: role,
          command: () => setActiveRole(index)
        }))}
        activeIndex={activeRole}
      />

      <div className="grid grid-cols-4 gap-4 mt-4">
        {toggleOptions.map((option) => (
          <div key={option} className="flex items-center gap-2">
            <TriStateCheckbox
              value={toggleStates[roles[activeRole]]?.[option] || null}
              onChange={(e) => handleToggleChange(option, e.value)}
            />
            <span>{option}</span>
          </div>
        ))}
      </div>

     
    </div>
  );
};

export default ModuleSettings;
