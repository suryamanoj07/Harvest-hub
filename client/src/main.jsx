import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { persistor, store } from "./pages/redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import StoreContextProvider from "./pages/redux/context/storeContext.jsx";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <StoreContextProvider>
        <App />
      </StoreContextProvider>
    </PersistGate>
  </Provider>
);
