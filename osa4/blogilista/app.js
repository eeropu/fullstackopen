const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization')
    const token = (authorization && authorization.toLowerCase().startsWith('bearer ')) ? authorization.substring(7) : null
    req.token = token
    next()
}

app.use(tokenExtractor)

const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}

module.exports = app