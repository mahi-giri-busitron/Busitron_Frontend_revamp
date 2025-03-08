import React, { useEffect, useState } from "react";
import ChatList from "../Messages/ChatList.jsx";
import MessagesInbox from "../Messages/MessagesInbox.jsx";
import { useDispatch, useSelector } from "react-redux";
import { connectWithSocketServer } from "../../socket/socketConnection.js";
import {
    updateUserStatus,
    addMessage,
    replaceChatHistory,
} from "../../redux/chatSlice.js";
import MediaPicker from "../Messages/MediaPicker.jsx";
import DocumentPicker from "../Messages/DocumentPicker.jsx";

function Messages() {
    const dispatch = useDispatch();
    const { currentUser } = useSelector((state) => state.user);
    let isLoggedIn = currentUser.success;
    let token = currentUser.data.accessToken;

    useEffect(() => {
        let socket;
        if (isLoggedIn) {
            socket = connectWithSocketServer({
                token: token,
            });

            socket.on("connect", () => {
                console.log("succesfully connected with socket.io server");
            });

            socket.on("error", (data) => {});

            socket.on("user-disconnected", (data) => {
                dispatch(
                    updateUserStatus({
                        userId: data.userId,
                        status: data.status,
                    })
                );
            });

            socket.on("user-connected", (data) => {
                dispatch(
                    updateUserStatus({
                        userId: data.userId,
                        status: data.status,
                    })
                );
            });

            socket.on("chat-history", (data) => {
                dispatch(replaceChatHistory(data));
            });

            socket.on("new-direct-chat", (data) => {
                dispatch(addMessage(data));
            });
        }

        // Cleanup when the component unmounts or when the socket is manually disconnected
        return () => {
            if (socket) {
                socket.off("connect");
                socket.off("error");
                socket.off("user-disconnected");
                socket.off("user-connected");
                socket.off("chat-history");
                socket.off("new-direct-chat");

                socket.disconnect();
                console.log("Disconnected from socket server");
            }
        };
    }, []);

    return (
        <>
            <div className="flex h-full border-b-2">
                <div className="w-1/3">
                    <ChatList />
                </div>
                <div className="w-full">
                    <MessagesInbox />
                </div>
            </div>

            <MediaPicker />
            <DocumentPicker />
        </>
    );
}

export default Messages;
