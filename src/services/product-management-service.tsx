import axios from "axios";
import { Product } from "../components/interfaces";
const baseUrl = "https://localhost:5001/api/Product";

// getting all the products from the API
const getAllProducts = () => {
  const request = axios.get(baseUrl);
  return request.then((response: { data: Product[] }) => response.data);
};

// get specific Product
const getProduct = (id: string) => {
  const request = axios.get(`${baseUrl}/${id}`);
  return request.then((response: { data: Product }) => response.data);
};

// deleting a Product
const removeProduct = (id: string) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request;
};

// creating a new Product
const createProduct = (newObject: Product) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response: { data: Product }) => response.data);
};

// updating a Product
const updateProduct = (id: string, newObject: Product) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response: { data: Product }) => response.data);
};

const productManagementService = {
  getAllProducts,
  getProduct,
  removeProduct,
  createProduct,
  updateProduct,
};

export default productManagementService;
