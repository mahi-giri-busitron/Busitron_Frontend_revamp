import { useState } from "react";

const TooltipButton = (props) => {
    const { onClickFunction, toolTipText = "hovering", iconCls = "" } = props;
    const [showTooltip, setShowTooltip] = useState(false);

    return (
        <div className="relative inline-block ">
            {showTooltip && (
                <div className=" inline-block text-center  absolute bottom-full right-[5px]   bg-gray-200 text-gray-600 text-sm px-2 py-1 rounded-md shadow-md ">
                    {toolTipText}
                </div>
            )}
            <button
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={onClickFunction}
            >
                <i className={iconCls}></i>
            </button>
        </div>
    );
};

export default TooltipButton;
