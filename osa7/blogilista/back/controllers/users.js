const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (req, res) => {
  const result = await User.find({}).populate('blogs')
  res.json(result)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response.status(400).json({ error: 'Password must exist and be atleast 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.json(savedUser)
  } catch (error) {
    if (error._message === 'User validation failed') {
      return response.status(400).json({ error: error._message })
    } else {
      return response.status(500).json({ error: 'Something went wrong when adding a new user' })
    }
  }
})

module.exports = usersRouter