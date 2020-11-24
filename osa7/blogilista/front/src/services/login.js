import axios from 'axios'
const baseUrl = '/api/login'

const login = (username, password) => {
    return axios.post(baseUrl, { username, password }).then(response => response.data)
}

export default { login }