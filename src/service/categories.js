import { BASE_URL } from "@/config";
import axios from "axios";

const getAllCategories = async () => {
  const response = await axios.get(`${BASE_URL}/categories`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export { getAllCategories };
