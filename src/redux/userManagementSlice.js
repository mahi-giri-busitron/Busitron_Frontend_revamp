import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllUser = createAsyncThunk(
    "userManagement/allUsers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/v1/users/all-users");
            return response?.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signin failed"
            );
        }
    }
);

export const deactivateUser = createAsyncThunk(
    "userManagement/deactivateUser",
    async ({ id, isActiveUser, role, designation }, { rejectWithValue }) => {
        try {
            const response = await axios.put("/api/v1/users/inactive", {
                id,
                isActiveUser,
                role,
                designation,
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signin failed"
            );
        }
    }
);
export const fetchSpecificUser = createAsyncThunk(
    "userManagement/specificUser",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/users/select-user/${id}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signin failed"
            );
        }
    }
);

const userManagementSlice = createSlice({
    name: "userManagement",
    initialState: {
        isLoading: false,
        isRequestApproved: false,
        isRequestRejected: false,
        users: null,
        userInfo: null,
        isUpdated: false,
    },
    reducers: {
        changeToPrevIsRequestApproved: (state) => {
            state.isRequestApproved = false;
        },
        changeToPrevIsDeleted: (state) => {
            state.isUpdated = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllUser.fulfilled, (state, action) => {
            state.isRequestApproved = true;
            state.isLoading = false;
            state.users = action?.payload?.data;
        });

        builder.addCase(fetchAllUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isRequestRejected = true;
        });

        //delete users
        builder.addCase(deactivateUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(deactivateUser.fulfilled, (state, action) => {
            (state.isRequestApproved = true), (state.isLoading = false);
            state.isUpdated = true;
            state.users = state.users.map((user) =>
                user._id === action.payload._id
                    ? { ...user, isActive: "inActive" }
                    : user
            );
        });
        builder.addCase(deactivateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isRequestRejected = true;
        });

        builder.addCase(fetchSpecificUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchSpecificUser.fulfilled, (state, action) => {
            (state.isRequestApproved = true), (state.isLoading = false);
            state.userInfo = action?.payload?.data;
        });
        builder.addCase(fetchSpecificUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isRequestRejected = true;
        });
    },
});

export const { changeToPrevIsRequestApproved, changeToPrevIsDeleted } =
    userManagementSlice.actions;
export default userManagementSlice.reducer;
