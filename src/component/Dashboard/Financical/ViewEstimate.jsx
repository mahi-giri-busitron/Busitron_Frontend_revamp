import React, { useRef } from "react";
import { Avatar } from "primereact/avatar";
import { Card } from "primereact/card";
import { Menu } from "primereact/menu";
import { Button } from "primereact/button";

const ViewEstimate = () => {
  const menu = useRef(null);

  const menuItems = [
    { label: "Settings", icon: "pi pi-cog" },
    { label: "Logout", icon: "pi pi-sign-out" },
  ];

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h2 className="text-lg font-semibold mb-4">Profile</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 h-28 w-full flex items-center relative">
          <div className="absolute top-2 right-2">
            <Button
              icon="pi pi-ellipsis-h"
              text
              severity="secondary"
              className="p-2 text-gray-600 hover:bg-gray-400 rounded-full"
              onClick={(event) => menu.current.toggle(event)}
              aria-controls="popup_menu"
              aria-haspopup
            />
            <Menu model={menuItems} popup ref={menu} id="popup_menu" />
          </div>
          <div className="flex items-center space-x-3">
            <Avatar icon="pi pi-user" className="bg-gray-300 w-12 h-12" shape="circle" />
            <div>
              <h3 className="font-semibold text-md">DEMO</h3>
              <p className="text-xs text-gray-500">Last login at --</p>
            </div>
          </div>
        </Card>

        {[
          { title: "Total Projects", icon: "pi pi-clone" },
          { title: "Total Earnings", icon: "pi pi-wallet" },
          { title: "Due Invoices", icon: "pi pi-file" },
        ].map((item, index) => (
          <Card key={index} className="h-28 w-full flex flex-col justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-md font-semibold">{item.title}</div>
              <p className="text-xl text-blue-600 font-semibold">0</p>
              <i className={`pi ${item.icon} text-2xl text-gray-400`}></i>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-6">
        <Card className="p-4 w-full">
          <h3 className="text-md font-semibold border-b pb-2 mb-2">Profile Info</h3>
         
          <div className="space-y-3 text-sm text-gray-700">
            {[
              { label: "Full Name", value: "DEMO" },
              { label: "Email", value: "--" },
              { label: "Company Name", value: "--" },
              { label: "Company Logo", value: "--" },
              { label: "Mobile", value: "--" },
              { label: "Gender", value: "--" },
              { label: "Office Phone Number", value: "--" },
              { label: "Official Website", value: "--" },
              { label: "GST/VAT Number", value: "--" },
              { label: "Address", value: "--" },
              { label: "State", value: "--" },
              { label: "City", value: "--" },
              { label: "Postal Code", value: "--" },
            ].map((item, index) => (
              <div key={index} className="flex items-center">
                <span className="text-gray-500 w-48">{item.label}:</span>
                <span className="text-gray-700">{item.value}</span>
              </div>
            ))}
          </div>



          <div className="flex items-center mt-4">
            <span className="text-gray-500 w-48">Language:</span>
            <div className="flex items-center space-x-2">
              <img src="https://flagcdn.com/w40/gb.png" alt="UK Flag" className="w-5 h-5" />
              <span className="text-gray-700">English</span>
            </div>
          </div>

          <div className="flex items-center mt-4">
            <span className="text-gray-500 w-48">Added By:</span>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <i className="pi pi-user text-gray-500 text-lg"></i>
              </div>
              <div>
                <span className="text-gray-900 font-semibold">Mr Mahesh Balu Giri</span>
                <span className="ml-2 bg-gray-600 text-white text-xs px-2 py-0.5 rounded">It's you</span>
                <div className="text-gray-500 text-sm">FULL STACK DEVELOPER</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 gap-4">
          {["Projects", "Invoices"].map((title, index) => (
            <Card key={index} className="p-4 w-full flex flex-col items-center text-gray-500">
              <h3 className="font-semibold text-md">{title}</h3>
              <i className="pi pi-ban text-2xl mt-1"></i>
              <p className="mt-1 text-sm">- Not enough data -</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewEstimate;

