import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true, // CRITICAL: Ensures connect.sid cookie is sent/received
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;