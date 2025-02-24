import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { countryCodes } from "../utils/countryCodes";
import { Calendar } from "primereact/calendar";
import { RadioButton } from "primereact/radiobutton";

const Create_User = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        watch,
        trigger,
    } = useForm();

    const [checked, setChecked] = useState(false);
    const [preview, setPreview] = useState(null);
    const [selectedCode, setSelectedCode] = useState(
        countryCodes.find((c) => c.code === "+91")
    );
    const [selectedGender, setSelectedGender] = useState(null);

    const onSubmit = (data) => {
        console.log("form data", data);
        reset();
        setChecked(false);
        setPreview(null);
    };

    const genderOptions = [
        { label: "Male", value: "male" },
        { label: "Female", value: "female" },
        { label: "Other", value: "other" },
    ];

    const maritalStatusOptions = [
        { label: "Single", value: "single" },
        { label: "Married", value: "married" },
        { label: "Divorced", value: "divorced" },
        { label: "Widowed", value: "widowed" },
    ];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setValue("profilePic", file, { shouldValidate: true });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {};

    return (
        <div className="pt-16 flex justify-center items-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-lg shadow-lg rounded-lg bg-white p-6 sm:p-8 my-2">
                <h1 className="text-center font-semibold text-2xl text-gray-800 mb-4">
                    Add your details
                </h1>
                <div className="flex flex-col items-center space-y-3">
                    <div className="relative">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Profile"
                                className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-100"
                            />
                        ) : (
                            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-100">
                                <i className="pi pi-user text-gray-400 text-4xl"></i>
                            </div>
                        )}

                        <label
                            htmlFor="profilePicInput"
                            className="absolute flex items-center justify-center w-8 h-8 bg-blue-600 rounded-full shadow-lg cursor-pointer right-0 bottom-0"
                            onClick={handleClick}
                        >
                            <i className="pi pi-pencil text-white text-lg"></i>
                        </label>
                    </div>

                    <input
                        id="profilePicInput"
                        type="file"
                        accept="image/*"
                        {...register("profilePic", {
                            required: preview
                                ? false
                                : "Profile picture is required",
                        })}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {errors.profilePicInput && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.profilePicInput.message}
                        </p>
                    )}
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 mt-6"
                >
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">
                            Full Name
                        </label>
                        <InputText
                            {...register("fullName", {
                                required: "Full name is required",
                            })}
                            placeholder="Tony Stark"
                            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.fullName.message}
                            </p>
                        )}
                    </div>
                    {/*Gender*/}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">
                            Gender
                        </label>
                        <div className="flex gap-4 ">
                            {genderOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className="flex items-center text-sm"
                                >
                                    <RadioButton
                                        inputId={option.value}
                                        {...register("gender", {
                                            required: "Gender is required",
                                        })}
                                        value={option.value}
                                        onChange={(e) =>
                                            setValue("gender", e.value)
                                        }
                                        checked={
                                            watch("gender") === option.value
                                        }
                                    />
                                    <label
                                        htmlFor={option.value}
                                        className="ml-2"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.gender && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.gender.message}
                            </p>
                        )}
                    </div>
                    {/*phone*/}
                    <div>
                        <label className="font-medium text-gray-700">
                            Phone
                        </label>
                        <div className="flex flex-row gap-2 flex-nowrap items-center Dropdown">
                            <Dropdown
                                value={selectedCode}
                                options={countryCodes}
                                onChange={(e) => {
                                    setSelectedCode(e.value);
                                    setValue("countryCode", e.value.code);
                                }}
                                placeholder="Select"
                                className="sm:w-24 md:w-34 text-xs lg:text-sm"
                                optionLabel="code"
                                valueTemplate={(option) =>
                                    option ? (
                                        <div className="flex items-center gap-1">
                                            <img
                                                src={option.flag}
                                                alt={option.name}
                                                className="w-6 h-5 hidden sm:block"
                                            />
                                            <span className="text-xs lg:text-sm">
                                                {option.code}
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
                                            {option.code}
                                        </span>
                                        <span className="text-xs sm:text-sm">
                                            {option.name}
                                        </span>
                                    </div>
                                )}
                                filter
                                filterBy="name"
                            />
                            <InputText
                                type="text"
                                maxLength={selectedCode?.length || 10}
                                placeholder={`Enter ${
                                    selectedCode?.length || 10
                                }-digit number`}
                                className="w-full text-xs sm:text-sm placeholder:text-[12px] sm:placeholder:text-sm"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: new RegExp(
                                            `^\\d{${
                                                selectedCode?.length || 10
                                            }}$`
                                        ),
                                        message: `Phone number must be exactly ${
                                            selectedCode?.length || 10
                                        } digits`,
                                    },
                                })}
                                onChange={(e) => {
                                    let numericValue = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );
                                    if (
                                        numericValue.length >
                                        (selectedCode?.length || 10)
                                    ) {
                                        numericValue = numericValue.slice(
                                            0,
                                            selectedCode.length
                                        );
                                    }
                                    setValue("phone", numericValue, {
                                        shouldValidate: true,
                                    });
                                    trigger("phone");
                                }}
                                value={watch("phone") || ""}
                            />
                        </div>
                        <input type="hidden" {...register("countryCode")} />
                        {errors.phone && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.phone.message}
                            </p>
                        )}
                    </div>

                    {/* Email Field */}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">
                            Email
                        </label>
                        <InputText
                            placeholder="name@example.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/*Statu*/}
                    <div className="flex flex-col">
                        <label className="font-medium text-gray-700">
                            Marital Status
                        </label>
                        <div className="flex gap-4 text-sm p-1">
                            {maritalStatusOptions.map((option) => (
                                <div
                                    key={option.value}
                                    className="flex items-center"
                                >
                                    <RadioButton
                                        inputId={option.value}
                                        {...register("maritalStatus", {
                                            required:
                                                "Marital status is required",
                                        })}
                                        value={option.value}
                                        onChange={(e) =>
                                            setValue("maritalStatus", e.value)
                                        }
                                        checked={
                                            watch("maritalStatus") ===
                                            option.value
                                        }
                                    />
                                    <label
                                        htmlFor={option.value}
                                        className="ml-2"
                                    >
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                        {errors.maritalStatus && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.maritalStatus.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <label
                            htmlFor="dob"
                            className="font-medium text-gray-700"
                        >
                            Date of Birth
                        </label>
                        <Calendar
                            id="dob"
                            showIcon
                            dateFormat="dd/mm/yy"
                            placeholder="Date of Birth"
                            value={watch("dob")}
                            onChange={(e) => {
                                setValue("dob", e.value, {
                                    shouldValidate: true,
                                });
                                trigger("dob");
                            }}
                        />

                        <input
                            type="hidden"
                            {...register("dob", {
                                required: "Date of Birth is required",
                            })}
                        />
                        {errors.dob && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.dob.message}
                            </p>
                        )}
                    </div>
                    <div className="flex items-center">
                        <Checkbox
                            checked={checked}
                            {...register("terms", {
                                required: "You must agree to the terms",
                            })}
                            onChange={(e) => {
                                setChecked(e.checked);
                                setValue("terms", e.checked);
                                trigger("terms");
                            }}
                        />
                        <label className="px-1 text-gray-700">
                            I agree to the terms
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-xs">
                            {errors.terms.message}
                        </p>
                    )}
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-md font-medium text-white ${
                            checked
                                ? "bg-blue-600 hover:bg-blue-500"
                                : "bg-gray-400"
                        }`}
                        disabled={!checked}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Create_User;
