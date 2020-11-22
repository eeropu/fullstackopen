import axios from 'axios'
const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = () => {
    return axios.get(baseUrl).then(result => result.data)
}

const create = (anecdote) => {
    return axios.post(baseUrl, anecdote).then(result => result.data)
}

const update = (updated) => {
    return axios.put(`${baseUrl}/${updated.id}`, updated).then(result => result.data)
}

export default { getAll, create, update }