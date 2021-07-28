import Axios from 'axios';

export const api = Axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 20000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});