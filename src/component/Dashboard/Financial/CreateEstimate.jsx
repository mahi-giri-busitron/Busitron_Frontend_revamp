import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Controller, useForm, useWatch } from "react-hook-form";
import cloud from "../../../assets/svgs/cloud-upload.svg";

const clients = [
    { label: "Client A", value: "Client A" },
    { label: "Client B", value: "Client B" },
    { label: "Client C", value: "Client C" },
];

const taxOptions = [
    { label: "Before Discount", value: "Before Discount" },
    { label: "After Discount", value: "After Discount" },
];

const products = [
    { label: "Product A", value: "Product A" },
    { label: "Product B", value: "Product B" },
    { label: "Product C", value: "Product C" },
];

let taxSlab = ["0", "5", "12", "18", "28"];

const CreateEstimate = () => {
    const [selectedClient, setSelectedClient] = useState(null);
    const [selectedTax, setSelectedTax] = useState(null);
    const [editorText, setEditorText] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    const handleAddClient = () => {};

    const handleAddProduct = () => {};

    const {
        control,
        register,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = useForm({
        defaultValues: { quantity: 0, unitPrice: 1, tax: 0, discount: 0 },
    });

    let qty = useWatch({ control, name: "quantity" }) || 0;
    let unitPrice = useWatch({ control, name: "unitPrice" }) || 0;
    let tax = useWatch({ control, name: "tax" }) || 0;
    let discount = useWatch({ control, name: "discount" }) || 0;

    let baseAmount = qty * unitPrice;
    let taxValue = tax !== 0 ? (baseAmount * tax) / 100 : 0;
    let taxedAmount = baseAmount + taxValue;
    let subTotal = baseAmount + (baseAmount * tax) / 100;
    let discountAmount = discount !== 0 ? (taxedAmount * discount) / 100 : 0;
    let finalAmount = (taxedAmount - discountAmount).toFixed(2);

    function onSubmit(data) {}

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Estimate Details
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium">
                            Estimate Number
                        </label>
                        <InputText
                            className="w-full h-10"
                            placeholder="EST#001"
                            {...register("estimateNumber", {
                                required: "Estimate Number required",
                            })}
                        />
                        {errors.estimateNumber && (
                            <p className="text-red-400 text-sm my-1 p-0">
                                {errors.estimateNumber.message}
                            </p>
                        )}
                    </div>

                    <div className="">
                        <label className="block text-gray-700 font-medium">
                            Valid Till <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="validTill"
                            control={control}
                            rules={{ required: "Valid Till Date required" }}
                            render={({ field }) => (
                                <Calendar
                                    value={field.value}
                                    id="buttondisplay"
                                    dateFormat="dd/mm/yy"
                                    className="w-full h-10"
                                    showIcon
                                    onChange={(e) => e.value}
                                />
                            )}
                        />
                    </div>

                    <div className="w-full">
                        <label className="block text-gray-700 font-medium">
                            Currency
                        </label>
                        <Dropdown
                            className="w-full h-10"
                            options={[{ label: "INR (₹)", value: "INR" }]}
                            value="INR"
                            placeholder="INR (₹)"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    {/* Client Dropdown + Add Button */}
                    <div className="flex items-end space-x-2 w-full">
                        <div className="w-full">
                            <label className="block text-gray-700 font-medium">
                                Client <span className="text-red-500">*</span>
                            </label>
                            <Dropdown
                                className="w-full"
                                options={clients}
                                value={selectedClient}
                                onChange={(e) => setSelectedClient(e.value)}
                                placeholder="Select Client"
                            />
                        </div>

                        {/* Add Button */}
                        <Button
                            label="Add"
                            severity="secondary"
                            outlined
                            onClick={handleAddClient}
                        />
                    </div>

                    {/* Calculate Tax Dropdown */}
                    <div className="w-full">
                        <label className="block text-gray-700 font-medium">
                            Calculate Tax
                        </label>
                        <Dropdown
                            className="w-full"
                            options={taxOptions}
                            value={selectedTax}
                            onChange={(e) => setSelectedTax(e.value)}
                            placeholder="Select"
                        />
                    </div>
                </div>

                <div className="mt-6 w-full">
                    <label className="block text-gray-700 font-medium">
                        Description
                    </label>
                    <Editor
                        className=""
                        value={editorText}
                        onTextChange={(e) => setEditorText(e.htmlValue)}
                    />
                </div>

                <div className="mt-6 flex space-x-3 items-center">
                    <Dropdown
                        className=""
                        options={products}
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.value)}
                        placeholder="Select Product"
                    />

                    {/* Add Button */}
                    <Button
                        label="Add"
                        onClick={handleAddProduct}
                        severity="secondary"
                        outlined
                    />
                </div>

                {/* first table */}
                <div className="my-3 overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-left">
                                    Description
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Quantity
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Unit Price
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Tax (%)
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">
                                    <InputText
                                        className="h-10 w-full"
                                        placeholder="Item Name"
                                    />
                                </td>
                                <td className="border border-gray-300 p-1 text-center">
                                    <InputText
                                        tooltip="Only Numbers are allowed"
                                        className="h-10 w-24 text-end"
                                        placeholder="1"
                                        {...register("quantity", {
                                            required: "Qty Required",
                                        })}
                                        tooltipOptions={{
                                            position: "top",
                                            className: "global-tooltip",
                                        }}
                                        onInput={(e) =>
                                            (e.target.value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                ))
                                        }
                                    />
                                </td>
                                <td className="border border-gray-300 p-1 text-center">
                                    <InputText
                                        tooltip="Only Numbers are allowed"
                                        tooltipOptions={{
                                            position: "top",
                                            className: "global-tooltip",
                                        }}
                                        className="h-10 w-24 text-end"
                                        placeholder="0"
                                        {...register("unitPrice", {
                                            required: "Unit Price Required",
                                        })}
                                        onInput={(e) =>
                                            (e.target.value =
                                                e.target.value.replace(
                                                    /\D/g,
                                                    ""
                                                ))
                                        }
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <Controller
                                        name="tax"
                                        control={control}
                                        rules={{ required: "Tax required" }}
                                        render={({ field }) => (
                                            <Dropdown
                                                {...field}
                                                options={taxSlab}
                                                placeholder="Select Tax"
                                                className="w-full h-10 items-center"
                                                onChange={(e) =>
                                                    field.onChange(e.value)
                                                }
                                            />
                                        )}
                                    />
                                </td>
                                <td
                                    rowSpan={2}
                                    className="bg-gray-200 p-2 text-center"
                                >
                                    {tax == 0 ? finalAmount : taxedAmount}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-gray-300 p-2"
                                >
                                    <InputTextarea
                                        rows={3}
                                        className="w-full"
                                        placeholder="Enter Description (optional)"
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                    <label
                                        htmlFor="fileUpload"
                                        className="cursor-pointer"
                                    >
                                        <img
                                            src={cloud}
                                            alt="Upload"
                                            className="w-10 mx-auto"
                                        />
                                        <span className="text-sm font-bold text-gray-400 hover:text-gray-700">
                                            Choose a file
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        id="fileUpload"
                                        className="hidden"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* second table */}
                <div className="my-3 overflow-x-auto">
                    <table className="w-full border border-gray-300 border-collapse">
                        <tbody>
                            <tr>
                                <td
                                    rowSpan={4}
                                    className="hidden w-1/2 sm:table-cell p-2 border border-gray-300"
                                ></td>
                                <td
                                    colSpan={2}
                                    className="p-2 border border-gray-300 text-gray-500"
                                >
                                    Sub Total
                                </td>
                                <td
                                    colSpan={""}
                                    className="p-2 border border-gray-300 "
                                >
                                    {subTotal || 0}
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-gray-300 text-gray-500">
                                    Discount (%)
                                </td>
                                <td className="p-2 border border-gray-300 flex">
                                    <InputText
                                        tooltip="Only Numbers are allowed"
                                        tooltipOptions={{
                                            position: "top",
                                            className: "global-tooltip",
                                        }}
                                        className="h-10 text-end w-full"
                                        placeholder="0"
                                        {...register("discount", {
                                            required: "Discount required",
                                            max: 100,
                                            maxLength: 100,
                                        })}
                                        onInput={(e) => {
                                            let value = e.target.value.replace(
                                                /\D/g,
                                                ""
                                            );
                                            if (value.length > 2)
                                                value = value.slice(0, 2);
                                            if (parseInt(value) > 100)
                                                value = "100";
                                            e.target.value = value;
                                        }}
                                    />
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {discountAmount || 0}
                                </td>
                            </tr>
                            <tr>
                                <td className="p-2 border border-gray-300 text-gray-500">
                                    Tax
                                </td>
                                <td
                                    colSpan={2}
                                    className="p-2 border border-gray-300 text-right"
                                >
                                    {taxValue || 0}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={2}
                                    className="p-2 border border-gray-300 text-center"
                                >
                                    Total
                                </td>
                                <td className="p-2 border border-gray-300">
                                    {finalAmount || 0}
                                </td>
                            </tr>

                            <tr>
                                <td className="p-2 border border-gray-300">
                                    <label className="text-sm text-gray-500">
                                        Response for the recipient
                                    </label>
                                    <InputTextarea
                                        rows={3}
                                        className="w-full"
                                        placeholder="Eg. Thank Your for your business"
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="flex gap-2">
                    <Button
                        label="Save"
                        size="small"
                        icon="pi pi-check"
                        className="p-2 px-4 text-white bg-blue-600 text-sm"
                    />
                    <Button
                        outlined
                        label="Cancel"
                        severity="secondary"
                        size="small"
                        className="p-2 px-4 text-gray-600 text-sm hover:text-blue-600"
                    />
                </div>
            </form>
        </div>
    );
};

export default CreateEstimate;
