import { BASE_URL } from "@/config";
import axios from "axios";

const getTicketsList = async (clientId) => {
  const response = await axios.get(`${BASE_URL}/client/${clientId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export { getTicketsList };
