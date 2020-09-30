import axios from 'axios'
const api = axios.create({
  // baseURL: 'https://localhost:3333/'
  baseURL: 'https://server-vision.herokuapp.com/'
})

export default api
