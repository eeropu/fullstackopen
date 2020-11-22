/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, like, remove, loggedUsersBlog }) => {

    const [expanded, setExpanded] = useState(false)
    return (
        <div className='blog' style={{ padding: '3px', border: '1px solid black' }}>
            {blog.title} {blog.author}<button className='toggleButton' onClick={() => setExpanded(!expanded)}>{expanded ? 'hide' : 'view'}</button>
            <div style={{ display: expanded ? 'block' : 'none' }}>
                url: {blog.url}<br/>
                likes: {blog.likes} <button className='likeButton' onClick={() => like(blog)}>like</button><br/>
                added by: {blog.user ? blog.user.name : '' }<br/>
                {loggedUsersBlog ? <button className='removeButton' onClick={() => remove(blog)}>remove</button> : ''}
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    like: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired
}

export default Blog
