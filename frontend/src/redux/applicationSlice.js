import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name: "application",
    initialState: {
        allAppliedJobs: [],
        applicants:null,
    },
    reducers: {
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        }
    }
});
export const { setAllAppliedJobs, setAllApplicants } = applicationSlice.actions;
export default applicationSlice.reducer;