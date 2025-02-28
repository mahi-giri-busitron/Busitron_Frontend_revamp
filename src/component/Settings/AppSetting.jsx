import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { TabMenu } from "primereact/tabmenu";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import {
    dateFormats,
    timeFormats,
    timezones,
    currencies,
    languages,
} from "../../utils/dropdowndata";
import { useDispatch } from "react-redux";
import { getAppSetting, updateAppSetting } from "../../redux/appSettingSlice";
import toast from "react-hot-toast";

const AppSettings = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [appSettingId, setAppSettingId] = useState(null);
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            dateFormat: "",
            timeFormat: "",
            timezone: "",
            currency: "",
            language: "",
        },
    });

    const items = [{ label: "App Settings", icon: "pi pi-cog" }];

    const onSubmit = async (data) => {
        const apiResult = await dispatch(
            updateAppSetting({ appSettingId, data })
        );
        if (updateAppSetting.fulfilled.match(apiResult)) {
            toast.success(apiResult.payload.message || "App setting updated!");
        } else {
            toast.error(apiResult?.payload || "Something went wrong!");
        }
    };

    const renderDropdown = (name, label, options) => (
        <div className="gap-2">
            <label htmlFor={name} className="font-medium">
                {label}
            </label>
            <Controller
                name={name}
                control={control}
                rules={{ required: `${label} is required` }}
                render={({ field }) => (
                    <Dropdown
                        id={name}
                        value={field.value}
                        onChange={(e) => field.onChange(e.value)}
                        options={options.map((opt) =>
                            typeof opt === "object"
                                ? { label: opt.label, value: opt.value }
                                : { label: opt, value: opt }
                        )}
                        placeholder={`Select ${label}`}
                        className={classNames("w-full", {
                            "p-invalid": errors[name],
                        })}
                    />
                )}
            />
            {errors[name] && (
                <small className="p-error">{errors[name].message}</small>
            )}
        </div>
    );

    const getAppSettingData = async () => {
        const apiResult = await dispatch(getAppSetting());
        // console.log(apiResult.payload.data[0]._id);
        setAppSettingId(apiResult?.payload?.data[0]?._id);

        if (getAppSetting.fulfilled.match(apiResult)) {
            const data = apiResult.payload.data[0];
            setValue("dateFormat", data.dateFormat || "");
            setValue("timeFormat", data.timeFormat || "");
            setValue("timezone", data.timeZone || "");
            setValue("currency", data.currency || "");
            setValue("language", data.language || "");

            toast.success(
                apiResult.payload.message || "App settings fetched successfully"
            );
        } else {
            toast.error(apiResult?.payload || "Something went wrong!");
        }
    };

    useEffect(() => {
        getAppSettingData();
    }, []); // Run only once on component mount

    const renderContent = () => {
        switch (activeIndex) {
            case 0:
                return (
                    <div className="flex flex-wrap gap-2">
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                            {renderDropdown(
                                "dateFormat",
                                "Date Format",
                                dateFormats
                            )}
                            {renderDropdown(
                                "timeFormat",
                                "Time Format",
                                timeFormats
                            )}
                            {renderDropdown(
                                "timezone",
                                "Default Timezone",
                                timezones
                            )}
                            {renderDropdown(
                                "currency",
                                "Default Currency",
                                currencies
                            )}
                            {renderDropdown("language", "Language", languages)}
                        </div>
                    </div>
                );
        }
    };

    return (
        <div className="card">
            <TabMenu
                model={items}
                activeIndex={activeIndex}
                onTabChange={(e) => setActiveIndex(e.index)}
            />
            <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
                {renderContent()}
                <Button
                    type="submit"
                    label="Save"
                    icon="pi pi-check"
                    className="mt-4"
                />
            </form>
        </div>
    );
};

export default AppSettings;
