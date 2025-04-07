import axios from "@/plugins/axios";

// login
export const signin = (data) => {
  return axios.post(`/api/login`, data);
};

// registrasi
export const signup = (data) => {
  return axios.post(`/api/signup`, data);
};

// get user

export const getUser = () => {
  return axios.get(`/api/auth/me`);
};
