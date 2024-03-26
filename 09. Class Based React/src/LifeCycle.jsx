import React from "react";

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
// ! LifeCycle Methods
// Todo: ComponentDidMount()         Initial Render             useEffect []
// Todo: ComponentDidUpdate()        Re-Render                  useEffect [state]
// Todo: ComponentWillUnmount()      Unmount                    useEffect return ()=>{}
class LifeCycle extends React.Component {
  state = {
    // ! With Class Field
    // location: "New York",
    location: "",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  fetchWeather = async () => {
    // ! Arrow functions do not lose their binding to the "this" keyword
    if(this.state.location.trim().length < 2) return this.setState({weather : {}});
    try {
      this.setState({ isLoading: true });
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();
      if (!geoData.results) throw new Error("Location not found");
      const { latitude, longitude, timezone, name, country_code } =
        geoData.results.at(0);
      this.setState({
        displayLocation: `${name} ${convertToFlag(country_code)}`,
      });
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
      );
      const weatherData = await weatherRes.json();
      this.setState({ weather: weatherData.daily });
    } catch (err) {
      this.setState({ location: err.message });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    // this.fetchWeather();            // ! Immediately call tehe function because of componentDidMount
    this.setState({location : localStorage.getItem('location') || ""});
  }
  componentDidUpdate(prevProps, prevState) {                        // ! parametrlere istenilen ad qoyula biler ancaq her zaman I: Props    II: State olur
    // console.log(prevProps, prevState);
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
      localStorage.setItem('location', this.state.location);
    }
  }
  render() {
    return (
      <div className="app">
        <h1>Classy Weather</h1>
        <Input location={this.state.location} handleChange={(e) => this.setState({ location : e.target.value})}/>
        <h3>{this.state.displayLocation}</h3>
        {this.state.isLoading && <p className="loader">Loading...</p>}
        {this.state.weather.weathercode && (
          <Weather
            weather={this.state.weather}
            location={this.state.location}
          />
        )}
      </div>
    );
  }
}

class Weather extends React.Component {
    componentWillUnmount(){
        console.log('Weather will unmount');
    }
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
        <ul className="weather">
          {dates &&
            dates.map((date, i) => (
              <Day
                key={i}
                date={date}
                code={codes.at(i)}
                max={max.at(i)}
                min={min.at(i)}
                isToday={i === 0}
                isTomorrow={i === 1}
              />
            ))}
        </ul>
      </div>
    );
  }
}

class Day extends React.Component {
  render() {
    const { date, code, max, min, isToday, isTomorrow } = this.props;
    return (
      <>
        <li className="day">
          <span>{getWeatherIcon(code)}</span>
          <p>{isToday ? "Today" : isTomorrow ? "Next Day" : formatDay(date)}</p>
          <p>
            {Math.floor(min)}&deg; &mdash;{" "}
            <strong>{Math.ceil(max)}&deg;</strong>
          </p>
          {/* <p>{date}</p>
        <p>{date}</p> */}
        </li>
      </>
    );
  }
}

class Input extends React.Component {
  render(/*props*/) {
    const { location, handleChange } = this.props;
    return (
      <>
        <div className="input">
          <input
            type="text"
            placeholder="Search from location..."
            // value={location}
            // value={this.props.location}
            onChange={handleChange}
          />
        </div>
      </>
    );
  }
}

export default LifeCycle;
