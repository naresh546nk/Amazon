import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { StoreProvider } from "./Store";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "react-redux";
import ReduxStore from "./ReduxStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StoreProvider>
      <HelmetProvider>
        <Provider store={ReduxStore}>
          <App />
        </Provider>
      </HelmetProvider>
    </StoreProvider>
  </React.StrictMode>
);

reportWebVitals();
