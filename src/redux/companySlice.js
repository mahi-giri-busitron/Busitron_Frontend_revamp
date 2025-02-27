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
        console.log("update req :", companyID, id, editAddress);
        try {
            const response = await axios.put(
                `/api/v1/setting/update_business_address/${companyID}/${id}`,
                { editAddress }
            );
            console.log("edit response :", response);
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
        console.log("before delete :", companyID, id);
        try {
            const response = await axios.delete(
                `/api/v1/setting/delete_business_address/${companyID}/${id}`
            );
            console.log("delete response :", response);
            return { locationId, data: response.data };
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
        isRequestFulfilled: false,
        isDeleted: false,
    },
    reducers: {
        isRequestFulfilledToPrevState: (state) => {
            state.isRequestFulfilled = false;
        },
        isDeletedToPrevState: (state) => {
            state.isDeleted = false;
        },
    },
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
                state.isRequestFulfilled = true;
            })
            .addCase(getCompanySetting.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isRequestFulfilled = false;
            })

            // Create company location
            .addCase(createCompanyLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createCompanyLocation.fulfilled, (state, action) => {
                state.loading = false;
                state.company = action.payload;
                state.isRequestFulfilled = true;
            })
            .addCase(createCompanyLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isRequestFulfilled = false;
            })

            // Edit company location
            .addCase(editCompanyLocation.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(editCompanyLocation.fulfilled, (state, action) => {
                state.loading = false;
                if (state.company && state.company.location) {
                    const updatedLocation = action.payload.location;
                    state.company.location = updatedLocation;
                }
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
                state.isRequestFulfilled = true;
                if (state.company?.location) {
                    state.company.location = state.company.location.filter(
                        (location) =>
                            location.id !== Number(action.payload.locationId)
                    );
                }
            })
            .addCase(deleteCompanyLocation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.isRequestFulfilled = false;
            });
    },
});

export const { isRequestFulfilledToPrevState } = companySlice.actions;

export default companySlice.reducer;
