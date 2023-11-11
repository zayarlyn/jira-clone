import axios from 'axios'

const axiosDf = axios.create({
	baseURL: 'https://jira-clone.onrender.com/',
	// baseURL: 'http://localhost:5000/',
	withCredentials: true,
})

export default axiosDf
