import axios from 'axios';
// config
import { HOST_API } from '../config';

// ----------------------------------------------------------------------

export const basePath = "https://www.staging.api.careplace.pt/api/v1"

const axiosInstance = axios.create({
  baseURL: basePath,
});

export default axiosInstance;
