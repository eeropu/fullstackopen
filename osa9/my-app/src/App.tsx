import React from 'react';
import "./index.css"

interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
    }
  ]

  return (
    <div>
      <Header name={courseName} />
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

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <>{props.courseParts.map(part => <Part key={part.name} part={part}/>)}</>
  )
}

interface PartProps {
  part: CoursePart
}

const Part = (props: PartProps): JSX.Element => {
  switch (props.part.type) {
    case "normal":
      return (
        <div key={props.part.name}>
          <h4>{props.part.name} {props.part.exerciseCount}</h4>
          <p className="description">{props.part.description}</p>
        </div>
      )
    case "groupProject":
      return (
        <div key={props.part.name}>
          <h4>{props.part.name} {props.part.exerciseCount}</h4>
          <p>Project exercises {props.part.groupProjectCount}</p>
        </div>
      )
    case "submission":
      return (
        <div key={props.part.name}>
          <h4>{props.part.name} {props.part.exerciseCount}</h4>
          <p className="description">{props.part.description}</p>
          <p>Submit to {props.part.exerciseSubmissionLink}</p>
        </div>
      )
    case "special":
      return (
        <div key={props.part.name}>
          <h4>{props.part.name} {props.part.exerciseCount}</h4>
          <p className="description">{props.part.description}</p>
          <p>Requirements:</p>
          <ul>
            {props.part.requirements.map((req, i) => <li key={i}>{req}</li>)}
          </ul>
        </div>
      )
    default:
      assertNever(props.part);
      return (
        <div>Invalid course part type!</div>
      )
  }
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface TotalProps {
  exerciseCount: number
}

const Total = (props: TotalProps): JSX.Element => {
  return (
    <p>Number of exercises {props.exerciseCount}</p>
  )
}

export default App;