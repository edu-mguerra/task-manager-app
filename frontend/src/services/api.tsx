import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3000', // Troque pela sua URL da API
  headers: {
    'Content-Type': 'application/json',
  },
});
