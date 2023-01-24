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
const postNewCategory = async (categoryDetails) => {
  const response = await axios.post(
    `${BASE_URL}/categories/add`,
    categoryDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
const updateCategory = async (id, categoryDetails) => {
  const response = await axios.patch(
    `${BASE_URL}/categories/${id}`,
    categoryDetails,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
const deleteCategory = async (id) => {
  const response = await axios.delete(`${BASE_URL}/categories/${id}`);
  return response.data;
};
export { getAllCategories, postNewCategory, deleteCategory, updateCategory };
