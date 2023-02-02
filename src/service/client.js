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
const postNewClient = async (clientDetails) => {
  const response = await axios.post(
    `${BASE_URL}/client/register`,
    clientDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
const postNewTicket = async (ticketDetails) => {
  const response = await axios.post(`${BASE_URL}/tickets/add`, ticketDetails, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const updateTicketDetails = async (id, ticketDetails) => {
  const response = await axios.patch(
    `${BASE_URL}/tickets/${id}`,
    ticketDetails,
    {
      headers: {
        "Content-Type": "multipart/form-data",
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
const getTicketsCount = async (clientId) => {
  const response = await axios.get(`${BASE_URL}/tickets/${clientId}/summary`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const getAllClients = async () => {
  const response = await axios.get(`${BASE_URL}/client/allclients`);
  return response.data;
};
export {
  getTicketsList,
  postNewTicket,
  updateTicketDetails,
  addComment,
  getTicketsCount,
  getAllClients,
  postNewClient,
};
