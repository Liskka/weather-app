import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import DetailsWeather from '../detailsWeather/DetailsWeather';

import axios from 'axios';

import './currentWeather.scss';

const CurrentWeather = ({ match, location, history }) => {
  // const [details, setDetails] = useState(false);

  // console.log('match = ', match)
  console.log('location = ', location)
  // console.log('history = ', history)
  
  const _apiBase = 'https://api.openweathermap.org/data/2.5/weather?';
  const _apiKey = 'a4d1d3041a0a7f472aafed3229a84bd1';
  const [weather, setWeather] = useState({});
  // const [activeCity, setActiveCity] = useState('Zaporizhia');
  const activeCity = location.state.fetchName;
  
  const {name, temp, info, icon, date} = weather;
  
  const currentDate = new Date(date); // Date 2011-05-09T06:08:45.178Z
  const year = currentDate.getFullYear();
  const month = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const day = ("0" + currentDate.getDate()).slice(-2);
  const hours = ("0" + currentDate.getHours()).slice(-2);
  const min = ("0" + currentDate.getMinutes()).slice(-2);

  const today = `${year}-${month}-${day} ${hours}:${min}`;

  // console.log(today)


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
        date: data.dt * 1000
      }
    }

  
  return (
    <div className='weather'>
      <div className="weather__date">{today}</div>
      <div className="weather__city">Температура в городе {name}:</div>
      <div className="weather__temp">{temp}{'\u00b0'}C</div>
      <img className="weather__icon" src={`https://openweathermap.org/img/w/${icon}.png`} alt="weather" />
      <div className="weather__info">{info}</div>
      <div className="weather__detail"
      >
        Подробнее...
      </div>
      {/* <DetailsWeather activeCity={activeCity}/> */}
    </div>
  )
}

export default withRouter(CurrentWeather);


