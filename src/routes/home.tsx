import { Flex } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import { useAuthContext } from "../context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  useEffect(() => {
    console.log("auth: ", auth);
    if (auth?.role) {
      navigate(auth.role.toLowerCase());
    }
  }, [auth, navigate]);

  return (
    <Flex bgColor={"white"} flex={1} flexDirection={"column"} color={"black"}>
      <Hero />
    </Flex>
  );
};

export default Home;
