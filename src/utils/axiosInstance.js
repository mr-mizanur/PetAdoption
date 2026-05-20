import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pet-adoption-surver.vercel.app', 
  withCredentials: true, 
});

export default axiosInstance;