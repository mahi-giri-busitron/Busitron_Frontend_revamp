import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getAppSetting = createAsyncThunk(

    "appSetting/get",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "/api/v1/appSetting/getAppSetting"
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch company address"
                    
            );
        }
    }
);

export const updateAppSetting = createAsyncThunk(
    "company/edit_location",
    async ({ appSettingId, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/v1/appSetting/updateAppSetting/${appSettingId}`,
                data
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch company address"
            );
        }
    }
);

const appSettingSlice = createSlice({
    name: "AppSetting",
    initialState: {
        AppSettings: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get App setting
            .addCase(getAppSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAppSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.AppSettings = action.payload;
            })
            .addCase(getAppSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Update company location
            .addCase(updateAppSetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateAppSetting.fulfilled, (state, action) => {
                state.loading = false;
                state.AppSettings = action.payload;
            })
            .addCase(updateAppSetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default appSettingSlice.reducer;
