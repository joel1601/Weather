// Weather.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Weather.css';

const Weather = () => {
  const [data, setData] = useState({});
  const [forecast, setForecast] = useState([]);
  const [location, setLocation] = useState('');
  const [unit, setUnit] = useState('imperial');

  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${unit}&appid=0e2ce0d16623fda8567d50de30685434`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${unit}&cnt=5&appid=0e2ce0d16623fda8567d50de30685434`;

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(weatherUrl).then((response) => {
        setData(response.data);
      });
      axios.get(forecastUrl).then((response) => {
        setForecast(response.data.list);
      });
      setLocation('');
    }
  };

  const convertTemperature = (temperature) => {
    return unit === 'imperial' ? temperature : ((temperature - 32) * 5) / 9;
  };

  const toggleUnit = () => {
    setUnit(unit === 'imperial' ? 'metric' : 'imperial');
  };
  const [currentDay, setCurrentDay] = useState('');
  const [weekdays, setWeekdays] = useState([]);


  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();
    const dynamicWeekdays = days.slice(currentDayOfWeek).concat(days.slice(0, currentDayOfWeek)).map(day => day.slice(0, 3));
    setCurrentDay(days[currentDayOfWeek]);
    setWeekdays(dynamicWeekdays);
  }, []);



  return (
    <div className="weather">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{convertTemperature(data.main.temp).toFixed()}°{unit === 'imperial' ? 'F' : 'C'}</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{convertTemperature(data.main.temp_min).toFixed()}°{unit === 'imperial' ? 'F' : 'C'}</p> : null}
              <p>Min Temp</p>
            </div>
            <div className="feels">
              {data.main ? <p className="bold">{convertTemperature(data.main.temp_max).toFixed()}°{unit === 'imperial' ? 'F' : 'C'}</p> : null}
              <p>Max Temp</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
         <h2>5-Day Forecast</h2>
        <div className="forecast">
          {forecast.map((item,Day,index) => (
             <div className="forecast-card" key={item.dt}>
             <p key={index}>days: {Day}</p>
             <p>Average Temperature: {convertTemperature(item.main.temp).toFixed()}°{unit === 'imperial' ? 'F' : 'C'}</p>
             <p>Weather: {item.weather && item.weather[0] && item.weather[0].main}</p>
           </div>
          ))}
        </div>
        <div className="unit-toggle">
        <button onClick={toggleUnit}>
          Convert to ({unit === 'imperial' ? 'Celsius' : 'Fahrenheit'})
        </button>
      </div>
      </div>
    </div>
  );
};

export default Weather;
