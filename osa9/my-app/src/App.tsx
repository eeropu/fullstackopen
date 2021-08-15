import React from 'react';
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts} />
      <Total exerciseCount={courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)} />
    </div>
  );
};

interface HeaderProps {
  name: string
}

const Header = (props: HeaderProps): JSX.Element => {
  return (
    <h1>{props.name}</h1>
  )
}

interface CoursePart {
  name: string
  exerciseCount: number
}

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <ul>
      {props.courseParts.map(part => <li key={part.name}>{part.name} {part.exerciseCount}</li>)}
    </ul>
  )
}

interface TotalProps {
  exerciseCount: number
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <p>Number of exercises {props.exerciseCount}</p>
  )
}

export default App;