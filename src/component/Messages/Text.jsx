import React from "react";
import extractLinks from "../../utils/extractLinks";
import Microlink from "@microlink/react";

export default function Text({ incoming, author, timestamp, content }) {
    const { links, originalString } = extractLinks(content);

    return (
        <div
            className={`flex flex-col md:max-w-sm max-w-105 text-white p-3 rounded-2xl ${
                incoming ? "" : "ml-auto"
            }`}
        >
            {incoming && (
                <p className="text-sm font-medium text-gray-700">{author}</p>
            )}

            <div
                className={`relative text-black px-4 py-3 rounded-2xl space-y-2 shadow-md ${
                    incoming ? "rounded-tl-none" : "rounded-br-none"
                }`}
            >
                <p dangerouslySetInnerHTML={{ __html: originalString }}></p>
                {links.length > 0 && (
                    <Microlink style={{ width: "100%" }} url={links[0]} />
                )}
            </div>

            <p className="text-xs text-gray-700 mt-1">{timestamp}</p>
        </div>
    );
}
