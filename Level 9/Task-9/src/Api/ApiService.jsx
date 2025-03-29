import axios from "axios";

export const fetchData = async (endpoint) => {
  const { data } = await axios.get(endpoint);
  return data;
};
