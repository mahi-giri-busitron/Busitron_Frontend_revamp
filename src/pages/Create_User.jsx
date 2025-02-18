import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "primereact/checkbox";
import { InputText } from "primereact/inputtext";

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

    const onSubmit = (data) => {
        reset();
        setChecked(false);
        setPreview(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClick = () => {};

    return (
        <div className="flex justify-center items-center py-10 bg-gray-100 px-4">
            <div className="w-1/2 max-w-4xl shadow-lg rounded-lg bg-white p-6 sm:p-8 my-4 sm:my-8 grid grid-cols-1 sm:grid-cols-1 gap-6">
                <div className="col-span-2 flex justify-center">
                    <h1 className="font-semibold text-xl sm:text-2xl text-gray-800 mb-4">
                        Add your Details
                    </h1>
                </div>
                <div className="col-span-2 flex flex-col items-center space-y-3">
                    <div className="relative">
                        {preview ? (
                            <img
                                src={preview}
                                alt="Profile"
                                className="w-28 h-28 sm:w-36 sm:h-36 md:w-36 md:h-36 lg:w-52 lg:h-52 rounded-full object-cover border-4  border-gray-100 "
                            />
                        ) : (
                            <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-36 md:h-36 lg:w-52 lg:h-52 rounded-full bg-gray-200 flex items-center justify-center border-4 border-gray-100">
                                <i className="pi pi-user text-gray-400 text-5xl"></i>
                            </div>
                        )}

                        <div className="relative">
                            <label
                                htmlFor="profilePicInput"
                                className="absolute flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full shadow-lg cursor-pointer right-0 bottom-0 transform translate-x-0 translate-y-0"
                                onClick={handleClick()}
                            >
                                <i className="pi pi-pencil text-white text-lg"></i>
                            </label>
                        </div>
                    </div>

                    <input
                        id="profilePicInput"
                        type="file"
                        accept="image/*"
                        {...register("profilePic", {
                            required: "Profile picture is required",
                        })}
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    {errors.profilePic && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.profilePic.message}
                        </p>
                    )}
                </div>

                {/* Form Section */}

                {/* Left side */}
                <div className="space-y-4 sm:px-4 md:px-6 lg:px-8">
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-3"
                    >
                        {/* Full Name */}
                        <div className="flex flex-col items-start">
                            <label className="font-medium text-gray-700">
                                Full Name
                            </label>
                            <InputText
                                type="text"
                                {...register("fullName", {
                                    required: "Full name is required",
                                })}
                                placeholder="Enter your Full Name"
                                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <div className="h-4">
                                {errors.fullName && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.fullName.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col">
                            <label className="block text-gray-700 font-medium mb-1">
                                Phone
                            </label>
                            <InputText
                                type="text"
                                maxLength={10}
                                placeholder="Enter 10-digit number"
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^\d{10}$/,
                                        message:
                                            "Phone number must be exactly 10 digits",
                                    },
                                })}
                                onChange={(e) => {
                                    let numericValue = e.target.value.replace(
                                        /\D/g,
                                        ""
                                    );
                                    if (numericValue.length > 10) {
                                        numericValue = numericValue.slice(
                                            0,
                                            10
                                        );
                                    }
                                    setValue("phone", numericValue, {
                                        shouldValidate: true,
                                    });
                                    trigger("phone");
                                }}
                                value={watch("phone") || ""}
                            />
                            <div className="h-4">
                                {errors.phone && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
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
                            <div className="h-5">
                                {errors.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>

                {/* Submit Section */}
                <div className="col-span-2 flex flex-col items-center">
                    <div className="py-1">
                        <Checkbox
                            inputId="terms"
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
                        <label htmlFor="terms" className="px-1 text-gray-700">
                            I agree to the terms and conditions
                        </label>
                    </div>
                    {errors.terms && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.terms.message}
                        </p>
                    )}
                    <button
                        className={`w-1/3 py-3 rounded-md font-medium text-white transition-all ${
                            checked
                                ? "bg-gray-900 hover:bg-gray-800"
                                : "bg-gray-400 cursor-not-allowed"
                        }`}
                        disabled={!checked}
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Create_User;
