import React from 'react';

function getWeatherIcon(wmoCode) {
  const icons = new Map([
    [[0], "☀️"],
    [[1], "🌤"],
    [[2], "🌥️"],
    [[3], "☁️"],
    [[45, 48], "🌫️"],
    [[51, 56, 61, 66, 80], "🌦️"],
    [[53, 55, 63, 65, 57, 67, 81, 82], "🌨️"],
    [[71, 73, 75, 77, 85, 86], "🌧️"],
    [[95], "🌩️"],
    [[96, 99], "⛈️"],
  ]);
  const arr = [...icons.keys()].find((key) => key.includes(wmoCode));
  if (!arr) return "NOT FOUND";
  return icons.get(arr);
}

function convertToFlag(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function formatDay(dateStr) {
  return new Intl.DateTimeFormat("en", {
    weekday: "short",
  }).format(new Date(dateStr));
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { location: 'Baku', isLoading: false, displayLocation: '', weather: {} };
    this.fetchWeather = this.fetchWeather.bind(this);          // ! Eger bu hisse olmasa  console.log(this) => undefined verir her zaman yazilmalidir
  }
  async fetchWeather(/*value*/) {
    // this.setState((location) => { return { location : value}})
    // console.log('Hello');
    // console.log(this);
    // console.log(this.state);
    try {
      this.setState({ isLoading: true });
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`);
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error("Location not found");
      const { latitude, longitude, timezone, name, country_code } = geoData.results.at(0);
      this.setState({ displayLocation: `${name} ${convertToFlag(country_code)}`})

      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`);
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      this.setState({ location: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.fetchWeather();
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
    }
  }
  render() {
    return (
      <div className='app'>
        <h1>Classy Weather</h1>
        <div className='input'>
          <input type='text' placeholder='Search from location...' /*value={this.state.location}*/ onChange={(e) => this.setState({ location: e.target.value })} />
          {/* <input type='text' placeholder='Search from location...' defaultValue={this.state.location} onChange={(e) => this.setState((curState) => {
            return { location: e.target.value }
          })} /> */}
          {/* <input type='text' placeholder='Search from location...' value={this.state.location} onChange={(e) => this.fetchWeather(e.target.value)} />  */}
        </div>
        <h3>{this.state.displayLocation}</h3>
        <button onClick={this.fetchWeather}>Get Weather</button>
        {this.state.isLoading && <p className='loader'>Loading...</p>}
        {this.state.weather.weathercode && <Weather weather={this.state.weather} location={this.state.location} />}
      </div>
    )
  }
} 


export default App;


class Weather extends React.Component {
  // constructor(props) {     // ! There is no need to write construction function because we dont need to initialize any state or bind event handler function
  //   super(props);
  // }
  render() { 
    const {
      temperature_2m_max: max,
      temperature_2m_min: min,
      time: dates,
      weathercode: codes,
    } = this.props.weather;
    return (
      <div>
        <h2>Weather {this.props.location}</h2>
        <ul className='weather'>
          {dates && dates.map((date, i) => <Day key={i} date={date} code={codes.at(i)} max={max.at(i)} min={min.at(i)} isToday={i === 0} isTomorrow={i === 1} />)}
        </ul>
      </div>
    )
  }
} 

class Day extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    const { date, code, max, min, isToday, isTomorrow } = this.props;
    return (
      <>
        <li className='day'>
          <span>{getWeatherIcon(code)}</span>
          <p>{isToday ? 'Today' : isTomorrow ? 'Next Day' : formatDay(date)}</p>
          <p>{Math.floor(min)}&deg; &mdash; <strong>{Math.ceil(max)}&deg;</strong></p>
          {/* <p>{date}</p>
        <p>{date}</p> */}
        </li>
      </>
    )
  }
}