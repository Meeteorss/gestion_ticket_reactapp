import { useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import axios from "../utils/axios";
import useRefresh from "./useRefresh";

const useAxios = () => {
  const refresh = useRefresh();
  const { auth, loading } = useAuthContext();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const { access_token: new_access_token } = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${new_access_token}`;
          return axios(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axios;
};

export default useAxios;
