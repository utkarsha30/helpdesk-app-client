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
const updateFaq = async (id, faqDetails) => {
  const response = await axios.patch(`${BASE_URL}/FAQ/${id}`, faqDetails, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
const deleteFaq = async (id) => {
  const response = await axios.delete(`${BASE_URL}/FAQ/${id}`);
  return response.data;
};
export { getAllFaqs, postNewFaq, deleteFaq, updateFaq };
