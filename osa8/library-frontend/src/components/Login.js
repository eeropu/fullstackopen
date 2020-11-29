import React, { useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'

const LOG_IN = gql`
    mutation login($username: String!, $password: String!){
        login(
            username: $username,
            password: $password
        ){
            value
        }
    }
`

const Login = ({ setToken, setNotification}) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const [ login, result ] = useMutation(LOG_IN, {
        onError: error => {
            setNotification(error.graphQLErrors[0].message)
        }
    })

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('library-app-user-token', token)
        }
    }, [result.data, setToken])

    const submit = (e) => {
        e.preventDefault()
        login({ variables: { username, password }})
    }

    return (
        <form onSubmit={submit}>
            Username: <input type='text' value={username} onChange={e => setUsername(e.target.value)} /><br/>
            Password: <input type='password' value={password} onChange={e => setPassword(e.target.value)} />
            <button type='submit'>Submit</button>
        </form>
    )
}

export default Login