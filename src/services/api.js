import axios from 'axios';

const api = axios.create({
    baseURL: 'http://54.146.159.85/',
    headers: {
        code: localStorage.getItem('code'),
    }
});

export default api;