import axios from "axios";
const BASE_URL = 'http://localhost:9001';

export const getAllProducts = () => {
    return axios.get(`${BASE_URL}/products`);
  }