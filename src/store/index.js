"use client";

import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import checkoutReducer from "./slices/checkoutSlice";
import { addressApi } from "./services/addressApi";
import { orderApi } from "./services/orderApi";
import { commonApi } from "./services/commonApi";

// Create a noop storage for SSR
const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

// Use localStorage on client, noop on server
const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// Auth-specific persist config
const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["user", "isAuthenticated", "pendingEmail", "tempToken"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: cartReducer,
  checkout: checkoutReducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(addressApi.middleware, orderApi.middleware, commonApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  return store;
};
