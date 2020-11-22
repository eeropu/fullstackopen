import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNew = (e) => {
        e.preventDefault()
        const content = document.getElementById('newAnecdote').value
        dispatch(newAnecdote(content))
        dispatch(setNotification(`You added "${content}"`))
        setTimeout(() => {
            dispatch(setNotification(''))
        }, 5000)
    }

    return (
        <>
            <h2>create new</h2>
            <form>
                <div><input id='newAnecdote' /></div>
                <button onClick={e => addNew(e)}>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm