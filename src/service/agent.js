import { BASE_URL } from "@/config";
import axios from "axios";

const getEmployeeAllTicktes = async (employeeId) => {
  console.log(employeeId);
  const response = await axios.get(`${BASE_URL}/employee/${employeeId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("after service");
  return response.data;
};
export { getEmployeeAllTicktes };