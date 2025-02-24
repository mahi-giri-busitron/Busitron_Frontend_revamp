import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const signinUser = createAsyncThunk(
    "user/signin",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/v1/auth/login", userData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signin failed"
            );
        }
    }
);

export const otpVerify = createAsyncThunk(
    "user/Otp",
    async (otpData, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/v1/auth/otp", otpData);

            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Signin failed"
            );
        }
    }
);

export const resendOtp = createAsyncThunk(
    "user/resendOtp",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/v1/auth/re-sendOtp");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Resend OTP failed"
            );
        }
    }
);

export const updateUser = createAsyncThunk(
    "user/profileUpdate",
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                "/api/v1/auth/profileUpdate",
                userData.data,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "user profile updation failed"
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

            // Otp verification
            .addCase(otpVerify.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(otpVerify.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload;
            })
            .addCase(otpVerify.rejected, (state, action) => {
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
