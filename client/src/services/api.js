import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:3001/api/transaction`,
});

console.log(process.env.REACT_APP_BASE_URL);

export default api;
