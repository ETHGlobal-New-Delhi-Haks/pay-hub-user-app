import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pay-hub-backend-4stuk.ondigitalocean.app/api/',
});

export const setAuthToken = (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
};
export default axiosInstance;
