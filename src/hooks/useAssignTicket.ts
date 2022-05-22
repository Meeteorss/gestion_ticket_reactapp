import useAxios from "./useAxios";

export type AssignInput = {
  ticketId: number;
  devId: number;
};

const useAssignTicket = () => {
  const axios = useAxios();
  const assignTicket = async (input: AssignInput) => {
    const data = JSON.stringify({
      ticketId: input.ticketId,
      devId: input.devId,
    });

    try {
      const config = {
        method: "post",
        url: "/admin/tickets/",
        withCredentials: true,
        data: data,
      };
      const response = await axios(config);
      console.log("Response assign: ", response);

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
  return assignTicket;
};

export default useAssignTicket;
