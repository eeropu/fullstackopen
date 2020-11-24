import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {

    const notification = useSelector(state => state.notification)

    const base = {
        display: notification.content === '' ? 'none' : 'block',
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

    return <p style={styles[notification.type]}>{ notification.content }</p>
}

export default Notification