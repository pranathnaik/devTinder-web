import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; // Adjust the import path as necessary
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"; // Adjust the import path as necessary
import requestReducer from "./requestSlice"; // Adjust the import path as necessary

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionReducer,
    requests: requestReducer,
  },
});

export default appStore;
