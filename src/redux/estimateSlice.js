
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getALlEstimates = createAsyncThunk(
    "estimates/get",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/api/v1/estimates/getAll");
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Get Estimate Data failed"
            );
        }
    }
);

export const getSingleEstimate = createAsyncThunk("singleEstimate/get", async(id,{rejectWithValue})=>{
    try {
        const res = await axios.get(`/api/v1/estimates/get/${id}`);
        return res?.data?.data;
    } catch (error) {
        return rejectWithValue(
            error.response?.data?.message || "Get Estimate Data failed"
        );
    }
})


let estimateSlice = createSlice({
    name : "estimate",
    initialState : {
        isLoading: false,
        allEstimateData: null,
        singleEstimateData : null,
        isSingleLoading : false,
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(getALlEstimates.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(getALlEstimates.fulfilled, (state, action)=>{
            state.allEstimateData = action.payload;
            state.isLoading = false;
        });

        builder.addCase(getSingleEstimate.pending, (state, action) => {
            state.isSingleLoading = true;
        });

        builder.addCase(getSingleEstimate.fulfilled, (state, action)=>{
            state.singleEstimateData = action.payload;
            state.isSingleLoading = false;
        })
    }
});

export default estimateSlice.reducer;