import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk(
    "chat/fetchUsers",
    async (_, { rejectWithValue, getState }) => {
        try {
            const response = await axios.get("/api/v1/message/all-employees", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Fetch users : ", response);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch users"
            );
        }
    }
);

export const fetchConversations = createAsyncThunk(
    "chat/fetchConversations",
    async (_, { rejectWithValue, getState }) => {
        try {
            const response = await axios.get("/api/v1/message/conversations", {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            return response.data.data.conversations;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch conversations"
            );
        }
    }
);

export const startConversation = createAsyncThunk(
    "chat/startConversation",
    async (formValues, { rejectWithValue, getState }) => {
        try {
            const response = await axios.post(
                "/api/v1/message/conversation-start",
                formValues,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return response.data.data.conversation;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to start conversation"
            );
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        conversations: [],
        users: [],
        currentConversation: null,
        error: null,
        isLoading: false,
    },
    reducers: {
        setCurrentConversation(state, action) {
            state.currentConversation = action.payload;
        },
        updateUserStatus(state, action) {
            state.conversations = state.conversations.map((conversation) => ({
                ...conversation,
                participants: conversation.participants.map((el) =>
                    el._id === action.payload.userId
                        ? { ...el, status: action.payload.status }
                        : el
                ),
            }));
        },
        replaceChatHistory(state, action) {
            state.conversations = state.conversations.map((conversation) =>
                conversation._id === action.payload.conversationId
                    ? { ...conversation, messages: action.payload.history }
                    : conversation
            );
        },
        addMessage(state, action) {
            state.conversations = state.conversations.map((conversation) =>
                conversation._id === action.payload.conversationId
                    ? {
                          ...conversation,
                          messages: [
                              ...conversation.messages,
                              action.payload.message,
                          ],
                      }
                    : conversation
            );
        },
    },
    extraReducers: (builder) => {
        builder

            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(fetchConversations.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchConversations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.conversations = action.payload;
            })
            .addCase(fetchConversations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(startConversation.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(startConversation.fulfilled, (state, action) => {
                state.isLoading = false;
                const prevConversation = state.conversations.find(
                    (el) => el._id === action.payload._id
                );
                if (prevConversation) {
                    state.conversations = state.conversations.map((el) =>
                        el._id === action.payload._id ? action.payload : el
                    );
                } else {
                    state.conversations.unshift(action.payload);
                }
            })
            .addCase(startConversation.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});

export default chatSlice.reducer;
export const {
    setCurrentConversation,
    updateUserStatus,
    replaceChatHistory,
    addMessage,
} = chatSlice.actions;
