import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { countryCodes } from "../../utils/countryCodes";
import { useForm } from "react-hook-form";
import { Dropdown } from "primereact/dropdown";
import { TabMenu } from "primereact/tabmenu";
import { useDispatch, useSelector } from "react-redux";
import {
    createCompanyLocation,
    deleteCompanyLocation,
    editCompanyLocation,
    getCompanySetting,
    isDeletedToPrevState,
    isEditedToPrevState,
    isNewLocationAddedToPrevState,
    isRequestFulfilledToPrevState,
} from "../../redux/companySlice";
import toast from "react-hot-toast";

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
    const [selectedCode, setSelectedCode] = useState(
        countryCodes.find((c) => c.name === "India")
    );

    const { company, isNewLocationAdded, isDeleted, isEdited } = useSelector(
        (state) => state.company
    );
    const dispatch = useDispatch();

    const [addresses, setAddresses] = useState([]);
    const [addressID, setAddressID] = useState(null);
    const [showDialog, setShowDialog] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentAddress, setCurrentAddress] = useState(null);
    const [editAddress, setEditAddress] = useState({
        address: "",
        city: "",
        country: "",
        pinCode: "",
    });

    useEffect(() => {
        if (company?.data) {
            setAddresses(company.data[0]?.location || []);
        }
    }, [company]);
    useEffect(() => {
        if (isNewLocationAdded) {
            dispatch(getCompanySetting()).then(() => {
                dispatch(isNewLocationAddedToPrevState());
                toast.success("New location added");
            });
        }
    }, [isNewLocationAdded, dispatch]);

    useEffect(() => {
        if (isDeleted) {
            dispatch(getCompanySetting()).then(() => {
                dispatch(isDeletedToPrevState());
            });
        }
    }, [isDeleted, dispatch]);

    useEffect(() => {
        if (isEdited) {
            dispatch(getCompanySetting()).then(() => {
                dispatch(isEditedToPrevState());
            });
        }
    }, [isEdited, dispatch]);

    const confirmDeleteAddress = (id) => {
        setAddressID(id);
        setShowDeleteDialog(true);
    };

    const deleteAddress = async () => {
        const apiResult = await dispatch(
            deleteCompanyLocation({
                companyID: company?.data[0]._id,
                id: addressID,
            })
        );

        if (deleteCompanyLocation.fulfilled.match(apiResult)) {
            setAddresses((prevAddresses) =>
                prevAddresses.filter((address) => address.id !== addressID)
            );

            toast.success("Address deleted successfully!");
        } else {
            toast.error(apiResult?.payload || "Something went wrong!");
        }

        setShowDeleteDialog(false);
    };

    const items = [{ label: "Business Address", icon: "pi pi-briefcase" }];

    const handleAddressChange = (e) => {
        if (e.target) {
            setEditAddress((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        } else {
            setSelectedCode(e.value);
            setEditAddress((prev) => ({
                ...prev,
                country: e.value.name,
            }));
        }
    };

    const handleAddAddress = async (data) => {
        const updatedAddress = {
            city: data.city,
            address: data.address,
            country: selectedCode.name,
            pinCode: data.pinCode,
        };

        if (editMode && currentAddress) {
            await dispatch(
                editCompanyLocation({
                    companyID: company?.data[0]._id,
                    id: currentAddress.id,
                    editAddress,
                })
            );
            await dispatch(isRequestFulfilledToPrevState());
            toast.success("Location update successfully!");
        } else {
            await dispatch(
                createCompanyLocation({
                    companyID: company?.data[0]._id,
                    newAddr: JSON.stringify(updatedAddress),
                })
            );
            await dispatch(isRequestFulfilledToPrevState());
            await dispatch(isNewLocationAddedToPrevState());
        }

        setShowDialog(false);
        reset();
        setEditMode(false);
        setCurrentAddress(null);
    };

    const handleClick = () => {
        reset();
        setEditMode(false);
        setShowDialog(true);
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
                    className="m-200 h-10"
                    size="small"
                    icon="pi pi-plus"
                    onClick={handleClick}
                />
            </div>

            <div className="py-5">
                <DataTable value={addresses} className="p-datatable-sm">
                    <Column field="city" header="City" />
                    <Column field="address" header="Address" />
                    <Column field="country" header="Country" />
                    <Column field="pinCode" header="PinCode" />
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
                                    setValue("city", rowData.city);
                                    setValue("address", rowData.address);
                                    setSelectedCode(
                                        countryCodes.find(
                                            (c) => c.name === rowData.country
                                        )
                                    );
                                    setValue("pinCode", rowData.pinCode);
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
                            onChange={(e) => {
                                handleAddAddress();
                                setSelectedCode(e.value);
                            }}
                            placeholder="Select"
                            className="w-full"
                            optionLabel="code"
                            valueTemplate={(option) =>
                                option ? (
                                    <div className="flex items-center gap-1">
                                        <img
                                            src={option?.flag}
                                            alt={option?.name}
                                            className="w-6 h-5 hidden sm:block"
                                        />
                                        <span className="text-xs sm:text-sm">
                                            {option?.name}
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
                            City<span className="text-red-700"> *</span>
                        </label>
                        <InputText
                            {...register("city", {
                                required: "City is required",
                            })}
                            placeholder="e.g. New York, Jaipur, Dubai"
                            className="w-full"
                            onChange={handleAddressChange}
                        />
                        {errors.city && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.city.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="labelTag">
                            PinCode<span className="text-red-700"> *</span>
                        </label>
                        <InputText
                            {...register("pinCode", {
                                required: "PinCode is required",
                            })}
                            placeholder="e.g. 123456"
                            className="w-full"
                            onChange={handleAddressChange}
                        />
                        {errors.pinCode && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.pinCode.message}
                            </p>
                        )}
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
                        onChange={handleAddressChange}
                    />
                    {errors.address && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.address.message}
                        </p>
                    )}
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
