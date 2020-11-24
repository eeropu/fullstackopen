import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (title, author, url, token) => {
  return axios.post(baseUrl, { title, author, url }, { headers: { 'Authorization': `bearer ${token}` } }).then(response => response.data)
}

const like = (blog) => {
  return axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1, user: blog.user ? blog.user.id : undefined, comments: blog.comments.map(c => c.id) }).then(response => response.data)
}

const remove = (id, token) => {
  return axios.delete(`${baseUrl}/${id}`, { headers: { 'Authorization': `bearer ${token}` } }).then(response => response.data)
}

const comment = (id, content) => {
  return axios.post(`${baseUrl}/${id}/comment`, { content }).then(response => response.data)
}

export default { getAll, create, like, remove , comment}