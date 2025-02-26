import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getCompanySetting = createAsyncThunk(
    "company/setting",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/v1/setting/company_setting");
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message ||
                    "Failed to fetch company address"
            );
        }
    }
);

export const createCompanyLocation = createAsyncThunk(
    "company/location",
    async ({ companyID, newAddr }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/v1/setting/create_business_address/${companyID}`,
                { newAddr }
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

export const editCompanyLocation = createAsyncThunk(
    "company/edit_location",
    async ({ companyID, id, editAddress }, { rejectWithValue }) => {
        try {
            const response = await axios.put(
                `/api/v1/setting/update_business_address/${companyID}/${id}`,
                { editAddress }
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

export const deleteCompanyLocation = createAsyncThunk(
    "company/deleteLocation",
    async ({ companyID, id }, { rejectWithValue }) => {
        try {
            const response = await axios.delete(
                `/api/v1/setting/delete_business_address/${companyID}/${id}`
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

const companySlice = createSlice({
    name: "company",
    initialState: {
        company: [],
        error: null,
        loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Get company setting
            .addCase(getCompanySetting.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCompanySetting.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
            })
            .addCase(getCompanySetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Create company location
            .addCase(createCompanyLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompanyLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
            })
            .addCase(createCompanyLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Edit company location
            .addCase(editCompanyLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCompanyLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
            })
            .addCase(editCompanyLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Delete company location
            .addCase(deleteCompanyLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteCompanyLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload
            })
            .addCase(deleteCompanyLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default companySlice.reducer;
