import axios from 'axios'
const api = axios.create({
  // baseURL: 'https://localhost:3333/'
  baseURL: 'https://vision-b.herokuapp.com/'
})

export default api
