/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { likeBlog, removeBlog, addComment } from '../redux/reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Form } from 'react-bootstrap'

const Blog = ({ blog }) => {

    const [ comment, setComment ] = useState('')

    const user = useSelector(state => state.user.loggedIn)

    const dispatch = useDispatch()

    if (!blog) {
        return 'loading'
    }

    const remove = () => {
        if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
            try {
                dispatch(removeBlog(blog.id, user.token))
            } catch (error) {
                console.log('something went wrong:', error)
            }
        }
    }

    const postComment = (e) => {
        e.preventDefault()
        dispatch(addComment(blog, comment))
        setComment('')
    }

    return (
        <div className='blog'>
            <h2>{blog.title}</h2>
            <p>url: <a href={blog.url}>{blog.url}</a></p>
            <p>likes: {blog.likes} <Button style={{marginLeft: '20px'}} className='likeButton' onClick={() => dispatch(likeBlog(blog))}>like</Button></p>
            <p>added by: {blog.user ? blog.user.name : '' }</p>
            {(blog.user?.username === user.username) ? <Button className='removeButton' onClick={() => remove(blog)}>remove</Button> : ''}
            <div style={{ marginTop: '20px' }}>
                <h4>Comments:</h4>
                <ul>
                    {blog.comments.map(comment => <li key={comment.id}>{comment.content}</li>)}
                </ul>
                <Form onSubmit={postComment}>
                    <Form.Group controlId="comment">
                        <Form.Control type="text" placeholder="Write new comment here..." value={comment} onChange={e => setComment(e.target.value)} />
                        <Form.Text className="text-muted">
                            Comment will be public to all users
                        </Form.Text>
                    </Form.Group>
                    <Button type='submit'>Send</Button>
                </Form>
            </div>
        </div>
    )
}

export default Blog
