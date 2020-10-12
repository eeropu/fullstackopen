import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => axios.get(baseURL)
const create = (newObject) => axios.post(baseURL, newObject)
const remove = (id) => axios.delete(`${baseURL}/${id}`)
const update = (id, updatedObject) => axios.put(`${baseURL}/${id}`, updatedObject)

export default {
    getAll,
    create,
    remove,
    update
}