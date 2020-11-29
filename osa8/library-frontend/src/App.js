import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { gql, useApolloClient, useLazyQuery, useSubscription } from '@apollo/client'

const LOGGED_USER = gql`
  query{
    me{
      favoriteGenre
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title,
      published,
      author {
        name
      },
      genres
    }
  }
`

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [notification, setNotification] = useState('')
  const client = useApolloClient()

  const [loggedUser, result] = useLazyQuery(LOGGED_USER)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      alert(`new book added: ${subscriptionData.data.bookAdded.title}`)
    }
  })

  useEffect(() => {
    const tokenInStorage = localStorage.getItem('library-app-user-token')
    if (tokenInStorage) {
      setToken(tokenInStorage)
    }
  }, [])

  useEffect(() => {
    if(token) {
      loggedUser()
    }
  }, [token, loggedUser])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        { token ? <button onClick={() => setPage('add')}>add book</button> : null}
        { token ? <button onClick={() => setPage('recommendations')}>recommendations</button> : null}
        { token ? <button onClick={logout}>Log out</button> : <button onClick={() => setPage('login')}>Log in</button>}
      </div>

      <Authors
        token={token}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Books 
        show={page === 'recommendations'}
        recommendations={result?.data?.me?.favoriteGenre}
      />

      <div style={{ display: page === 'login' ? 'block' : 'none' }}>
        <p>{notification}</p>
        <Login setToken={setToken} setNotification={setNotification} />
      </div>

    </div>
  )
}

export default App