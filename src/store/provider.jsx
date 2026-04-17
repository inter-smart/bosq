"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { makeStore } from "./index";
import { persistStore } from "redux-persist";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function ReduxProvider({ children }) {
  const storeRef = useRef();
  const persistorRef = useRef();

  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <Provider store={storeRef.current}>
        <PersistGate loading={null} persistor={persistorRef.current}>
          {children}
        </PersistGate>
      </Provider>
    </GoogleOAuthProvider>
  );
}
