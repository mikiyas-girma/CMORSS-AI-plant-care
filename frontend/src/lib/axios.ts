import axios from 'axios';
import { ServerURL } from './SERVERURL';

const axiosForApiCall = axios.create({
  baseURL: `${ServerURL}/api`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000,
});

axiosForApiCall.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(
      (error.response && error.response.data) || 'Something went wrong'
    )
);

export { axiosForApiCall };
