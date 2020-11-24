import loginService from './../../services/login'
import userService from './../../services/users'

const initialState = {
    all: [],
    loggedIn: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return { ...state, loggedIn: action.data }
        case 'LOG_OUT':
            return { ...state, loggedIn: null}
        case 'INIT_USERS':
            return { ...state, all: action.data }
        default:
            return state
    }
}

export default userReducer

export const initUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({ type: 'INIT_USERS', data: users})
    }
}

export const checkForLoggedInUser = () => {
    return dispatch => {
        const user = window.localStorage.getItem('loggedBlogappUser')
        if (user) {
            dispatch({ type: 'LOG_IN', data: JSON.parse(user) })
        }
    }
}

export const logIn = (username, password) => {
    return async dispatch => {
        const user = await loginService.login(username, password)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
        dispatch({ type: 'LOG_IN', data: user })
    }
}

export const logOut = () => {
    return dispatch => {
        console.log('reached')
        window.localStorage.removeItem('loggedBlogappUser')
        dispatch({ type: 'LOG_OUT' })
    }
}