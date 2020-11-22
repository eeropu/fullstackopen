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

export const setNotification = (content) => ({ type: 'SET_NOTIFICATION', data: { content }})
