import React, { useEffect, useState } from 'react'
import { gql, useLazyQuery } from '@apollo/client'

const ALL_BOOKS = gql`
  query($genre: String){
    allBooks(genre: $genre){
      title,
      published,
      author {
        name
      },
    }
  }
`

const Books = (props) => {
  const [genre, setGenre] = useState('')
  const [genreInput, setGenreInput] = useState('')

  const [allBooks, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    props.recommendations ? allBooks({ variables: { genre: props.recommendations }}) : allBooks({ variables: { genre: genre ? genre : null }})
  }, [genre, allBooks, props.recommendations ])

  const search = (e) => {
    e.preventDefault()
    setGenre(genreInput)
  }

  if (!props.show) {
    return null
  } else if (result.loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{props.recommendations ? 'recommendated books' : 'books'}</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {result.data.allBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {props.recommendations ? null :
      <>
        <h3>Filter by genre</h3>
        <form onSubmit={search}>
          <input type='text' value={genreInput} onChange={e => setGenreInput(e.target.value)} />
          <button type='submit'>Search</button>
        </form>
      </>
      }
    </div>
  )
}

export default Books