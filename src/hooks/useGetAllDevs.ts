import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import useAxios from "./useAxios";

export const useGetAllDevs = () => {
  const { auth, loading: loadingCtx } = useAuthContext();
  const [devs, setDevs] = useState<any>();
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const getDevs = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/admin/devs", {
        withCredentials: true,
      });
      setLoading(false);
      //   console.log("res ,", res);
      const { data } = res;

      const devs = data;
      setDevs(devs);
    } catch (err) {
      setLoading(false);
      console.log(err);
      return { devs: [], error: err };
    }
  };

  useEffect(() => {
    setLoading(true);

    if (auth.user) {
      axios
        .get("/admin/devs", {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          const { data } = response;
          const devs = data;
          setDevs(devs);
        })
        .catch((err) => {
          console.log("Error:");
          console.log(err);
          setLoading(false);
        });
    }
  }, [loadingCtx, auth.user]);

  const refetch = () => {
    console.log("refetch called");

    axios
      .get("/admin/devs", {
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        const { data } = response;
        const devs = data;
        setDevs(devs);
      })
      .catch((err) => {
        console.log("Error:");
        console.log(err);
        setLoading(false);
      });
  };

  return {
    getDevs,
    devs,
    setDevs: setDevs,
    loading: loading,
    refetch: refetch,
  };
};
