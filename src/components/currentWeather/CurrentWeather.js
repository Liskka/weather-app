import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import DetailsWeather from '../detailsWeather/DetailsWeather';
import WeatherFiveDays from '../weatherFiveDays/WeatherFiveDays';

import axios from 'axios';

import windIcon from '../../resources/icon/wind.png';
import './currentWeather.scss';

const CurrentWeather = ({ match, location, history }) => {

  
  const _apiBase = 'https://api.openweathermap.org/data/2.5/weather?';
  const _apiKey = 'a4d1d3041a0a7f472aafed3229a84bd1';
  const [weather, setWeather] = useState({});
  const activeCity = location.state.fetchName;
  
  const {name, temp, info, icon, date} = weather;
  
  const currentDate = new Date(date); // Date 2011-05-09T06:08:45.178Z
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  const hours = ("0" + currentDate.getHours()).slice(-2);
  const min = ("0" + currentDate.getMinutes()).slice(-2);

  const today = `${year}-${month}-${day} ${hours}:${min}`;



  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(`${_apiBase}q=${activeCity}&lang=ru&appid=${_apiKey}`);
        setWeather(transformData(data));
      } catch (error) {
        alert('Ошибка при получении погоды');
      }
    }
    
    getData();
  }, [activeCity]);

  const transformData = (data) => {
      return {
        name: data.name,
        temp: Math.round(data.main.temp - 273),
        info: data.weather[0].description[0].toUpperCase() + data.weather[0].description.slice(1),
        icon: data.weather[0].icon,
        activeCity,
        date: data.dt * 1000,

        feelsLike: Math.round(data.main.feels_like - 273),
        clouds: data.clouds.all,
        humidity: data.main.humidity,
        pressure: Math.round((data.main.grnd_level || data.main.sea_level || data.main.pressure) / 1.333), /* Миллиметр трутного столба */
        windSpeed: Math.round(data.wind.speed),
        sunrise: `${String('0' + new Date(data.sys.sunrise * 1000).getHours()).slice(-2)}:${String('0' + new Date(data.sys.sunrise * 1000).getMinutes()).slice(-2)}`,
        sunset: `${String('0' + new Date(data.sys.sunset * 1000).getHours()).slice(-2)}:${String('0' + new Date(data.sys.sunset * 1000).getMinutes()).slice(-2)}`
      }
    }

  
  return (
    <div className='wrapper'>
      <div className="wrapper__left">
        <div className='weather'>
          <div className="weather__header">
            <div className="weather__text">Температура в городе {name}:
            </div>
          </div>
          <div className="weather__date">{today}</div>
          <div className="weather__main-info">
            <div className="info-temp">
              <div className="weather__weather-icon">
                <img src={`https://openweathermap.org/img/w/${icon}.png`} alt="weather" />
              </div>
              <div className="weather__temp">{temp}{'\u00b0'}C</div>
            </div>
            <div className="info-temp">
              <div className="weather__wind-icon">
                <img src={windIcon} alt="wind" />
              </div>
              <div className="weather__temp">
                {`${weather.windSpeed}м/с`}
              </div>
            </div>
          </div>
              <div className="weather__descr">{info}</div>
        </div>
          <WeatherFiveDays activeCity={activeCity}/>
      </div>
        <DetailsWeather weather={weather}/>
    </div>
  )
}

export default withRouter(CurrentWeather);


