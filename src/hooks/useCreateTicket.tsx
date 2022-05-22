import useAxios from "./useAxios";

export type CreateInput = {
  software: string;
  environment: string;
  description: string;
  urgency: string;
};

const useCreateTicket = () => {
  const axios = useAxios();
  const createTicket = async (input: CreateInput) => {
    const data = JSON.stringify({
      software: input.software,
      environment: input.environment,
      description: input.description,
      urgency: input.urgency,
    });

    try {
      const config = {
        method: "post",
        url: "/client/tickets/",
        withCredentials: true,
        data: data,
      };
      const response = await axios(config);
      console.log("Response create: ", response);

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
  return createTicket;
};

export default useCreateTicket;
