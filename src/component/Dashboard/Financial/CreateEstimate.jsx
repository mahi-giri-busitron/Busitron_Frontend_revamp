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
        defaultValues: { amount: "",tax: ""},
    });

    let [files , setFiles] = useState([]);
    let [isDisabled , setIsDisabled] = useState(false);

    let dispatch = useDispatch();

    let amount = parseFloat(useWatch({ control, name: "amount" })) || 0;
    let tax = parseFloat(useWatch({ control, name: "tax" })) || 0;
    
    let taxAmount = (amount * tax) / 100;
    let finalAmount = (amount + taxAmount).toFixed(2);

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

        if(data?.projectName?.trim()== "")
        {
            setError("projectName",{type: "manual", message : "Project Name required*"});
            return;
        }

        if(data?.amount == "")
        {
            setError("amount",{type: "manual", message : "Amount Required*"});
            return;
        }

        formData.append("userId",currentUser.data._id);
        formData.append("validTill", data.validTill ? moment(data.validTill).format("DD-MM-YYYY") : "");
        formData.append("currency", data.currency);
        formData.append("clientId", data.client);
        formData.append("projectName", data.projectName);
        formData.append("amount", data.amount);
        formData.append("description", data.description)
        formData.append("taxPercentage", data.tax);
        formData.append("taxAmount", taxAmount || "0");
        formData.append("finalAmount", finalAmount || "0");
       
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
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
                    <div className="">
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
                                    placeholder="Enter Date"
                                    className="w-full h-10"
                                    minDate={new Date()}
                                    showIcon
                                    onChange={(e) => {
                                        field.onChange(e.value);
                                    }}
                                />
                            )}
                        />
                        {errors.validTill && (
                            <p className="text-red-400 font-size-error">
                                {errors.validTill.message}
                            </p>
                        )}
                    </div>
                </div>

                <div className="my-5 overflow-x-auto rounded-md">
                    <table className="table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 p-2 text-center">
                                    Project Name
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Amount
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Tax (%)
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Tax Amount
                                </th>
                                <th className="border border-gray-300 p-2 text-center">
                                    Final Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="w-[40%] border border-gray-300 p-1 text-center">
                                    <InputText
                                        className="w-full h-10"
                                        placeholder="Enter Project "
                                        {...register("projectName", {
                                            required: "Project Name required",
                                        })}
                                        onInput={(e) => {
                                            let sanitizedText = removeDomElementsFromInput(e.target.value);
                                            e.target.value = sanitizedText.charAt(0).toUpperCase() + sanitizedText.slice(1);
                                        }}
                                    />
                                    {errors.projectName && (
                                        <p className="text-red-400 font-size-error">
                                            {errors.projectName.message}
                                        </p>
                                    )}
                                </td>
                                <td className="border border-gray-300 p-1 text-center w-[15%]">
                                    <InputText
                                        tooltip="Only Numbers are allowed"
                                        className="h-10 w-full text-end"
                                        placeholder="Enter Amount"
                                        {...register("amount", {
                                            required: "Amount Required",
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
                                    {errors.amount && (
                                        <p className="text-red-400 font-size-error">
                                            {errors.amount.message}
                                        </p>
                                    )}
                                </td>
                                
                                <td className="border border-gray-300 p-2 text-center w-[15%]">
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
                                <td className="bg-gray-50 p-2 text-center w-[15%]">{taxAmount || 0}</td>
                                <td
                                    className="bg-gray-200 p-2 text-center w-[15%]"
                                >
                                    {finalAmount || 0}
                                </td>
                            </tr>

                            <tr>
                                <td
                                    colSpan={3}
                                    className="border border-gray-300 p-2"
                                >
                                    <InputTextarea
                                        name="description"
                                        rows={3}
                                        className="w-full"
                                        placeholder="Enter Project Description (optional)"
                                        {...register("description")}
                                        onInput={(e)=> {
                                            let sanitize = removeDomElementsFromInput(e.target.value);
                                            e.target.value = sanitize.charAt(0).toUpperCase() + sanitize.slice(1);                           
                                        }}
                                    />
                                </td>
                                <td 
                                    className="border border-gray-300 p-2 text-center" 
                                    colSpan={2}
                                >
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
                    <div className="flex flex-wrap gap-2 my-2">
                        {files.map((file, index) => (
                            <div 
                                key={index} 
                                className="flex items-center bg-gray-100 p-1 rounded-md"
                            >
                                <span className="text-gray-700 text-sm truncate max-w-[150px]">{file.name}</span>
                                <i
                                    title="Remove File"
                                    className="pi pi-times text-red-700 font-bold ml-2 cursor-pointer"
                                    onClick={() => handleRemoveFile(index)}
                                ></i>
                            </div>
                        ))}
                    </div>
                )}

                <div className={`${isDisabled ? "" : "flex gap-2 mt-2"} `}>
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
