import { BASE_URL } from "@/config";
import axios from "axios";

const getAllTickets = async () => {
  const response = await axios.get(`${BASE_URL}/tickets`);
  return response.data;
};
const getAdminTicketsCount = async () => {
  const response = await axios.get(`${BASE_URL}/tickets/count`);
  return response.data;
};
export { getAllTickets, getAdminTicketsCount };
