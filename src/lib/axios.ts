import axios from 'axios';

// ----------------------------------------------------------------------

const HOST_API_KEY = process.env.HOST_API_KEY || 'http://localhost:8080/api/v1';

const axiosInstance = axios.create({ baseURL: HOST_API_KEY });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Algo correu mal')
);

export default axiosInstance;
