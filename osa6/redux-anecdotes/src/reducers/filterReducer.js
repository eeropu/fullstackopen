const initialState = ''

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return action.data.content
        default:
            return state
    }
}

export default filterReducer

export const setFilter = (content) => ({ type: 'SET_FILTER', data: { content }})