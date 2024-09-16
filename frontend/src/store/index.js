import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/UserSlice.jsx";
import viewSlice from "./slices/ViewSlice.jsx";
import requestSlice from "./slices/RequestSlice.jsx";
import CompanySlice from "./slices/CompanySlice.jsx";

const store = configureStore({
    reducer: {
        user: userReducer,
        view: viewSlice,
        company: CompanySlice,
        request: requestSlice,
  },
});

export default store;
