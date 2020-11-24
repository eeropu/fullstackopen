import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUsers } from '../redux/reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {
    const users = useSelector(state => state.user.all)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initUsers())
    }, [dispatch])

    return (


        <div>
            <h2>Users</h2>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of blogs</th>
                    </tr>
                </thead>
                <tbody>
                    { users.map(user => <tr key={user.id}><td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td></tr>) }
                </tbody>
            </Table>
        </div>
    )
}

export default UserList