import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header content={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({ content }) =>  <h1>{ content }</h1>

const Content = ({ parts }) => parts.map(part => <Part name={ part.name } exercises={part.exercises}></Part>)

const Part = ({ name, exercises }) =>  <p>{name} {exercises}</p>

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p>Number of exercises {total}</p>
}

ReactDOM.render(<App />, document.getElementById('root'))