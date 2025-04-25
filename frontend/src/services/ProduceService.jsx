import axios from "axios";

const BASE_URL = "http://localhost:3000/api/produce"; 

export const listProduce = async (data) => {
  return await axios.post(BASE_URL, data);
};

export const getProduceList = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getUserProduce = async (userId) => {
  const res = await axios.get(`${BASE_URL}/${userId}`);
  return res.data;
};
