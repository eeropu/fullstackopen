import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setFilter } from './../reducers/filterReducer'

const Filter = () => {
    const filter = useSelector(store => store.filter)
    const dispatch = useDispatch()

    return (
        <div>
            Filter: <input type='text' value={filter} onChange={e => dispatch(setFilter(e.target.value))}/>
        </div>
    )
}

export default Filter