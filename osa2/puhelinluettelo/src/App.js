import React, { useEffect, useState } from 'react'
import phonebookAPI from './services/phonebookAPI'
const App = () => {
  const [ search, setSearch ] = useState('')
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ isError, setIsError ] = useState(false)


  useEffect(() => {
    phonebookAPI.getAll().then(response => setPersons(response.data)).catch(error => console.log(error))
  }, [])

  const addPerson = (e) => {
    e.preventDefault()
    const addable = {
      name: newName,
      number: newNumber
    }

    const temp = persons.find(person => person.name === newName)

    if (temp && window.confirm(`${newName} is already added to phonebook, do you want to update phone number?`)) {
      phonebookAPI.update(temp.id, addable).then(response => {
        setPersons(persons.map(p => p.id !== temp.id ? p : response.data))
        setMessage(`${addable.name} updated`)
        setIsError(false)
      }).catch(error => {
        console.log(error)
        setIsError(true)
        setMessage(error.response.data)        
      })
    } else {
      phonebookAPI.create(addable).then(response => {
        setPersons(persons.concat(response.data))
        setMessage(`${addable.name} added`)
        setIsError(false)
      }).catch(error => {
        setMessage(error.response.data)
        setIsError(true)
      })
    }

    setNewName('')
    setNewNumber('')
  }

  const removePerson = (person) => {
    if (window.confirm(`Are you sure you want to remove user: ${person.name}?`)){
      phonebookAPI.remove(person.id).then(() => {
        setPersons(persons.filter(p => p.id !== person.id))
        setMessage(`${person.name} deleted`)
        setIsError(false)
      }).catch(error => {
        if(error.response.status === 404) {
          setMessage(error.response.data)
          setPersons(persons.filter(p => p.id !== person.id))
        } else {
          setMessage(error.response.data)
        }
        setIsError(true)
      })
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Message content={message} error={isError}/>
      <Search search={search} setSearch={setSearch} />
      <AddPerson 
        addPerson={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />
      <h2>Numbers</h2>
      { persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
        .map(person => <Person key={person.name} person={person} removePerson={removePerson}></Person>) }
    </div>
  )
}

const Message = ({ content, error }) => {
  const [ show, setShow ] = useState(false)

  useEffect(() => {
    if (content) {
      setShow(true)
      setTimeout(() => {
        setShow(false)
      }, 5000)
    }
  }, [content])

  const style = {
    display: show ? 'block' : 'none',
    color: error ? 'red' : 'green',
    border: error ? '2px solid red' : '2px solid green',
    borderRadius: '5px',
    padding: '5px',
    fontSize: 'large',
    fontWeight: 'bold',
    backgroundColor: 'lightgray'
}

  return <p style={style}>{ content }</p>
}

const Search = ({ search, setSearch }) => {
  return (
    <>
      <h2>Search</h2>
      Person name incudes <input type='text' value={search} onChange={e => setSearch(e.target.value)}/>
    </>
  )
}

const AddPerson = ({ addPerson, newName, setNewName, newNumber, setNewNumber }) => (
  <>
    <h2>Add person</h2>
    <form onSubmit={e => addPerson(e)}>
      <div>
        name: <input type='text' value={newName} onChange={e => setNewName(e.target.value)}/>
      </div>
      <div>
        number: <input type='text' value={newNumber} onChange={e => setNewNumber(e.target.value)}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  </>
)

const Person = ({ person, removePerson }) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
    </div>
  )
}

export default App