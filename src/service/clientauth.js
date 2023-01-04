import { BASE_URL } from "@/config";
import axios from "axios";

const clientLogin = async (credentials) => {
  console.log("Req", credentials);
  const response = await axios.post(`${BASE_URL}/client/login`, credentials, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  // console.log(response.data);
  return response.data;
};
export { clientLogin };
