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
const postNewTicket = async (ticketDetails) => {
  const response = await axios.post(`${BASE_URL}/tickets/add`, ticketDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const updateTicketDetails = async (id, ticketDetails) => {
  console.log("body", ticketDetails);
  const response = await axios.patch(
    `${BASE_URL}/tickets/${id}`,
    ticketDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
const addComment = async (id, ticketDetails) => {
  const response = await axios.patch(
    `${BASE_URL}/tickets/${id}/addcomment`,
    ticketDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
export { getTicketsList, postNewTicket, updateTicketDetails, addComment };
