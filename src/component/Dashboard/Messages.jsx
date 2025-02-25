import React, { useState } from "react";
import ChatList from "../Messages/ChatList.jsx";
import MessagesInbox from "../Messages/MessagesInbox.jsx";

function Messages() {
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className="flex h-full border-b-2">
            <div className="">
                <ChatList onSelectUser={setSelectedUser} />
            </div>
            <div className="w-full">
                <MessagesInbox selectedUser={selectedUser} />
            </div>
        </div>
    );
}

export default Messages;
