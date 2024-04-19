import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { Provider } from "react-redux";
import { App } from "./App.tsx";
import "./css/index.css";
import store from "./store/store.tsx";

const authStore = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: false, //window.location.protocol === 'https:'
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={authStore}>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
