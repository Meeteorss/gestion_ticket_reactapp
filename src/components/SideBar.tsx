import { Flex, Avatar, Divider, Button, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { FiLogOut } from "react-icons/fi";
import { IoIosContact, IoIosCalendar } from "react-icons/io";
import { MdLocationPin } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const ClientSideBar = () => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  return (
    <Flex
      // opacity={"15%"}
      // backgroundImage={
      //   "https://images.pexels.com/photos/4235535/pexels-photo-4235535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      // }
      // backgroundSize={"cover"}
      // backgroundPosition={"center"}
      bgColor={"#1a1b1c"}
      w={"300px"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Flex pt={6} flexDirection={"column"}>
        <Flex
          mx={"auto"}
          w={"85%"}
          gap={2}
          alignItems={"center"}
          flexDirection={"row"}
        >
          <Avatar bgColor={"black"} name={"Meeteorss"} />
          <Text color={"white"}>{auth.user}</Text>
        </Flex>
        <Divider my={7} />
        <Button
          justifyContent={"start"}
          mx={"auto"}
          w={"90%"}
          leftIcon={<Icon boxSize={"28px"} as={MdLocationPin} />}
          bgColor={"transparent"}
          color={"#fff"}
          my={2}
          fontWeight={"semibold"}
          textAlign={"center"}
          rounded={"lg"}
          _hover={{ cursor: "pointer", bgColor: "#1e2021" }}
          onClick={() => {
            navigate("tickets");
          }}
        >
          My Tickets
        </Button>

        <Button
          justifyContent={"start"}
          leftIcon={<Icon boxSize={"28px"} as={IoIosContact} />}
          mx={"auto"}
          w={"90%"}
          bgColor={"transparent"}
          color={"#fff"}
          my={2}
          fontWeight={"semibold"}
          textAlign={"center"}
          rounded={"lg"}
          _hover={{ cursor: "pointer", bgColor: "#1e2021" }}
          onClick={() => {
            navigate("new");
          }}
        >
          Create New Ticket
        </Button>
      </Flex>
      <Flex pb={6} color={"white"}>
        <Button
          justifyContent={"start"}
          leftIcon={<Icon boxSize={"28px"} as={FiLogOut} />}
          mx={"auto"}
          w={"90%"}
          bgColor={"transparent"}
          color={"#fff"}
          my={2}
          fontWeight={"semibold"}
          textAlign={"center"}
          rounded={"lg"}
          _hover={{ cursor: "pointer", bgColor: "#787c80" }}
        >
          Sign Off
        </Button>
      </Flex>
    </Flex>
  );
};

export const DevsSideBar = () => {
  const navigate = useNavigate();
  const { auth } = useAuthContext();
  return (
    <Flex
      // opacity={"15%"}
      // backgroundImage={
      //   "https://images.pexels.com/photos/4235535/pexels-photo-4235535.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      // }
      // backgroundSize={"cover"}
      // backgroundPosition={"center"}
      bgColor={"#1a1b1c"}
      w={"300px"}
      flexDirection={"column"}
      justifyContent={"space-between"}
    >
      <Flex pt={6} flexDirection={"column"}>
        <Flex
          mx={"auto"}
          w={"85%"}
          gap={2}
          alignItems={"center"}
          flexDirection={"row"}
        >
          <Avatar bgColor={"black"} name={"Meeteorss"} />
          <Text color={"white"}>{auth.user}</Text>
        </Flex>
        <Divider my={7} />
        <Button
          justifyContent={"start"}
          mx={"auto"}
          w={"90%"}
          leftIcon={<Icon boxSize={"28px"} as={MdLocationPin} />}
          bgColor={"transparent"}
          color={"#fff"}
          my={2}
          fontWeight={"semibold"}
          textAlign={"center"}
          rounded={"lg"}
          _hover={{ cursor: "pointer", bgColor: "#1e2021" }}
          onClick={() => {
            navigate("tickets");
          }}
        >
          My Tickets
        </Button>
      </Flex>
      <Flex pb={6} color={"white"}>
        <Button
          justifyContent={"start"}
          leftIcon={<Icon boxSize={"28px"} as={FiLogOut} />}
          mx={"auto"}
          w={"90%"}
          bgColor={"transparent"}
          color={"#fff"}
          my={2}
          fontWeight={"semibold"}
          textAlign={"center"}
          rounded={"lg"}
          _hover={{ cursor: "pointer", bgColor: "#787c80" }}
        >
          Sign Off
        </Button>
      </Flex>
    </Flex>
  );
};
