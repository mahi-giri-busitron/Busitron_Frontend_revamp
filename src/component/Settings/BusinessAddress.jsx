import React, { useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { countryCodes } from "../../utils/countryCodes";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { RadioButton } from "primereact/radiobutton";
import { TabMenu } from "primereact/tabmenu";

const BusinessAddress = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
    } = useForm();
    const [activeIndex, setActiveIndex] = useState(0);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState(null);

    const confirmDeleteAddress = (id) => {
        setAddressToDelete(id);
        setShowDeleteDialog(true);
    };

    const deleteAddress = () => {
        setAddresses(addresses.filter((addr) => addr.id !== addressToDelete));
        setShowDeleteDialog(false);
    };

    const [selectedCode, setSelectedCode] = useState(
        countryCodes.find((c) => c.name === "India")
    );
    const items = [{ label: "Business Address", icon: "pi pi-briefcase" }];

    const [addresses, setAddresses] = useState([
        {
            id: 1,
            location: "Madhapur",
            address: "Madhapur Hyderabad",
            country: "India",
            taxNumber: "",
            latitude: "",
            longitude: "",
            default: true,
        },
    ]);

    const [showDialog, setShowDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);

    const handleAddAddress = (data) => {
        if (editMode && currentAddress) {
            setAddresses((prevAddresses) =>
                prevAddresses.map((addr) =>
                    addr.id === currentAddress.id
                        ? {
                              ...addr,
                              location: data.location,
                              address: data.address,
                              country: selectedCode.name,
                              taxName: data.taxName || "--",
                              taxNumber: data.taxNumber || "",
                              latitude: data.latitude || "",
                              longitude: data.longitude || "",
                          }
                        : addr
                )
            );
        } else {
            const newEntry = {
                id: addresses.length + 1,
                location: data.location,
                address: data.address,
                country: selectedCode.name,
                taxName: data.taxName || "--",
                taxNumber: data.taxNumber || "",
                latitude: data.latitude || "",
                longitude: data.longitude || "",
                default: false,
            };
            setAddresses([...addresses, newEntry]);
        }

        setShowDialog(false);
        reset();
        setEditMode(false);
        setCurrentAddress(null);
    };

    return (
        <div className=" bg-white shadow-md rounded-lg">
          
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            />
              <div className="p-5">
              <Button
                label="Add New Address"
                className="m-200"
                icon="pi pi-plus"
                onClick={() => {
                    reset();
                    setEditMode(false);
                    setShowDialog(true);
                }}
            />
                </div>
           
            <div className="py-5">
                <DataTable value={addresses} className="p-datatable-sm">
                    <Column field="id" header="#" />
                    <Column field="location" header="Location" />
                    <Column field="address" header="Address" />
                    <Column field="country" header="Country" />
                    <Column
                        header="Default"
                        body={(rowData) => (
                            <RadioButton
                                checked={rowData.default}
                                onChange={() =>
                                    setAddresses(
                                        addresses.map((addr) => ({
                                            ...addr,
                                            default: addr.id === rowData.id,
                                        }))
                                    )
                                }
                            />
                        )}
                    />
                    <Column
                        header="Edit"
                        body={(rowData) => (
                            <Button
                                label="Edit"
                                icon="pi pi-pencil"
                                className="p-button items-start flex"
                                onClick={() => {
                                    setEditMode(true);
                                    setCurrentAddress(rowData);
                                    setValue("location", rowData.location);
                                    setValue("address", rowData.address);
                                    setValue("taxName", rowData.taxName);
                                    setValue("taxNumber", rowData.taxNumber);
                                    setValue("latitude", rowData.latitude);
                                    setValue("longitude", rowData.longitude);
                                    setSelectedCode(
                                        countryCodes.find(
                                            (c) => c.name === rowData.country
                                        )
                                    );

                                    setShowDialog(true);
                                }}
                            />
                        )}
                    />

                    <Column
                        header="Actions"
                        body={(rowData) => (
                            <Button
                                label="Delete"
                                icon="pi pi-trash"
                                className="p-button-danger p-button-sm"
                                onClick={() => confirmDeleteAddress(rowData.id)}
                            />
                        )}
                    />
                </DataTable>
            </div>

            <Dialog
                visible={showDialog}
                onHide={() => setShowDialog(false)}
                header={editMode ? "Edit Address" : "Add New Address"}
                modal
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => setShowDialog(false)}
                        />
                        <Button
                            label={editMode ? "Update" : "Save"}
                            icon="pi pi-check"
                            onClick={handleSubmit(handleAddAddress)}
                        />
                    </div>
                }
            >
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="labelTag">Country</label>
                        <Dropdown
                            value={selectedCode}
                            options={countryCodes}
                            onChange={(e) => setSelectedCode(e.value)}
                            placeholder="Select"
                            className="w-full"
                            optionLabel="code"
                            valueTemplate={(option) =>
                                option ? (
                                    <div className="flex items-center gap-1">
                                        <img
                                            src={option.flag}
                                            alt={option.name}
                                            className="w-6 h-5 hidden sm:block"
                                        />
                                        <span className="text-xs sm:text-sm">
                                            {option.name}
                                        </span>
                                    </div>
                                ) : (
                                    "Select"
                                )
                            }
                            itemTemplate={(option) => (
                                <div className="flex items-center gap-1">
                                    <img
                                        src={option.flag}
                                        alt={option.name}
                                        className="w-6 h-5"
                                    />

                                    <span className="text-xs sm:text-sm">
                                        {option.name}
                                    </span>
                                </div>
                            )}
                            filter
                            filterBy="name"
                        />
                    </div>
                    <div>
                        <label className="labelTag">
                            Location<span className="text-red-700"> *</span>
                        </label>
                        <InputText
                            {...register("location", {
                                required: "Location is required",
                            })}
                            placeholder="e.g. New York, Jaipur, Dubai"
                            className="w-full"
                        />
                        {errors.location && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.location.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="labelTag">Tax Name</label>
                        <InputText
                            {...register("taxName")}
                            placeholder="Tax Name"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="labelTag">Tax Number</label>
                        <InputText
                            {...register("taxNumber")}
                            placeholder="Enter Tax Number"
                            className="w-full"
                        />
                    </div>
                </div>
                <div className="mt-4">
                    <label className="labelTag">
                        Address<span className="text-red-700"> *</span>
                    </label>
                    <InputText
                        {...register("address", {
                            required: "Address is required",
                        })}
                        placeholder="e.g. 132, My Street, Kingston, New York 12401"
                        className="w-full"
                    />
                    {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.address.message}
                        </p>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <label className="labelTag">Latitude</label>
                        <InputText
                            {...register("latitude")}
                            placeholder="e.g. 38.895"
                            className="w-full"
                        />
                    </div>
                    <div>
                        <label className="labelTag">Longitude</label>
                        <InputText
                            {...register("longitude")}
                            placeholder="e.g. -77.0364"
                            className="w-full"
                        />
                    </div>
                </div>
            </Dialog>

            <Dialog
                visible={showDeleteDialog}
                onHide={() => setShowDeleteDialog(false)}
                header="Confirm Delete"
                modal
                footer={
                    <div>
                        <Button
                            label="Cancel"
                            icon="pi pi-times"
                            className="p-button-text"
                            onClick={() => setShowDeleteDialog(false)}
                        />
                        <Button
                            label="Delete"
                            icon="pi pi-check"
                            className="p-button-danger"
                            onClick={deleteAddress}
                        />
                    </div>
                }
            >
                <p>Are you sure you want to delete this address?</p>
            </Dialog>
        </div>
    );
};

export default BusinessAddress;
