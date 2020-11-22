import React, { useState } from 'react'
import blogService from './../services/blogs'

const CreateBlog = ({ token, blogs, setBlogs, showNotification, toggleVisibility, testFunction }) => {
    const [ title, setTitle ] = useState('')
    const [ author, setAuthor ] = useState('')
    const [ url, setUrl ] = useState('')

    const create = testFunction ? testFunction : async (e) => {
        e.preventDefault()
        setTitle('')
        setAuthor('')
        setUrl('')
        try {
            const result = await blogService.create(title, author, url, token)
            setBlogs(blogs.concat(result))
            showNotification(`a new blog "${result.title}" ${result.author ? `by ${result.author} ` : '' }added`, 'success')
            toggleVisibility(false)
        } catch (error) {
            showNotification(error.response.data.error, 'error')
        }
    }

    return (
        <form onSubmit={e => create(e)}>
            title: <input type='text' id='createBlogTitle' value={title} onChange={e => setTitle(e.target.value)}/><br/>
            author: <input type='text' id='createBlogAuthor' value={author} onChange={e => setAuthor(e.target.value)}/><br/>
            url: <input type='text' id='createBlogUrl' value={url} onChange={e => setUrl(e.target.value)}/><br/>
            <input type='submit' id='createBlogSubmit'/>
        </form>
    )
}

export default CreateBlog