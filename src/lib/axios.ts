import axios from 'axios'

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://flomo-extension.hotstrips.org'

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  }
})

instance.interceptors.request.use(config => {
  return config
}, (error) => {
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  return response.data
}, (error) => {
  return Promise.reject(error)
})

export default instance
