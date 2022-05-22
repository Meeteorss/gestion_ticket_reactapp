import axios from "axios";

const useRefresh = () => {
  const refresh = async () => {
    var config = {
      method: "get",
      url: "http://localhost:8080/auth/refresh",
      withCredentials: true,
    };
    try {
      const response = await axios(config);
      console.log("Refresh hook res: ", response);
      const access_token = response.data.access_token;
      if (
        response.data.error?.includes("Cannot read the array length because ")
      ) {
        return { error: "Refresh token doesn't exist" };
      }
      if (access_token) {
        return { access_token };
      } else {
        return { error: "ERROR refreshing token" };
      }
    } catch (e) {
      console.log("error: ", e);
      return { error: e.message };
    }
  };
  return refresh;
};

export default useRefresh;
