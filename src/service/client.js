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
const postAttachments = async (id, image) => {
  console.log("type", typeof image);
  const response = await axios.patch(
    `${BASE_URL}/tickets/add/${id}/attachments`,
    image,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
const updateTicketDetails = async (id, ticketDetails) => {
  console.log("body", ticketDetails);
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
  postAttachments,
  getAllClients,
};
