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
import { wishlistApi } from "./services/wishListApi";
import { searchApi } from "./services/searchApi";
import { productEnquiryApi } from "./services/productEnquiryApi";

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
  whitelist: ["user", "isAuthenticated", "pendingEmail", "tempToken", "isGoogleUser"],
};

const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  cart: cartReducer,
  checkout: checkoutReducer,
  [searchApi.reducerPath]: searchApi.reducer,
  [wishlistApi.reducerPath]: wishlistApi.reducer,
  [addressApi.reducerPath]: addressApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
  [commonApi.reducerPath]: commonApi.reducer,
  [productEnquiryApi.reducerPath]: productEnquiryApi.reducer,
});

export const makeStore = () => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(addressApi.middleware, orderApi.middleware, commonApi.middleware, wishlistApi.middleware, searchApi.middleware, productEnquiryApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

  return store;
};
