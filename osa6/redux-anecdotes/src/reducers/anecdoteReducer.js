import anecdoteService from "../services/anecdoteService"

const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'INIT':
      return action.data.anecdotes
    case 'VOTE':
      return state.map(anecdote => anecdote.id === action.data.id ? { ...anecdote, votes: anecdote.votes + 1 } : anecdote )
    case 'NEW':
      return state.concat(action.data.anecdote)
    default:
      break;
  }

  return state
}

export default anecdoteReducer

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({ type: 'INIT', data: { anecdotes }})
  }
}

export const voteAnecdote = (anecdote) => {
  return async dispatch => {
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: 'VOTE', data: { id: anecdote.id }})
  }
}

export const newAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.create({ content, votes: 0 })
    dispatch({ type: 'NEW', data: { anecdote }})
  }
}