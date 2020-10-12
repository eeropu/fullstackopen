import React, { useEffect, useState } from 'react';
import axios from 'axios'

function App() {

  const [ search, setSearch ] = useState('')
  const [ countries, setCountries ] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      const content = response.data.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
      setCountries(content)
    })
  }, [ search ])

  let content = <></>

  if (countries.length > 10) {
    content = <p>Too many countries, specify another filter</p>
  } else if (countries.length > 1) {
    content = <ul>{countries.map(country => <li key={country.name}>{country.name} <button onClick={() => setSearch(country.name)}>show</button></li>)}</ul>
  } else if (countries.length === 1) {
    const country = countries[0]
    content = (
      <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h4>languages</h4>
        <ul>{country.languages.map(lang => <li key={lang.name}>{lang.name}</li>)}</ul>
        <img src={country.flag} alt='flag' style={{ maxWidth: '100px' }}/>
        <CapitalWeather name={country.capital}/>
      </div>
    )
  }

  return (
    <div className="App">
      Find countries: <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
      { content }
    </div>
  );
}

const CapitalWeather = ({ name }) => {
  const [ weatherData, setWeatherData ] = useState(undefined)

  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_KEY}&query=${name}`)
      .then(response => {
        setWeatherData(response.data.current)
      })
  }, [name])

  if (weatherData) {
    return (
      <>
        <h3>Weather in {name}</h3>
        <p><b>Temperature:</b> {weatherData.temperature}</p>
        <img src={weatherData.weather_icons[0]} alt='weather icon'></img>
        <p><b>Wind:</b> {weatherData.wind_speed} kph, direction {weatherData.wind_dir}</p>
      </>
    )
  } else {
    return <p>Loading weather data...</p>
  }
}

export default App;
