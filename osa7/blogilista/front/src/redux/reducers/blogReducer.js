import blogService from './../../services/blogs'

const initialState = []

const blogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'CREATE_BLOG':
            return state.concat(action.data)
        case 'UPDATE_BLOG':
            return state.map(blog => blog.id === action.data.id ? action.data : blog)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        default:
            return state
    }
}

export default blogReducer

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({ type: 'INIT_BLOGS', data: blogs.sort((a, b) => b.likes - a.likes)})
    }
}

export const createBlog = (title, author, url, token) => {
    return async dispatch => {
        const newBlog = await blogService.create(title, author, url, token)
        dispatch({ type: 'CREATE_BLOG', data: newBlog })
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        await blogService.like(blog)
        dispatch({ type: 'UPDATE_BLOG', data: { ...blog, likes: blog.likes + 1 }})
    }
}

export const addComment = (blog, content) => {
    return async dispatch => {
        const comment = await blogService.comment(blog.id, content)
        dispatch({ type: 'UPDATE_BLOG', data: { ...blog, comments: blog.comments.concat(comment) }})
    }
}

export const removeBlog = (id, token) => {
    return async  dispatch => {
        await blogService.remove(id, token)
        dispatch({ type: 'REMOVE_BLOG', data: { id }})
    }
}