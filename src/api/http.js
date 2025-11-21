import axios from 'axios'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_BASE || 'http://localhost:3000/api',
  timeout: 10000
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

http.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error.response?.data || error)
)

export default http
