const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = (blogs) => blogs.reduce((favorite, blog) => !favorite || favorite.likes < blog.likes ? blog : favorite, undefined)

const mostBlogs = (blogs) => {
    const blogCount = blogs.reduce((bc, blog) => bc[blog.author] ? { ...bc, [blog.author]: bc[blog.author] + 1 } : { ...bc, [blog.author]: 1 }, {})
    return Object.keys(blogCount).reduce((authorWithMostBlogs, author) =>
        !authorWithMostBlogs || authorWithMostBlogs.blogs < blogCount[author]
            ? { author, blogs: blogCount[author] }
            : authorWithMostBlogs
        , undefined)
}

const mostLikes = (blogs) => {
    const likeCount = blogs.reduce((bc, blog) => bc[blog.author] ? { ...bc, [blog.author]: bc[blog.author] + blog.likes } : { ...bc, [blog.author]: blog.likes }, {})
    return Object.keys(likeCount).reduce((authorWithMostLikes, author) =>
        !authorWithMostLikes || authorWithMostLikes.likes < likeCount[author]
            ? { author, likes: likeCount[author] }
            : authorWithMostLikes
        , undefined)
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}