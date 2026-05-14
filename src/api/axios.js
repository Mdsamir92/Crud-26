import axios from "axios";

const api = axios.create({
  baseURL: "https://632c652f5568d3cad884c4bc.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
