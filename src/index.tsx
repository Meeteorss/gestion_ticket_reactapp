import * as React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthWrapper } from "./context/AuthContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Client from "./routes/Client";
import Tickets from "./routes/client/Tickets";
import NewTicket from "./routes/client/NewTicket";
import Dev from "./routes/Dev";
import Admin from "./routes/Admin";

ReactDOM.render(
  <AuthWrapper>
    <React.StrictMode>
      <ChakraProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />}>
              <Route index element={<Home />} />
              <Route path="client" element={<Client />}>
                <Route index element={<div> index client </div>} />
                <Route path="tickets" element={<Tickets />} />
                <Route path="new" element={<NewTicket />} />
              </Route>
              <Route path="admin" element={<Admin />} />
              <Route path="dev" element={<Dev />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>{" "}
  </AuthWrapper>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
