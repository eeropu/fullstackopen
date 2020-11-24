import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from './../redux/reducers/notificationReducer'
import { logIn } from './../redux/reducers/userReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const login = async e => {
        e.preventDefault()
        try {
            dispatch(logIn(username, password))
            dispatch(setNotification(`Login successful`, 'success', 5))
        } catch (error) {
            dispatch(setNotification(error.response.data.error, 'error', 5))
        }
    }

    return (
        <>
            <h2>Log in</h2>
            <Form onSubmit={login}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)}/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export default Login