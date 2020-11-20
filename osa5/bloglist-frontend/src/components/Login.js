import React, { useState } from 'react'
import loginService from './../services/login'

const Login = ({ setUser, showNotification }) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const login = async () => {
        try {
            const result = await loginService.login(username, password)
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(result))
            setUser(result)
            showNotification(`Login successful`, 'success')
        } catch (error) {
            showNotification(error.response.data.error, 'error')
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            Username: 
            <input type='text' id="loginUsername" value={username} onChange={e => {setUsername(e.target.value)}}/><br/>
            Password:
            <input type='password' id="loginPassword" value={password} onChange={e => {setPassword(e.target.value)}}/><br/>
            <button onClick={login}>login</button>
        </div>
    )
}

export default Login