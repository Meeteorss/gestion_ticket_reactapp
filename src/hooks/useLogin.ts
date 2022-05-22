import axios from "axios";
export type LoginCreds = {
  login: string;
  password: string;
};

const useLogin = () => {
  const login = async (creds: LoginCreds) => {
    const data = JSON.stringify({
      username: creds.login,
      password: creds.password,
    });

    const config = {
      method: "post",
      url: "http://localhost:8080/login",
      withCredentials: true,
      data: data,
    };
    try {
      const response = await axios(config);

      if (response.status === 403) {
        return {
          error: "Invalid credentials.",
        };
      }
      return { data: response.data };
    } catch (e) {
      return {
        error: "An error has occured: " + e.message,
      };
    }
  };
  return login;
};

export default useLogin;
