import axios from "axios";

const useLogout = () => {
  const logout = async () => {
    const config = {
      method: "get",
      url: "http://localhost:8080/logout",
      withCredentials: true,
    };
    try {
      const response = await axios(config);

      if (response.status === 201) {
        return {
          loggedOut: true,
        };
      }
      return { loggedOut: false };
    } catch (e) {
      console.log("error logout hook: ", e);
      return {
        loggedOut: false,
      };
    }
  };
  return logout;
};

export default useLogout;
