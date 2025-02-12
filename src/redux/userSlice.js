import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Signin User
export const signinUser = createAsyncThunk(
    "user/signin",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/auth/signin", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signin failed"
            );
        }
    }
);

// Update User
export const updateUser = createAsyncThunk(
    "user/update",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.put("/api/user/update", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Update failed"
            );
        }
    }
);

// Delete User
export const deleteUser = createAsyncThunk(
    "user/delete",
    async (_, { rejectWithValue }) => {
        try {
            await axios.delete("/api/user/delete");
            return true;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Account deletion failed"
            );
        }
    }
);

// Sign Out User
export const signOutUser = createAsyncThunk(
    "user/signout",
    async (_, { rejectWithValue }) => {
        try {
            await axios.post("/api/auth/signout");
            return true;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signout failed"
            );
        }
    }
);

// User Slice
const userSlice = createSlice({
    name: "user",
    initialState: {
        currentUser: null,
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Signin
            .addCase(signinUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signinUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(signinUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.currentUser = null;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Sign Out
            .addCase(signOutUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.loading = false;
                state.currentUser = null;
            })
            .addCase(signOutUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default userSlice.reducer;
