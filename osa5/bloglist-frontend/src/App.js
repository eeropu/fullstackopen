import React, { useState, useEffect } from 'react'
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

  useEffect(() => {
    const temp = window.localStorage.getItem('loggedBlogappUser')
    if (temp) {
      setUser(JSON.parse(temp))
    }
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
            <Blog key={blog.id} blog={blog} />
            )}
          <br></br>
          <CreateBlog token={user.token} blogs={blogs} setBlogs={setBlogs} showNotification={showNotification}/>
        </div>
      ) : (
        <Login setUser={setUser} showNotification={showNotification}/>
      )}
    </div>
  )
}

export default App