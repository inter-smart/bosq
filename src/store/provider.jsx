"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./index";
import { persistStore } from "redux-persist";
import { setPersistor } from "./persistorInstance";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ReduxProvider({ children }) {
  const storeRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    // persistStore must still be called to activate redux-persist rehydration,
    // but we no longer gate rendering behind PersistGate since isAuthenticated
    // is not persisted — auth state is always resolved server-side on mount.
    setPersistor(persistStore(storeRef.current));
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <Provider store={storeRef.current}>
        {children}
      </Provider>
    </GoogleOAuthProvider>
  );
}
