import React from "react";
import App from "./App.tsx";
import "./index.css";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: `${import.meta.env.VITE_AUTH0_AUDIENCE}`,
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>,
);
