import React, { useState, useRef } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../redux/userSlice";
import { ProgressSpinner } from "primereact/progressspinner";
import toast from "react-hot-toast";

const genderOptions = [
    { label: "male", value: "male" },
    { label: "female", value: "female" },
    { label: "other", value: "other" },
];

const maritalOptions = [
    { label: "single", value: "single" },
    { label: "married", value: "married" },
    { label: "divorced", value: "divorced" },
    { label: "widowed", value: "widowed" },
];

const Profile = () => {
    const fileInputRef = useRef(null);

    const { currentUser, loading } = useSelector((state) => state.user);

    const [userData, setUserData] = useState({
        name: currentUser?.data?.name || "",
        email: currentUser?.data?.email || "",
        phoneNumber: currentUser?.data?.phoneNumber || "",
        gender: currentUser?.data?.gender || "",
        dateOfBirth: currentUser?.data?.dateOfBirth
            ? new Date(currentUser?.data?.dateOfBirth)
            : null,
        maritalStatus: currentUser?.data?.maritalStatus || "",
        designation: currentUser?.data?.designation || "",
        employeeId: currentUser?.data?.employeeId || "",
        avatar: currentUser?.data?.avatar || "",
        password: "",
        address: currentUser?.data?.address || "",
    });

    const dispatch = useDispatch();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];

        if (file) {
            setUserData((prev) => ({
                ...prev,
                avatar: file,
            }));
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById("previewImage").src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    const handleChange = (value, field) => {
        setUserData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    async function handleProfileUpdate() {
        const formData = new FormData();
        formData.append("phone", userData.phoneNumber);
        formData.append("fullName", userData.name);
        formData.append("dob", userData.dateOfBirth);
        formData.append("gender", userData.gender);
        formData.append("maritalStatus", userData.maritalStatus);
        if (userData.avatar) formData.append("profilePic", userData.avatar);
        if (userData.password) formData.append("password", userData.password);
        formData.append("address", userData.address);

        const apiResponse = await dispatch(updateUser(formData));

        if (updateUser.fulfilled.match(apiResponse)) {
            toast.success(
                apiResponse.payload.message || "Profile updated successfully"
            );
        } else {
            toast.error(apiResponse?.payload || "Something went wrong!");
        }

        setUserData((prev) => ({
            ...prev,
            password: "",
        }));
    }

    return (
        <div className="profile_parent_wrapper">
            <div className="Profile_wrapper">
                <div className="card">
                    <TabView>
                        <TabPanel header="Profile">
                            <div className="profile_input_picker relative w-full max-w-[150px]">
                                <label
                                    htmlFor="fileInput"
                                    className="profile-pic"
                                >
                                    <figure className="group flex justify-center items-center w-[150px] h-[150px]">
                                        <img
                                            id="previewImage"
                                            className="h-full w-full rounded-full"
                                            src={currentUser?.data?.avatar}
                                            alt="Profile Picture"
                                        />
                                    </figure>
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    className="hidden"
                                    ref={fileInputRef}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                                <span
                                    onClick={handleClick}
                                    className="mt-0 mr-0 absolute flex items-center justify-center h-10 w-10 left-[110px] -bottom-0 bg-[#00715d] text-white cursor-pointer"
                                >
                                    <i className="pi pi-pencil"></i>
                                </span>
                            </div>
                            <div className="form_wrapper my-5">
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p>Your Name</p>
                                        <InputText
                                            className="w-full"
                                            value={userData.name}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.value,
                                                    "name"
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <p>Your Email</p>
                                        <InputText
                                            className="w-full"
                                            disabled
                                            value={userData.email}
                                        />
                                    </div>
                                    <div>
                                        <p>Your Password</p>
                                        <Password
                                            className="w-full"
                                            value={userData.password}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.value,
                                                    "password"
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <p>Mobile</p>
                                        <InputText
                                            className="w-full"
                                            value={userData.phoneNumber}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.target.value,
                                                    "phoneNumber"
                                                )
                                            }
                                        />
                                    </div>
                                    <div>
                                        <p>Designation</p>
                                        <InputText
                                            disabled
                                            className="w-full"
                                            value={userData.designation}
                                        />
                                    </div>
                                    <div>
                                        <p>Employee ID</p>
                                        <InputText
                                            disabled
                                            className="w-full"
                                            value={userData.employeeId}
                                        />
                                    </div>
                                    <div>
                                        <p>Gender</p>
                                        <Dropdown
                                            value={userData.gender}
                                            onChange={(e) =>
                                                handleChange(e.value, "gender")
                                            }
                                            options={genderOptions}
                                            placeholder="Select Gender"
                                            className="w-full"
                                            optionLabel="label"
                                        />
                                    </div>
                                    <div>
                                        <p>Date of Birth</p>
                                        <Calendar
                                            value={userData.dateOfBirth}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.value,
                                                    "dateOfBirth"
                                                )
                                            }
                                            className="w-full"
                                        />
                                    </div>
                                    <div>
                                        <p>Marital Status</p>
                                        <Dropdown
                                            value={userData.maritalStatus}
                                            onChange={(e) =>
                                                handleChange(
                                                    e.value,
                                                    "maritalStatus"
                                                )
                                            }
                                            options={maritalOptions}
                                            placeholder="Select Status"
                                            className="w-full"
                                            optionLabel="label"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="place_text_area my-7">
                                <p>Your Address</p>
                                <InputTextarea
                                    value={userData.address || ""}
                                    onChange={(e) =>
                                        handleChange(e.target.value, "address")
                                    }
                                    rows={3}
                                    className="w-full"
                                    placeholder="Enter your address (optional)"
                                />
                            </div>
                            {loading ? (
                                <ProgressSpinner
                                    style={{
                                        width: "50px",
                                        height: "50px",
                                    }}
                                    strokeWidth="8"
                                    fill="var(--surface-ground)"
                                    animationDuration=".5s"
                                />
                            ) : (
                                <div className="profile_button">
                                    <Button
                                        label="Submit"
                                        onClick={handleProfileUpdate}
                                    />
                                </div>
                            )}
                        </TabPanel>
                    </TabView>
                </div>
            </div>
        </div>
    );
};

export default Profile;
