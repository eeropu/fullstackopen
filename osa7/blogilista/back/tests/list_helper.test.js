const list_helper = require('./../utils/list_helper')

test('dummy return one', () => {
    const result = list_helper.dummy([])
    expect(result).toBe(1)
})

const blogs = [ 
    { 
        _id: "5a422a851b54a676234d17f7", 
        title: "React patterns", 
        author: "Michael Chan", 
        url: "https://reactpatterns.com/", 
        likes: 7, 
        __v: 0 
    }, 
    {
         _id: "5a422aa71b54a676234d17f8", 
        title: "Go To Statement Considered Harmful", 
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html", 
        likes: 5, 
        __v: 0 
    }, 
    { 
        _id: "5a422b3a1b54a676234d17f9", 
        title: "Canonical string reduction", 
        author: "Edsger W. Dijkstra", 
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
        likes: 12, 
        __v: 0 
    }, 
    { 
        _id: "5a422b891b54a676234d17fa", 
        title: "First class tests", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll", 
        likes: 10, 
        __v: 0 
    }, 
    { 
        _id: "5a422ba71b54a676234d17fb", 
        title: "TDD harms architecture", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html", 
        likes: 0, 
        __v: 0 
    }, 
    { 
        _id: "5a422bc61b54a676234d17fc", 
        title: "Type wars", 
        author: "Robert C. Martin", 
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html", 
        likes: 2, 
        __v: 0 
    }
]

describe('total likes', () => {
    test('of empty list is zero', () => {
        const temp = []
        const result = list_helper.totalLikes(temp)
        expect(result).toBe(0)
    })
    test('when list has only one blog equals the likes of that', () => {
        const temp = blogs.slice(0, 1)
        const result = list_helper.totalLikes(temp)
        expect(result).toBe(7)
    })
    test('of a bigger list is calculated right', () => {
        const result = list_helper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

describe('favorite blog', () => {
    test('of empty list is undefined', () => {
        const temp = []
        const result = list_helper.favoriteBlog(temp)
        expect(result).toBe(undefined)
    })
    test('when list has only one blog is that blog', () => {
        const temp = blogs.slice(0, 1)
        const result = list_helper.favoriteBlog(temp)

        const expected = { 
            _id: "5a422a851b54a676234d17f7", 
            title: "React patterns", 
            author: "Michael Chan", 
            url: "https://reactpatterns.com/", 
            likes: 7, 
            __v: 0 
        }

        expect(result).toEqual(expected)
    })
    test('of a bigger list is found correctly', () => {
        const result = list_helper.favoriteBlog(blogs)
        
        const  expected = { 
            _id: "5a422b3a1b54a676234d17f9", 
            title: "Canonical string reduction", 
            author: "Edsger W. Dijkstra", 
            url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html", 
            likes: 12, 
            __v: 0 
        }

        expect(result).toEqual(expected)
    })
})

describe('most blogs', () => {
    test('returns undefined for empty list', () => {
        const temp = []
        const result = list_helper.mostBlogs(temp)
        expect(result).toBe(undefined)
    })
    test('on a list of one blog returns the author and blog count of 1', () => {
        const temp = blogs.slice(0, 1)
        const result = list_helper.mostBlogs(temp)

        const expected = {
            author: blogs[0].author,
            blogs: 1
        }

        expect(result).toEqual(expected)
    })
    test('returns the correct author with correct number of blogs on a bigger list', () => {
        const result = list_helper.mostBlogs(blogs)

        const expected = {
            author: "Robert C. Martin",
            blogs: 3
        }

        expect(result).toEqual(expected)
    })
})

describe('most likes', () => {
    test('returns undefined for empty list', () => {
        const temp = []
        const result = list_helper.mostLikes(temp)
        expect(result).toBe(undefined)
    })
    test('on a list of one blog returns the author and the like count of that blog', () => {
        const temp = blogs.slice(0, 1)
        const result = list_helper.mostLikes(temp)

        const expected = {
            author: blogs[0].author,
            likes: 7
        }

        expect(result).toEqual(expected)
    })
    test('returns the correct author with correct number of likes on a bigger list', () => {
        const result = list_helper.mostLikes(blogs)

        const expected = {
            author: "Edsger W. Dijkstra",
            likes: 17
        }

        expect(result).toEqual(expected)
    })
})