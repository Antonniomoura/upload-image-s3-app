import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NODE_ENV === 'development'
        ? 'http://localhost:3001/'
        : 'http://localhost:3001/'
});

export default api;