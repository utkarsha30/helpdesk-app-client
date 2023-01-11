import { BASE_URL } from "@/config";
import axios from "axios";

const getAllTickets = async () => {
  const response = await axios.get(`${BASE_URL}/tickets`);
  return response.data;
};
export { getAllTickets };
