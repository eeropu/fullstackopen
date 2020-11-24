import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './../redux/reducers/notificationReducer'
import { createBlog } from './../redux/reducers/blogReducer'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const CreateBlog = ({ toggleVisibility, testFunction }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const dispatch = useDispatch()

    const token = useSelector(state => state.user.loggedIn.token)

    const create = testFunction ? testFunction : async (e) => {
        e.preventDefault()
        setTitle('')
        setAuthor('')
        setUrl('')
        try {
            dispatch(createBlog(title, author, url, token))
            dispatch(setNotification(`a new blog "${title}" ${author ? `by ${author} ` : ''}added`, 'success', 5))
            toggleVisibility(false)
        } catch (error) {
            dispatch(setNotification('Failed to create a new blog', 'error', 5))
        }
    }

    return (
        <Form onSubmit={e => create(e)} style={{ backgroundColor: '#CCCCCC', padding: '10px' }}>
            <Form.Group controlId="newBlogTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
                <Form.Text className="text-muted">
                    This is shown in the blog listing
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="newBlogAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="newBlogUrl">
                <Form.Label>Url</Form.Label>
                <Form.Control type="text" placeholder="Url" value={url} onChange={e => setUrl(e.target.value)} />
                <Form.Text className="text-muted">
                    Link to blog
                </Form.Text>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
       </Form>
    )
}

export default CreateBlog