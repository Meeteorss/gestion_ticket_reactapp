import React from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "./utils/axios";
import jwt_decode from "jwt-decode";
import { Button, LightMode } from "@chakra-ui/react";
import { Layout } from "./components/Layout";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
