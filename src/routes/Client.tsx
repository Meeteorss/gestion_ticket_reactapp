import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ClientSideBar } from "../components/SideBar";

import { useAuthContext } from "../context/AuthContext";

const Client = () => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  useEffect(() => {
    if (!auth.user || auth.role !== "CLIENT") {
      navigate("/");
    }
  }, [auth, navigate]);

  return (
    <Flex bgColor={"#2e2e2e"} justifyContent={"center"} alignItems={"center"}>
      <Flex flexDirection={"row"} bgColor={"black"} w={1400}>
        <ClientSideBar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

export default Client;
