import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ErrorBoundary from "./utils/ErrorBoundary.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { AppContextProvider } from "./context/index.tsx";
import { NotificationContextProvider } from "./context/notification/index.tsx";
import { ModalContextProvider } from "./context/modal/index.tsx";

const persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <React.Suspense fallback={<div>Loading ...</div>}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AppContextProvider>
              <NotificationContextProvider>
                <ModalContextProvider>
                  <App />
                </ModalContextProvider>
              </NotificationContextProvider>
            </AppContextProvider>
          </PersistGate>
        </Provider>
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);
