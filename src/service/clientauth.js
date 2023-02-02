import { BASE_URL } from "@/config";
import axios from "axios";

const clientLogin = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/client/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export { clientLogin };
