import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://cards-marketplace-api.onrender.com/',
});

export default instance;
