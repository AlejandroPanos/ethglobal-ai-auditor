import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const generateAudit = async (code: string) => {
  const response = await axios.post("/api/audit", { code });
  return response.data;
};

export const retrieveAudit = async (rootHash: string) => {
  const response = await axios.get(`/api/audit/${rootHash}`, {
    responseType: "blob",
  });
  return response.data;
};
