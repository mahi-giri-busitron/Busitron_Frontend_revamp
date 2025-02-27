import { useState } from "react";

function ChatList({ onSelectUser }) {
    const [searchTerm, setSearchTerm] = useState("");

    const users = [
        {
            profile:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            name: "Manikanta",
            message: "Hiii, I am Manikanta",
        },
        {
            profile:
                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
            name: "John Doe",
            message: "Hello! How's it going?",
        },
    ];

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="w-full max-w-sm p-4 bg-white shadow-md rounded-lg h-full overflow-hidden flex flex-col">
            <div className="relative border-3 border-gray-300 outline-none rounded-lg">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full p-2 pl-10 rounded !outline-0 !focus:outline-0 !active:outline-0"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <i className="pi pi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            </div>

            <div className="space-y-4 flex-1 overflow-y-auto mt-4">
                {filteredUsers.map((user, index) => (
                    <div
                        key={index}
                        className="flex items-center p-3 border-b rounded-lg rounded-bl-none rounded-br-none hover:bg-gray-100 cursor-pointer"
                        onClick={() => onSelectUser(user)}
                    >
                        <img
                            src={user.profile}
                            alt="Profile"
                            className="w-12 h-12 rounded-full mr-3"
                        />
                        <div className="flex-1">
                            <h5 className="text-sm font-medium text-gray-900">
                                {user.name}
                            </h5>
                            <p className="text-xs text-gray-600 truncate w-48">
                                {user.message}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatList;
