import axios from 'axios';

const axiosDf = axios.create({ baseURL: 'http://localhost:5000/', withCredentials: true });

export default axiosDf;
