import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice";
import postSliceReducer from "./slices/postSlice";

export default configureStore({
    reducer: {
        appConfigReducer,
        postSliceReducer
    }
})