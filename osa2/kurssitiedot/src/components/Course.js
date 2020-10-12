import React from 'react'

const Course = ({ course }) => {
    return (
        <>
            <Header content={course.name}></Header>
            <Content parts={course.parts}></Content>
            <Total parts={course.parts}></Total>
        </>
    )
}

const Header = ({ content }) => <h1>{content}</h1>

const Content = ({ parts }) => parts.map(part => <Part name={part.name} exercises={part.exercises}></Part>)

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Total = ({ parts }) => {
    const total = parts.reduce((sum, part) => sum + part.exercises, 0)
    return <p>Number of exercises {total}</p>
}

export default Course