import axios from "axios";

let baseURL = "";
if (import.meta.env.PROD  === false) {
  baseURL = "http://localhost:2045";
} else {
  baseURL = "https://redex-be.congcucuatoi.com";
}
// const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";
const timeout = Number(import.meta.env.VITE_API_TIMEOUT || "5000");

const api = axios.create({
  baseURL,
  timeout,
  headers: { "Content-Type": "application/json" },
});

export default api;
