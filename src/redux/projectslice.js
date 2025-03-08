import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllprojects = createAsyncThunk(
    "get/projects",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`/api/v1/project/projects`);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Data fetch failed "
            );
        }
    }
);

export const getParticularproject = createAsyncThunk(
    "particular/project",
    async (project_id, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                `/api/v1/project/projects/${project_id}`
            );
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data.message || "data fetched failed"
            );
        }
    }
);

const projectSlice = createSlice({
    name: "project",
    initialState: {
        isloading: false,
        isupdated: false,
        projects: null,
        particular: null,
    },

    reducers: {},

    extraReducers: (builder) => {
        builder.addCase(getAllprojects.pending, (state) => {
            state.isloading = true;
            state.error = null;
        });

        builder.addCase(getAllprojects.fulfilled, (state, action) => {
            state.isloading = false;
            state.projects = action?.payload;
        });

        builder.addCase(getAllprojects.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload;
        });

        builder.addCase(getParticularproject.pending, (state) => {
            state.isloading = true;
            state.error = null;
        });

        builder.addCase(getParticularproject.fulfilled, (state, action) => {
            state.isloading = false;
            state.particular = action?.payload;
        });

        builder.addCase(getParticularproject.rejected, (state, action) => {
            state.isloading = false;
            state.error = action.payload;
        });
    },
});

export default projectSlice.reducer;
