import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import domainReducer from "../features/domain/domainSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    domain: domainReducer,
  },
});
