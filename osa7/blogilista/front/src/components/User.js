import React from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

const User = ({ user }) => {

    if (!user) {
        return <Redirect to='/users' />
    }

    return (
        <div>
            <h2>{ user.name }</h2>
            <h4>Added blogs</h4>
            <ul>
                { user.blogs.map(blog => <Link key={blog.id} to={`/blogs/${blog.id}`} style={{display: 'block'}}>{ blog.title }</Link>) }
            </ul>
        </div>
    )
}

export default User