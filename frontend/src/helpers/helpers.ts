import axios from "axios";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

/* Backend API calls */
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

/* Rating styling */
export const getRatingStyles = (rating: string) => {
  switch (rating) {
    case "Critical Risk":
      return "border-red-600 bg-red-900/40 text-red-600";
    case "High Risk":
      return "border-orange-500 bg-orange-900/40 text-orange-500";
    case "Medium Risk":
      return "border-yellow-500 bg-yellow-900/40 text-yellow-500";
    case "Low Risk":
      return "border-blue-500 bg-blue-900/40 text-blue-500";
    case "Safe":
      return "border-green-600 bg-green-900/40 text-green-600";
    default:
      return "border-border bg-muted text-foreground";
  }
};
