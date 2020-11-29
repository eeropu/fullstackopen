const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const pubsub = new PubSub()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'THIS_IS_A_VERY_SECRET_KEY'

require('dotenv').config()

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log('connected to MongoDB')
    }).catch((error) => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const typeDefs = gql`
    type Author {
        name: String!
        born: Int
        id: ID
        bookCount: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }
      
    type Token {
        value: String!
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author]!,
        me: User
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String]!
        ): Book
        editAuthor(
            name: String!
            setBornTo: Int!
        ): Author
        createUser(
            username: String!
            favoriteGenre: String!
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }

    type Subscription {
        bookAdded: Book!
    }
`

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            if (args.author) {
                const authorToSearchBy = await Author.findOne({ name: args.author })
                if (args.genre) {
                    return Book.find({ author: authorToSearchBy._id, genres: args.genre }).populate('author')
                } else {
                    return Book.find({ author: authorToSearchBy._id }).populate('author')
                }
            } else if (args.genre) {
                return Book.find({ genres: args.genre }).populate('author')
            } else {
                return Book.find({}).populate('author')
            }
        },
        allAuthors: () => Author.find({}),
        me: (root, args, context) => context.currentUser
    },

    Mutation: {
        addBook: async (root, args, { currentUser }) => { // context.currentUser

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            let author = await Author.findOne({ name: args.author })
            if (!author) {
                authorToSave = new Author({ name: args.author })
                try {
                    author = await authorToSave.save()
                } catch (error) {
                    throw new UserInputError(error.message, { invalidArgs: args })
                }
            }

            const book = new Book({ ...args, author: author._id })
            try {
                await book.save()
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }

            const result = book.execPopulate('author')

            pubsub.publish('BOOK_ADDED', { bookAdded: result })

            return result
        },
        editAuthor: (root, args, { currentUser }) => {

            if (!currentUser) {
                throw new AuthenticationError("not authenticated")
            }

            try {
                return Author.findOneAndUpdate({ name: args.name }, { born: args.setBornTo }, { new: true })
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }
        },
        createUser: (root, args) => {
            const user = new User(({ ...args }))

            return user.save().catch(error => {
                throw new UserInputError(error.message, { invalidArgs: args })
            })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })

            if (!user || args.password !== 'secret') {
                throw new UserInputError('wrong credentials')
            }

            const userForToken = {
                username: user.username,
                favoriteGenre: user.favoriteGenre,
                id: user._id
            }

            return { value: jwt.sign(userForToken, JWT_SECRET) }
        }
    },

    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    },

    Author: {
        bookCount: (root) => Book.countDocuments({ author: root.id })
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})