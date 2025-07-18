import axios from 'axios';
import { BACKEND_URL } from '@/config/config';

const api = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,
});

export default api;
