import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { CookiesProvider } from "react-cookie";
require("dotenv").config();
ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <CookiesProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </CookiesProvider>
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
