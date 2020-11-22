import React from 'react'
import { useDispatch } from 'react-redux'
import { newAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const addNew = async (e) => {
        e.preventDefault()
        const content = document.getElementById('newAnecdote').value
        try {
            dispatch(newAnecdote(content))
            dispatch(setNotification(`You added "${content}"`, 5))
        } catch (error) {
            console.log(error)
        }
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