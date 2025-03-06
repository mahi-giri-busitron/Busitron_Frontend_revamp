
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getALlEstimates = createAsyncThunk(
    "estimates/get",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get("/api/v1/estimates/getAll");
            // console.log("res", res.data.data);
            return res?.data?.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Get Estimate Data failed"
            );
        }
    }
);


let estimateSlice = createSlice({
    name : "estimate",
    initialState : {
        isLoading: false,
        allEstimateData: null,
    },
    reducers : {},
    extraReducers : (builder) =>{
        builder.addCase(getALlEstimates.pending, (state, action) => {
            state.isLoading = true;
        });

        builder.addCase(getALlEstimates.fulfilled, (state, action)=>{
            state.allEstimateData = action.payload;
            state.isLoading = false;
        })
    }
});

// export const {} = estimateSlice.actions;

export default estimateSlice.reducer;