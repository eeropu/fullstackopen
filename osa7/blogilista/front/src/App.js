import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect, useRef, useImperativeHandle } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import UserList from './components/UserList'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './redux/reducers/notificationReducer'
import { initBlogs } from './redux/reducers/blogReducer'
import { checkForLoggedInUser, logOut } from './redux/reducers/userReducer'
import { Route, Switch, useRouteMatch, Link } from 'react-router-dom'
import User from './components/User'
import { Button, Container, ListGroup, Nav } from 'react-bootstrap';


const App = () => {

    const loggedUser = useSelector(state => state.user.loggedIn)
    const users = useSelector(state => state.user.all)
    const blogs = useSelector(state => state.blogs)

    const dispatch = useDispatch()

    const newBlogRef = useRef()

    useEffect(() => {
        dispatch(checkForLoggedInUser())
        dispatch(initBlogs())
    }, [dispatch])



    const logout = () => {
        dispatch(logOut())
        dispatch(setNotification('log out successful', 'success', 5))
    }

    const userMatch = useRouteMatch('/users/:id')
    const user = userMatch ? users.find(user => user.id === userMatch.params.id) : null

    const blogMatch = useRouteMatch('/blogs/:id')
    const blog = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null

    return (
        <Container>

            <Nav activeKey="/" onSelect={(key) => { if (key === 'logOut') { logout() }}}>
                <Nav.Item>
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/users">Users</Nav.Link>
                </Nav.Item>
                <Nav.Item className='ml-auto'>
                    <Nav.Link disabled>
                        {loggedUser ? `Logged in as ${loggedUser.username}` : ''}
                    </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey='logOut'>
                        Log out
                    </Nav.Link>
                </Nav.Item>
            </Nav>

            <Notification />
            <Switch>
                <Route exact path='/'>
                    {loggedUser ? (
                        <div>
                            <h2>Blogs</h2>
                            <ListGroup variant="flush">
                                {blogs.map(b =>
                                    <ListGroup.Item key={b.id}><Link key={b.id} to={`/blogs/${b.id}`}>{b.title}</Link></ListGroup.Item>
                                )}
                            </ListGroup>
                            <Togglable buttonLabel='new blog' ref={newBlogRef}>
                                <CreateBlog toggleVisibility={newBlogRef.current && newBlogRef.current.toggleVisibility} />
                            </Togglable>
                        </div>
                    ) : (
                            <Login />
                        )}
                </Route>
                <Route path='/blogs/:id'>
                    <Blog blog={blog} />
                </Route>
                <Route path='/users/:id'>
                    <User user={user} />
                </Route>
                <Route path='/users'>
                    <UserList />
                </Route>

            </Switch>
        </Container>
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
                <Button onClick={() => toggleVisibility(true)}>{props.buttonLabel}</Button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <Button style={{ marginTop: '10px' }} onClick={() => toggleVisibility(false)}>cancel</Button>
            </div>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default App