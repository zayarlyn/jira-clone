import axios from 'axios';

const axiosDf = axios.create({
  baseURL: 'https://jira-clone.onrender.com/',
  withCredentials: true,
});

export default axiosDf;
