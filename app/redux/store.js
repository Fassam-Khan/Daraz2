import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";


export const makeStore = () => {
    return configureStore({
      reducer: {
        auth: userReducer,
      },
    });
  };

