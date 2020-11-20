const express = require('express')
const User = require('../models/user')
const router = express.Router()
const jwt = require('jsonwebtoken')

const Blog = require('./../models/blog')

router.get('/', async (request, response) => {
    const result = await Blog.find({}).populate('user', {id: 1, name: 1, username: 1})
    response.json(result)
})

router.post('/', async (request, response) => {

    const token = request.token
    let decodedToken = {}

    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        console.log('jwt verification error')
    }

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const error = !request.body.title ? 'blog must have a title' : !request.body.url ? 'blog must have a url' : ''

    if (error) {
        return response.status(400).json({ error })
    }

    const blogToAdd = {
        ...request.body,
        likes: request.body.likes ? request.body.likes : 0,
        user: user._id
    }

    const blog = new Blog(blogToAdd)
    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
})

router.put('/:id', async (request, response) => {
    await Blog.findByIdAndUpdate(request.params.id, request.body)
    response.status(200).end()
})

router.delete('/:id', async (request, response) => {

    const token = request.token
    let decodedToken = {}

    try {
        decodedToken = jwt.verify(token, process.env.SECRET)
    } catch (error) {
        console.log('jwt verification error')
    }

    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const blogToRemove = await Blog.findById(request.params.id)

    const blogsUserId = blogToRemove.user.toString()

    if (decodedToken.id === blogsUserId) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(403).json({ error: 'Blogs can be removed only by the user that added it' })
    }

})

module.exports = router