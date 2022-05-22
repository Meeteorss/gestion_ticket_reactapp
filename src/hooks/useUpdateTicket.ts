import useAxios from "./useAxios";

export type UpdateInput = {
  ticketId: string;
  status: string;
};

const useUpdateTicket = () => {
  const axios = useAxios();
  const updateTicket = async (input: UpdateInput) => {
    const data = JSON.stringify({
      ticketId: input.ticketId,
      status: input.status,
    });

    try {
      const config = {
        method: "post",
        url: "/dev/tickets/",
        withCredentials: true,
        data: data,
      };
      const response = await axios(config);
      console.log("Response update: ", response);

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
  return updateTicket;
};

export default useUpdateTicket;
