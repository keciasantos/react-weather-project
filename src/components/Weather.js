import React, { useState } from "react";
import axios from "axios";
import WeatherInfo from "./WeatherInfo";
//import WeatherForm from "./WeatherForm";
import WeatherForecast from "./WeatherForecast";
import "./styles/Weather.css";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity);
  const [country, setCountry] = useState(props.defaultCountry);

  function handleResponse(response) {
    console.log(response.data);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      city: response.data.name,
      country: response.data.sys.country,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      feels: response.data.main.feels_like,
      icon: response.data.weather[0].icon,
      date: new Date(response.data.dt * 1000),
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    search();
  }

  function handleCityChange(event) {
    setCity(event.target.value);
  }

  function search() {
    const apiKey = "ce9e9a1384d8ee7b166d7542086e2fdc";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      // <div className="Weather">
      //   <WeatherForm
      //     handleCityChange={handleCityChange}
      //     handleSubmit={handleSubmit}
      //   />
      //   <WeatherInfo data={weatherData} />
      //   <WeatherForecast
      //     data={weatherData}
      //     coordinates={weatherData.coordinates}
      //   />
      // </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
