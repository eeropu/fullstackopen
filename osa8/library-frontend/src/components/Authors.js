import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'

const ALL_AUTHORS = gql`
  query{
    allAuthors{
      name,
      born,
      bookCount
    }
  }
`

const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ) {
      name,
      born,
      bookCount
    }
  }
`

const Authors = (props) => {
  const [ name, setName ] = useState('')
  const [ born, setBorn ] = useState('')
  
  const result = useQuery(ALL_AUTHORS)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: error => {
      alert(error.graphQLErrors[0].message)
    }
  })

  if (!props.show) {
    return null
  } else if (result.loading) {
    return <div>Loading...</div>
  }

  const update = e => {
    e.preventDefault()

    editAuthor({ variables: { name, setBornTo: Number(born) }})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {result.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={update} style={{ display: props.token ? 'block' : 'none' }}>
        <h5>Set year of birth:</h5>
        Name: <select value={name} onChange={(e) => setName(e.target.value)}>
          <option disabled value=''> -- select an author -- </option>
          { result.data.allAuthors.map(author => <option key={author.name}>{author.name}</option>)}
        </select><br/>
        Born: <input type='number' value={born} onChange={e => setBorn(e.target.value)} /><br/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Authors
