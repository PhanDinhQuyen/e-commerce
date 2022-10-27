import axios from "axios";

const httpRequest = axios.create({
  baseURL: process.env.REACT_APP_URL_SV,
  withCredentials: true,
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, data = {}) => {
  const response = await httpRequest.post(path, data);
  return response.data;
};

export const patch = async (path, data = {}, options = {}) => {
  const response = await httpRequest.patch(path, data, options);
  return response.data;
};

export default httpRequest;
