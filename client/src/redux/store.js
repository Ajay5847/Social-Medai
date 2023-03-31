import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "./slices/appConfigSlice";
import postSliceReducer from "./slices/postSlice";
import feedSliceReducer from "./slices/FeedSlice";

export default configureStore({
    reducer: {
        appConfigReducer,
        postSliceReducer,
        feedSliceReducer
    }
})