import io from "socket.io-client";

let socket = null;

export const connectWithSocketServer = (userDetails) => {
    const jwtToken = userDetails.token;

    socket = io("http://localhost:5421", {
        auth: {
            token: jwtToken,
        },
    });

    return socket;
};

export const sendDirectMessage = (data) => {

    socket.emit("new-message", data);
};

export const getDirectChatHistory = (data) => {

    socket.emit("direct-chat-history", data);
};


export default socket;
