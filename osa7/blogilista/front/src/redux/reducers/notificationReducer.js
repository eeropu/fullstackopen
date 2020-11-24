const initialState = {
    content: '',
    type: 'success'
}

const notificationReducer = (state=initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'CLEAR_NOTIFICATION':
            return { ...state, content: ''}
        default:
            return state
    }
}

export default notificationReducer

let previousTimeout = undefined

export const setNotification = (content, type, seconds) => {
    return async dispatch => {
        dispatch({ type: 'SET_NOTIFICATION', data: { content, type }})
        clearTimeout(previousTimeout)
        previousTimeout = setTimeout(() => {
            dispatch({ type: 'CLEAR_NOTIFICATION' })
        }, seconds * 1000)
    }
}