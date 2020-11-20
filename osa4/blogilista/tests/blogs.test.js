require('dotenv').config()
const mongoose  = require('mongoose')
const supertest = require('supertest')
const { post } = require('../app')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

const Blog = require('./../models/blog')

const blogs = [
    { 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7, 
    }, 
    {
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
        likes: 5, 
    }, 
    { 
        title: "Canonical string reduction", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
        likes: 12, 
    }
]

let userId
let token

beforeAll(async () => {

    await User.deleteMany({})
    const testUser = await api
        .post('/api/users')
        .send({
            username: 'test',
            name: 'test',
            password: 'test123'
        })
        
    const login = await api
        .post('/api/login')
        .send({
            username: 'test',
            password: 'test123'
        })
    
    token = login.body.token

    userId = await (await User.findOne({username: 'test'}))._id.toString()

    await Blog.deleteMany({})
    await Promise.all(blogs.map( blog => { new Blog({ ...blog, user: userId}).save() }))
})

test('dummy', () => {
    expect(1).toBe(1)
})

test('blogs are returned as json', async () => {
    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(result.body.length).toBe(3)
})

test('blogs contain id field', async () => {
    const result = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    result.body.forEach(blog => {
        expect(blog.id).toBeDefined()
        expect(blog._id).not.toBeDefined()
    })
})

test('adding a new blog works', async () => {
    const blogToAdd = {
        title: "testing 101", 
        author: "tester", 
        url: "https://testingtests.com/", 
        likes: 3,
        user: userId
    }

    const result = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    delete result.body.id
    expect(result.body).toEqual(blogToAdd)

    const updated = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    blogToAdd.user = {
        id: userId,
        name: 'test',
        username: 'test'
    }

    expect(updated.body.length).toBe(4)
    expect(updated.body.map(blog => { delete blog.id; return blog })).toContainEqual(blogToAdd)
})

test('likes is set to 0 by default', async () => {
    const blogToAdd = {
        title: "testing 102", 
        author: "tester", 
        url: "https://testingtests.com/",
        user: userId
    }

    const result = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogToAdd)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    blogToAdd.likes = 0

    delete result.body.id
    expect(result.body).toEqual(blogToAdd)

    const updated = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    blogToAdd.user = {
        id: userId,
        name: 'test',
        username: 'test'
    }

    expect(updated.body.length).toBe(5)
    expect(updated.body.map(blog => { delete blog.id; return blog })).toContainEqual(blogToAdd)
})

test('adding a blog without a title or url returns 400', async () => {
    const blogToAdd = {
        author: "tester", 
        url: "https://testingtests.com/", 
    }

    const result = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogToAdd)
        .expect(400)

    expect(result.body.error).toEqual('blog must have a title')

    const blogToAdd_2 = {
        title: "testing 103",
        author: "tester", 
    }

    const result_2 = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogToAdd_2)
        .expect(400)

    expect(result_2.body.error).toEqual('blog must have a url')
})

test('adding a blog without token responds correctly', async () => {
    const blogToAdd = {
        title: "testing 101", 
        author: "tester", 
        url: "https://testingtests.com/", 
        likes: 3,
        user: userId
    }

    const result = await api
        .post('/api/blogs')
        .send(blogToAdd)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    expect(result.body.error).toEqual('token missing or invalid')
})

test('deleting a blog works', async () => {

    const blogsInDB = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blog = blogsInDB.body[0]

    await api
        .delete(`/api/blogs/${blog.id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)
    
    const blogsInDBAfterDeletion = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(blogsInDB.body.length).toBe(blogsInDBAfterDeletion.body.length + 1)
})

test('updating a blog works', async () => {

    const blogToAdd = {
        title: "updating 101", 
        author: "updater", 
        url: "https://updatingtests.com/", 
        likes: 1,
        user: userId
    }

    const added = await api
        .post('/api/blogs')
        .set('Authorization', `bearer ${token}`)
        .send(blogToAdd)
        .expect(201)

    const blogUpdate = { ...blogToAdd, likes: 5 }

    const update = await api
        .put(`/api/blogs/${added.body.id}`)
        .send(blogUpdate)
        .expect(200)
    
    const updated = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    blogToAdd.user = {
        id: userId,
        name: 'test',
        username: 'test'
    }

    blogUpdate.user = {
        id: userId,
        name: 'test',
        username: 'test'
    }

    const result = updated.body.map(blog => { delete blog.id; return blog })
    
    expect(result).not.toContainEqual(blogToAdd)
    expect(result).toContainEqual(blogUpdate)
})

describe('User requirements', () => {
    test('Password doesn\'t exist, returns 400', async () => {
        const result = await api
            .post('/api/users')
            .send({
                username: 'testi',
                name: 'testi'
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toBe('Password must exist and be atleast 3 characters long')
    })

    test('Password is less than 3 chars long, returns 400', async () => {
        const result = await api
            .post('/api/users')
            .send({
                username: 'testi',
                name: 'testi',
                password: 'te'
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toBe('Password must exist and be atleast 3 characters long')
    })

    test('Username doesn\'t exist, returns 400', async () => {
        const result = await api
            .post('/api/users')
            .send({
                name: 'testi',
                password: 'testi'
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toBe('User validation failed')
    })

    test('Username is less than 3 characters long, returns 400', async () => {
        const result = await api
            .post('/api/users')
            .send({
                username: 'te',
                name: 'testi',
                password: 'testi'
            })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toBe('User validation failed')
    })
})

afterAll(() => {
    mongoose.connection.close()
})