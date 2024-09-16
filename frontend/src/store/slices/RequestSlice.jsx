import {createSlice} from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name: "request",
    initialState: {
        requestList: [],
        trainingList: [],
    },
    reducers: {
        logRequestInfo: (state, action) => {
            const passedRequest = action.payload;
            console.log(passedRequest);
        },
        loadRequests: (state, action) => {
            state.requestList = action.payload;
            // console.log("Requests added to store: ", action.payload)
        },
        loadTrainings: (state, action) => {
            state.trainingList = action.payload;
        },
        deleteRequest: (state, action) => {
            console.log("will delete request");
        },
        updateRequest: (state, action) => {
            console.log("will update request");
        },
    },
});

export const {logRequestInfo, loadRequests, loadTrainings} =
    requestSlice.actions;
export default requestSlice.reducer;
