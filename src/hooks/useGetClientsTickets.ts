import { useEffect, useState } from "react";
import { useAuthContext } from "../context/AuthContext";

import useAxios from "./useAxios";

export const useGetClientsTickets = () => {
  const { auth, loading: loadingCtx } = useAuthContext();
  const [tickets, setTickets] = useState<any>();
  const [loading, setLoading] = useState(false);
  const axios = useAxios();
  const getTickets = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/client/tickets", {
        withCredentials: true,
      });
      setLoading(false);
      //   console.log("res ,", res);
      const { data } = res;

      const tickets = data;
      setTickets(tickets);
    } catch (err) {
      setLoading(false);
      console.log(err);
      return { tickets: [], error: err };
    }
  };

  useEffect(() => {
    setLoading(true);

    if (auth.user) {
      axios
        .get("/client/tickets/", {
          withCredentials: true,
        })
        .then((response) => {
          setLoading(false);
          const { data } = response;
          const tickets = data;

          setTickets(tickets);
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
      .get("/client/tickets", {
        withCredentials: true,
      })
      .then((response) => {
        setLoading(false);
        const { data } = response;
        const tickets = data;

        setTickets(tickets);
      })
      .catch((err) => {
        console.log("Error:");
        console.log(err);
        setLoading(false);
      });
  };

  return {
    getTickets,
    tickets,
    setTickets: setTickets,
    loading: loading,
    refetch: refetch,
  };
};
