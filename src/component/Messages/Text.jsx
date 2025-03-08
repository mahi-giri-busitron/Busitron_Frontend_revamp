import React from "react";
import extractLinks from "../../utils/extractLinks";
import Microlink from "@microlink/react";

export default function Text({ incoming, author, timestamp, content }) {
    const { links, originalString } = extractLinks(content);

    return (
        <div
            className={`flex flex-col p-2 text-white ${
                incoming ? "items-start" : "items-end"
            }`}
        >
            <div
                className={`relative text-black px-3 py-2 rounded-2xl space-y-2 md:max-w-sm max-w-105 bg-white ${
                    incoming ? "rounded-tl-none" : "rounded-br-none"
                }`}
            >
                <p dangerouslySetInnerHTML={{ __html: originalString }}></p>
                {links.length > 0 && (
                    <Microlink style={{ width: "100%" }} url={links[0]} />
                )}
            </div>

            <p
                className={`text-xs text-gray-700 mt-1 ${
                    incoming ? "self-start" : "self-end"
                }`}
            >
                {timestamp}
            </p>
        </div>
    );
}
