import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import accountSlice from "./slices/accountSlice";

const reducers = combineReducers({
  account: accountSlice
});

const persistConfig = {
  key: "root",
  storage:  storage,
  whitelist: ["account"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default configureStore({
  reducer: persistedReducer,
});
