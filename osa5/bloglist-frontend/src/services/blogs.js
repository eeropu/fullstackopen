import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (title, author, url, token) => {
  return axios.post(baseUrl, {title, author, url}, { headers: {'Authorization': `bearer ${token}`}}).then(response => response.data)
}

export default { getAll, create }