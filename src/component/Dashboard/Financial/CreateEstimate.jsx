import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { InputTextarea } from "primereact/inputtextarea";
import { Calendar } from "primereact/calendar";
import { Controller, useForm, useWatch } from "react-hook-form";
import cloud from "../../../assets/svgs/cloud-upload.svg";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUser } from "../../../redux/userManagementSlice";
import { getALlEstimates } from "../../../redux/estimateSlice";
import { removeDomElementsFromInput } from "../../../utils/domSanitize";
import { ProgressSpinner } from 'primereact/progressspinner';

let taxSlab = ["0", "5", "12", "18", "28"];

const CreateEstimate = ({setOpenModel}) => {

    let currencyList = [{ label: "INR (₹)", value: "INR" } , { label: "USD ($)", value: "USD" }]

    const {control,register,handleSubmit,formState: { errors },setValue,watch, setError} = useForm({
        defaultValues: { quantity: 1, unitPrice: 1, tax: "", discount: 0 },
    });

    let [files , setFiles] = useState([]);
    let [isDisabled , setIsDisabled] = useState(false);
    let [submitLoading , setSubmitLoading] = useState(false)

    let dispatch = useDispatch();

    let qty = useWatch({ control, name: "quantity" }) || 0;
    let unitPrice = useWatch({ control, name: "unitPrice" }) || 0;
    let tax = useWatch({ control, name: "tax" }) || 0;  // tax percentage
    let discount = useWatch({ control, name: "discount" }) || 0;

    let baseAmount = qty * unitPrice;
    let taxValue = tax !== 0 ? (baseAmount * tax) / 100 : 0; // tax value means how much gst amount involved
    let taxedAmount = baseAmount + taxValue;  // amount that includes tax
    let subTotal = baseAmount + (baseAmount * tax) / 100;
    let discountAmount = discount !== 0 ? (taxedAmount * discount) / 100 : 0;
    let finalAmount = (taxedAmount - discountAmount).toFixed(2);

    let currentUser = useSelector((store)=> store?.user?.currentUser);

    useEffect(()=>{
        dispatch(fetchAllUser());
    },[dispatch])

    const {users}= useSelector(store => store?.userManagement);
    const allAdmins = users && users?.filter(user => user.role == "Admin")
        .map(val => ({label : val.name ,value :val._id}));

    function handleFileChange(e)
    {
        let myFile = e.target.files[0];

        if(myFile){
            setFiles([...files,myFile]);
        }        
    }

    function handleRemoveFile(idx)
    {   
        const removedFiles = files.filter((_, i) => i !==idx);
        setFiles(removedFiles);        
    }
    
    async function onSubmit(data) 
    {
        let formData = new FormData();

        // console.log("files attached ", files);

        if(data?.estimateNumber?.trim()== "")
        {
            setError("estimateNumber",{type: "manual", message : "Estimate No required*"});
            return;
        }

        formData.append("userId",currentUser.data._id);
        formData.append("estimateNumber", data.estimateNumber);
        formData.append("validTill", data.validTill ? moment(data.validTill).format("DD-MM-YYYY") : "");
        formData.append("currency", data.currency);
        formData.append("clientId", data.client);
        formData.append("productName", data.productName);
        formData.append("responseMessage", data.responseMessage);
    
        const products = {
            itemName: data.itemName,
            itemDescription: data.itemDescription,
            quantity: qty.toString(),
            unitPrice: unitPrice.toString(),
            taxPercentage: tax.toString(),
            amount: taxedAmount.toString(),
        };
        formData.append("products",JSON.stringify(products));

        const summary = {
            subTotal: subTotal.toString(),
            discount: discount.toString(),
            taxAmount: taxValue.toString(),
            finalAmount: finalAmount.toString(),
        };
        formData.append("summary",JSON.stringify(summary));

        if(files.length){
            files.forEach(val=>{
                formData.append("uploadedFile", val);
            })
        }

        try {
            setIsDisabled(true);
            let res = await axios.post(`/api/v1/estimates/create`,formData , {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            if(res.data.success)
            {
                toast.success(res.data.message, {duration:2000});
                setTimeout(()=>{
                    setIsDisabled(false);
                    setOpenModel(false);
                    dispatch(getALlEstimates())
                },2100)
            }
        } catch (error) {
            toast.error(error.message || "Some error in creating estimate")
            setIsDisabled(false);
        }
    }

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-full mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Estimate Details
            </h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="">
                        <label className="block text-gray-700 font-medium">
                            Estimate Number  <span className="text-red-500">*</span>
                        </label>
                        <InputText
                            className="w-full h-10"
                            placeholder="EST#001"
                            {...register("estimateNumber", {
                                required: "Estimate Number required",
                                onChange: (e) => {
                                    e.target.value = removeDomElementsFromInput(e.target.value);
                                    e.target.value = e.target.value.trim()
                                },
                            })}
                        />
                        {errors.estimateNumber && (
                            <p className="text-red-400 font-size-error">
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
                                    onChange={(e) => {
                                        field.onChange(e.value);
                                    }}
                                />
                            )}
                        />
                    </div>

                    <div className="">
                        <label className="block text-gray-700 font-medium">
                            Currency  <span className="text-red-500">*</span>
                        </label>
                        <Controller
                            name="currency"
                            control={control}
                            rules={{ required: "Currency required" }}
                            render={({ field }) => (
                                <Dropdown
                                    {...field}
                                    className="w-full h-10 items-center"
                                    options={currencyList}
                                    // value="INR"
                                    placeholder="Select Currency"
                                    onChange={(e) =>
                                        field.onChange(e.value)
                                    }
                                />
                            )}
                            />
                            {errors.currency && (
                                <p className="text-red-400 font-size-error">
                                    {errors.currency.message}
                                </p>
                            )}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
                    <div className="flex items-end space-x-2 w-full">
                        <div className="w-full">
                            <label className="block text-gray-700 font-medium">
                                Client  <span className="text-red-500">*</span>
                            </label>
                            <Controller
                                name="client"
                                control={control}
                                rules={{ required: "Client required" }}
                                render={({ field }) => (
                                    <Dropdown
                                        {...field}
                                        className="w-full h-10 items-center"
                                        options={allAdmins}
                                        placeholder="Select Client"
                                        onChange={(e) => field.onChange(e.value)}
                                    />
                                )}
                                />
                            {errors.client && (
                                <p className="text-red-400 font-size-error">
                                    {errors.client.message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* <div className="my-3 w-full">
                    <label className="block text-gray-700 font-medium">
                        Description 
                    </label>
                    <Editor
                        name="description"
                        className="w-full mt-1"
                        onTextChange={(e) => {
                            let removeTag =
                                e.htmlValue &&
                                e.htmlValue.replace(/<\/?p>/g, "");
                                setValue("description", removeTag, {
                                shouldValidate: true,
                            });                        
                        }}
                    />
                </div> */}

                <div className="grid grid-cols-1 gap-2">
                    <label htmlFor="productName" className="text-gray-700 font-medium">
                        Product / Task Name <span className="text-red-500">*</span>
                    </label>
                    
                    <InputText
                        id="productName"
                        className="w-full md:w-1/3 h-10"
                        placeholder="Enter Product / Task"
                        {...register("productName", {
                            required: "Product / Task required",
                        })}
                        onInput={(e) => {
                            let sanitizedText = removeDomElementsFromInput(e.target.value);
                            e.target.value = sanitizedText.charAt(0).toUpperCase() + sanitizedText.slice(1);
                        }}
                    />

                    {errors.productName && (
                        <p className="text-red-400 font-size-error">
                            {errors.productName.message}
                        </p>
                    )}
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
                                        name="itemName"
                                        className="h-10 w-full"
                                        placeholder="Item Name"
                                        {...register("itemName")}
                                        onInput={(e)=> {
                                            let sanitize = removeDomElementsFromInput(e.target.value);
                                            e.target.value = sanitize.charAt(0).toUpperCase() + sanitize.slice(1);                           
                                        }}
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
                                        onInput={(e) =>{
                                            e.target.value =e.target.value.replace(/\D/g,""),
                                            e.target.value = parseInt(e.target.value) || ""
                                        }}
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
                                        rules={{ required: "Select Tax Percentage" }}
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
                                    {errors.tax && (
                                        <p className="text-red-400 font-size-error">
                                        {errors.tax.message}
                                        </p>
                                    )}
                                </td>
                                <td
                                    rowSpan={2}
                                    className="bg-gray-200 p-2 text-center"
                                >
                                    {taxedAmount || 0}
                                </td>
                            </tr>
                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-gray-300 p-2"
                                >
                                    <InputTextarea
                                        name="itemDescription"
                                        rows={3}
                                        className="w-full"
                                        placeholder="Enter Description"
                                        {...register("itemDescription")}
                                        onInput={(e)=> {
                                            let sanitize = removeDomElementsFromInput(e.target.value);
                                            e.target.value = sanitize.charAt(0).toUpperCase() + sanitize.slice(1);                           
                                        }}
                                    />
                                </td>
                                <td className="border border-gray-300 p-2 text-center">
                                {files && files.length <5 ?(
                                    <>
                                        <label htmlFor="fileUpload" className="cursor-pointer">
                                            <img src={cloud} alt="Upload" className="w-10 mx-auto" />
                                            <span className="text-sm font-bold text-gray-400 hover:text-gray-700">
                                            Choose a file
                                            </span>
                                        </label>
                                    <input
                                        // disabled={}
                                        type="file"
                                        multiple
                                        id="fileUpload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    /> 
                                    </>) : (<p className="text-red-400">Max 5 files allowed</p>)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                {Array.isArray(files) && files.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {files.map((file, index) => (
                            <div 
                                key={index} 
                                className="flex items-center bg-gray-100 p-1 rounded-md"
                            >
                                <span className="text-gray-700 text-sm truncate max-w-[120px]">{file.name}</span>
                                <i
                                    title="Remove File"
                                    className="pi pi-times text-red-700 font-bold ml-2 cursor-pointer"
                                    onClick={() => handleRemoveFile(index)}
                                ></i>
                            </div>
                        ))}
                    </div>
                )}

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
                                            let value = e.target.value.replace(/\D/g,"");
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
                                        {...register("responseMessage")}
                                        onInput={(e)=> {
                                            let sanitize = removeDomElementsFromInput(e.target.value);
                                            e.target.value = sanitize.charAt(0).toUpperCase() + sanitize.slice(1);                           
                                        }}
                                    />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className={`${isDisabled ? "" : "flex gap-2"} `}>
                {
                    isDisabled ? (
                        <div className="text-center">
                        <ProgressSpinner 
                            style={{width: '50px', height: '50px'}} 
                            strokeWidth="8" fill="var(--surface-ground)" 
                            animationDuration=".5s" 
                        /> 
                        <p className="text-gray-600">Please wait.. Submitting Data</p>
                        </div>
                    ) : (
                    <>
                        <Button
                            type="submit"
                            label="Save"
                            size="small"
                            icon="pi pi-check"
                            disabled={isDisabled}
                            className="p-2 px-4 text-white bg-blue-600 text-sm"
                        />
                        <Button
                            outlined
                            label="Cancel"
                            severity="secondary"
                            size="small"
                            className="p-2 px-4 text-gray-600 text-sm hover:text-blue-600"
                            onClick={()=>setOpenModel(false)}
                        />
                    </>)
                }
                    
                </div>
            </form>
        </div>
    );
};

export default CreateEstimate;
