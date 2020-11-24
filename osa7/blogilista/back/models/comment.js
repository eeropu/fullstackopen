const mongoose = require('mongoose')

let mongoUrl = process.env.MONGO_URL

if (process.env.NODE_ENV === 'test') {
    mongoUrl = process.env.MONGO_TEST_URL
}

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
const blogSchema = mongoose.Schema({
    content: String,
    blog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Blog'
    }
})

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

const Comment = mongoose.model('Comment', blogSchema)

module.exports = Comment