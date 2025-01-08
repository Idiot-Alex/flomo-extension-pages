import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://flomo-extension.hotstrips.org',
  timeout: 3000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
  withCredentials: true,
})

instance.interceptors.request.use(config => {
  return config;
}, (error) => {
  console.log(error)
  return Promise.reject(error)
})

instance.interceptors.response.use(response => {
  return response.data
}, (error) => {
  console.log(error)
  alert(error.message)
  return Promise.reject(error)
})

export default instance