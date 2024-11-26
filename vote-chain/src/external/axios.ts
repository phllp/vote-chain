import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001", // Substitua pela URL da sua API
  timeout: 5000, // Tempo máximo de espera (em milissegundos)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
