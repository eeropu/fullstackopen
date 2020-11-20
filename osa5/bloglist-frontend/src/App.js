import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import blogService from './services/blogs'


const App = () => {
  const [user, setUser] = useState(undefined)
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')
  const [type, setType] = useState('')

  const newBlogRef = useRef()

  useEffect(() => {
    const temp = window.localStorage.getItem('loggedBlogappUser')
    if (temp) {
      setUser(JSON.parse(temp))
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(undefined)
    showNotification('log out successful', 'success')
  }

  const showNotification = (message, type) => {
    setMessage(message)
    setType(type)
    setTimeout(() => {
      setMessage('')
    }, 5000)
  }

  const like = async (blog) => {
    try {
      await blogService.like(blog)
      setBlogs(blogs.map(b => b.id === blog.id ? { ...blog, likes: blog.likes + 1 } : { ...b }).sort((a, b) => b.likes - a.likes))
    } catch (error) {
      console.log('something went wrong:', error)
    }
  }

  const remove = async (blog) => {
    if (window.confirm(`Remove blog "${blog.title}" by ${blog.author}`)) {
      try {
        await blogService.remove(blog.id, user.token)
        setBlogs(blogs.filter(b => b.id !== blog.id))
      } catch (error) {
        console.log('something went wrong:', error)
      }
    }
  }

  return (
    <div>
      <Notification message={message} type={type}/>
      { user ? (
        <div>
          <h2>blogs</h2>
          <span>{user.name} logged in</span> <button onClick={logout}>Log out</button>
          <br></br>
          <br></br>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} like={like} remove={remove} loggedUsersBlog={blog.user && blog.user.username === user.username}/>
          )}
          <br></br>
          <Togglable buttonLabel='new blog' ref={newBlogRef}>
            <CreateBlog token={user.token} blogs={blogs} setBlogs={setBlogs} showNotification={showNotification} toggleVisibility={newBlogRef.current && newBlogRef.current.toggleVisibility}/>
          </Togglable>
        </div>
      ) : (
        <Login setUser={setUser} showNotification={showNotification}/>
      )}
    </div>
  )
}

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }
  const hideWhenVisible = { display: visible ? 'none' : '' }

  const toggleVisibility = (value) => {
    setVisible(value)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => toggleVisibility(true)}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => toggleVisibility(false)}>cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

export default App