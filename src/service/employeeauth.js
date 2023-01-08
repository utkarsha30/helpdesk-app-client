import { BASE_URL } from "@/config";
import axios from "axios";

const employeeLogin = async (credentials) => {
  const response = await axios.post(`${BASE_URL}/employee/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export { employeeLogin };
