import { BASE_URL } from "@/config";
import axios from "axios";

const getAllFaqs = async () => {
  const response = await axios.get(`${BASE_URL}/FAQ`);

  return response.data;
};
const postNewFaq = async (faqDetails) => {
  const response = await axios.post(`${BASE_URL}/FAQ/add`, faqDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
export { getAllFaqs, postNewFaq };
