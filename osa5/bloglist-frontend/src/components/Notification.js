import React from 'react'

const Notification = ({ message, type }) => {

    const base = {
        display: message === '' ? 'none' : 'block',
        backgroundColor: 'lightgray',
        padding: '5px',
        fontSize: 'larger',
        borderRadius: '10px'
    }

    const styles = {
        success: {
            ...base,
            color: 'green',
            border: '2px solid green'
        },
        error: {
            ...base,
            color: 'red',
            border: '2px solid red'
        }
    }

    return <p style={styles[type]}>{ message }</p>
}

export default Notification