const initialState = ''

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data.content
        default:
            return state
    }
}

export default notificationReducer

let previousTimeout = undefined

export const setNotification = (content, seconds) => {
    return async dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', data: { content }})
        clearTimeout(previousTimeout)
        previousTimeout = setTimeout(() => {
            dispatch({ type: 'SET_NOTIFICATION', data: { content: '' }})
        }, seconds * 1000)
    }
}
