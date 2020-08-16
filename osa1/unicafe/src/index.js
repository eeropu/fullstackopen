import ReactDOM from 'react-dom'
import React, { useState } from 'react'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text='Good' handleClick={() => setGood(good + 1)}></Button>
      <Button text='Neutral' handleClick={() => setNeutral(neutral + 1)}></Button>
      <Button text='Bad' handleClick={() => setBad(bad + 1)}></Button>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

const Button = ({ text, handleClick }) => <button onClick={handleClick}>{text}</button>

const Statistics = ({ good, neutral, bad }) => {

  const total = good + neutral + bad

  return (
    total ? 
    <>
      <h3>Statistics</h3>
      <table><tbody>
        <StatisticLine text='good' value={good}/>
        <StatisticLine text='neutral' value={neutral}/>
        <StatisticLine text='bad' value={bad}/>
        <StatisticLine text='all' value={total}/>
        <StatisticLine text='average' value={(good - bad) / total}/>
        <StatisticLine text='positive' value={good / total}/>
      </tbody></table>
    </> :
    <p>No feedback given</p>
  )
}

const StatisticLine = ({ text, value }) => <tr><td>{text}</td><td>{value}</td></tr>

ReactDOM.render(<App />, 
  document.getElementById('root')
)