import axios from 'axios';

// ----------------------------------------------------------------------

const HOST_API = process.env.NEXT_PUBLIC_HOST_API;

const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Erro ao conectar com o servidor.')
);

export default axiosInstance;