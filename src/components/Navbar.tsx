import { Button, Flex, Link as ChakraLink } from "@chakra-ui/react";

import { AuthPopup } from "./AuthPopup";
import { useAuthContext } from "../context/AuthContext";
import { FiLogOut } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export const Navbar = () => {
  const { isAuth, auth, loading, logoutF } = useAuthContext();
  // useEffect(() => {
  //   console.log("NAVBAR : ", !isAuth);
  // }, [isAuth]);

  return (
    <Flex
      zIndex={20}
      boxShadow="dark-lg"
      position={"sticky"}
      top={0}
      bgColor={"black"}
    >
      <Flex
        as={"header"}
        justifyContent={"space-between"}
        w={"100%"}
        mx={"auto"}
        color={"white"}
        padding={"6"}
        flexDirection={"row"}
      >
        <Link to={"/"}>
          <Flex
            fontFamily={"cursive"}
            fontWeight={"bold"}
            fontSize={"2xl"}
            color={"green.400"}
            textShadow="2px 2px 2px #000000"
            _hover={{ cursor: "pointer" }}
          >
            EZ_DEV
          </Flex>
        </Link>

        <Flex alignItems={"center"} flexDirection={"row"}>
          {!isAuth ? (
            <>
              <AuthPopup text={"Login"} loggedIn={isAuth} />
              <Link to={"/register"}>
                <ChakraLink
                  rounded={"md"}
                  p={2}
                  fontWeight={"semibold"}
                  mx={"10px"}
                  _hover={{
                    textDecoration: "none",
                    backgroundColor: "#404040",
                  }}
                >
                  Register
                </ChakraLink>
              </Link>
            </>
          ) : (
            <>
              <Link to={"/dashboard"}>
                <ChakraLink
                  rounded={"md"}
                  p={2}
                  fontWeight={"semibold"}
                  mx={"10px"}
                  _hover={{
                    textDecoration: "none",
                    backgroundColor: "#404040",
                  }}
                >
                  Dashboard
                </ChakraLink>
              </Link>
              <Link to={"/settings"}>
                <ChakraLink
                  rounded={"md"}
                  p={2}
                  fontWeight={"semibold"}
                  mx={"10px"}
                  _hover={{
                    textDecoration: "none",
                    backgroundColor: "#404040",
                  }}
                >
                  Settings
                </ChakraLink>
              </Link>
              <Button
                bgColor={"#292929"}
                _hover={{ backgroundColor: "#404040" }}
                mx={"10px"}
                rightIcon={<FiLogOut />}
                onClick={async () => {
                  // const res = await logout({
                  //   refetchQueries: ["Me"],
                  // });
                  // if (res.data.logout) {
                  //   setUserState({ user: null, loading: false });
                  // } else {
                  //   console.log("Couldnt logout this user");
                  // }
                  await logoutF();
                }}
              >
                {" "}
                Se déconnecter
              </Button>
            </>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
