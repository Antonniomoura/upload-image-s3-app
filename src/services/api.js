import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/'
        : process.env.URL_PROD,
    headers: {
        code: localStorage.getItem('code'),
    }
});

export default api;