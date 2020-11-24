const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Blog = require('./../models/blog')

router.post('/reset', async (req, res) => {
    try {
        await User.deleteMany({})
        await Blog.deleteMany({})

        res.status(204).end()
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Something went wrong while reseting database' })
    }
})

module.exports = router