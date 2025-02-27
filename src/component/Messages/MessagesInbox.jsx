import { useState, useEffect, useRef } from "react";
import EmojiPicker from "emoji-picker-react";
import MsgSeparator from "./MessageSeparator.jsx";
import Text from "./Text.jsx";
import Media from "./Media.jsx";
import Document from "./Document.jsx";

function MessagesInbox({ selectedUser }) {
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(
        selectedUser ? selectedUser.messages : []
    );
    const [showDropdown, setShowDropdown] = useState(false);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const fileInputRef = useRef(null);
    const messagesEndRef = useRef(null);
    const dropdownRef = useRef(null);
    const paperclipRef = useRef(null);
    const emojiPickerRef = useRef(null);

    useEffect(() => {
        if (selectedUser) {
            setMessages(selectedUser.messages);
        }
    }, [selectedUser]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                (dropdownRef.current &&
                    !dropdownRef.current.contains(event.target) &&
                    paperclipRef.current &&
                    !paperclipRef.current.contains(event.target)) ||
                (emojiPickerRef.current &&
                    !emojiPickerRef.current.contains(event.target) &&
                    event.target.closest(".pi-face-smile") === null)
            ) {
                setShowDropdown(false);
                setShowEmojiPicker(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!selectedUser) {
        return (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                <h2 className="text-gray-600">Select a user to start chat</h2>
            </div>
        );
    }

    const formatTime = () => {
        const now = new Date();
        return now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
        });
    };

    const sendMessage = () => {
        if (message.trim() === "") return;

        const newMessage = { message, sender: "user", timestamp: formatTime() };
        setMessages([...messages, newMessage]);
        setMessage("");
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            sendMessage();
        }
    };

    const handleFileUpload = (type) => {
        fileInputRef.current.click();
        console.log(`Selected File Type: ${type}`);
        setShowDropdown(false);
    };

    const handleEmojiClick = (emojiObject) => {
        setMessage((prev) => prev + emojiObject.emoji);
    };

    const mediafiles = [
        {
            url: "https://plus.unsplash.com/premium_photo-1674940594598-98e9e13f99f5?q=80&w=2094&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://plus.unsplash.com/premium_photo-1690442479979-545e44b856a5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1740137660661-274c804a891d?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1740137660661-274c804a891d?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1739959272086-afc87e72776b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://images.unsplash.com/photo-1739900306545-511948419120?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            url: "https://logos-download.com/wp-content/uploads/2016/09/React_logo_logotype_emblem.png",
        },
    ];

    const videoFiles = [
        {
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            type: "video",
        },
        {
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            type: "video",
        },
        {
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
            type: "video",
        },
        {
            url: "hhttp://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
            type: "video",
        },
        {
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
            type: "video",
        },
        {
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
            type: "video",
        },
        {
            url: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            type: "video",
        },
    ];

    const doc = { name: "Pan card", size: "5" };
    return (
        <div className="w-full h-full flex flex-col ">
            <div className="border-b-3 border-gray-100 h-16  items-center px-4  flex justify-between">
                <div className="flex ">
                    <img
                        src={selectedUser.profile}
                        alt="Profile"
                        className="w-10 h-10 rounded-full mr-3 border border-white"
                    />
                    <h2 className="text-lg text-gray-700 ">
                        {selectedUser.name}
                    </h2>
                </div>
                <div>
                    <i className="pi pi-trash"></i>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-2">
                <Text
                    incoming={true}
                    author="mani"
                    timestamp="12:36"
                    content={"Hi mani how are you...!"}
                />
                <Text
                    incoming={false}
                    author="mani"
                    timestamp="12:36"
                    content={"https://www.npmjs.com/package/@microlink/react"}
                />
                <Text
                    incoming={true}
                    author="mani"
                    timestamp="12:36"
                    content={"Hi mani how are you...!"}
                />
                <MsgSeparator date={"2025-02-22T06:27:09.910Z"} />
                <Text
                    incoming={true}
                    author="mani"
                    timestamp="12:36"
                    content={"https://www.npmjs.com/package/@microlink/react"}
                />
                <Text
                    incoming={false}
                    author="mani"
                    timestamp="12:36"
                    content={"Hi mani how are you...!"}
                />
                <Text
                    incoming={true}
                    author="mani"
                    timestamp="12:36"
                    content={"Hi mani how are you...!"}
                />

                <Media
                    incoming={true}
                    author="mani"
                    timestamp="12:36"
                    media={mediafiles}
                    caption={message.content}
                />

                <Media
                    incoming={false}
                    author="mani"
                    timestamp="12:36"
                    media={mediafiles}
                    caption={message.content}
                />
                <Media
                    incoming={false}
                    author="mani"
                    timestamp="12:36"
                    media={videoFiles}
                    caption={message.content}
                />

                <Document
                    incoming={false}
                    author="mani"
                    timestamp="12:37"
                    content="Pan details"
                    document={doc}
                />

                <Document
                    incoming={true}
                    author="mani"
                    timestamp="12:37"
                    content="Pan details"
                    document={doc}
                />
                <div ref={messagesEndRef} />
            </div>

            <div className="relative border-t-3 border-gray-200 bg-white p-3 flex items-center">
                <div className="relative">
                    <button
                        className="mr-3 text-gray-600 hover:text-gray-900"
                        onClick={() => setShowEmojiPicker((prev) => !prev)}
                    >
                        <i className="pi pi-face-smile"></i>
                    </button>
                    {showEmojiPicker && (
                        <div
                            ref={emojiPickerRef}
                            className="absolute bottom-12 left-0 z-10"
                        >
                            <EmojiPicker onEmojiClick={handleEmojiClick} />
                        </div>
                    )}
                </div>

                <div className="relative">
                    <button
                        ref={paperclipRef}
                        className="mr-3 text-gray-600 hover:text-gray-900"
                        onClick={() => setShowDropdown((prev) => !prev)}
                    >
                        <i className="pi pi-paperclip"></i>
                    </button>

                    {showDropdown && (
                        <div
                            ref={dropdownRef}
                            className="absolute bottom-12 left-0 bg-white shadow-lg rounded-lg p-2 w-38 z-10"
                        >
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={() => handleFileUpload("image")}
                            >
                                🖼️ Image
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={() => handleFileUpload("video")}
                            >
                                🎥 Video
                            </button>
                            <button
                                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                                onClick={() => handleFileUpload("document")}
                            >
                                📄 Document
                            </button>
                        </div>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) =>
                        console.log("File Selected:", e.target.files[0])
                    }
                />
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 p-2 border rounded-lg focus:outline-none"
                />

                <button
                    onClick={sendMessage}
                    className="ml-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    <i className="pi pi-send"></i>
                </button>
            </div>
        </div>
    );
}

export default MessagesInbox;
