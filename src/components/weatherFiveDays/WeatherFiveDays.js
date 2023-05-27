import { useEffect, useState } from "react";
import { withRouter } from 'react-router-dom';
import axios from "axios";

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

import './weatherFiveDays.scss';


const WeatherFiveDays = ({location}) => {
  
  const _apiBase = 'https://api.openweathermap.org/data/2.5/forecast?';
  const _apiKey = 'a4d1d3041a0a7f472aafed3229a84bd1';
  const [fiveDays, setFiveDays] = useState({});


  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(`${_apiBase}q=${location.state.fetchName}&lang=ru&appid=${_apiKey}`);
        const fullFiveDays = getFiveDays(data.list);

        setFiveDays(transformData(fullFiveDays));
      } catch (error) {
        alert('Ошибка при получении погоды');
      }
    }
    
    getData();
  }, []);
  

  const getFiveDays = (data) => {
    return data.filter((item, i) => {
      return item.dt_txt.slice(11, 13) === '15';
    });
  }

  const transformData = (fullFiveDays) => {
    return fullFiveDays.map(day => {
      return {
        date: day.dt_txt.slice(5, 10),
        temp: Math.round(day.main.temp - 273),
        descr: day.weather[0].description[0].toUpperCase() + day.weather[0].description.slice(1),
        icon: `https://openweathermap.org/img/w/${day.weather[0].icon}.png`
      }
    })
  }

  

  return (
    <div className="five-days">
      <div className="weather__header">
        <div className="weather__text">Прогноз на 5 дней:
        </div>
      </div>
      <div className="weather__main-info">
          {fiveDays.length ? fiveDays.map(currentDay => (
            <Day key={currentDay.date} currentDay={currentDay}/>
          )) : null}
      </div>
    </div>
  )
}

const Day = ({currentDay}) => {
  const {date, descr, icon, temp} = currentDay;
  return (
    <Tippy placement="bottom" animation="scale" content={descr}>
      <div className="five-days__day">
        <div>{date}</div>
        <div>
          <img src={icon} alt="icon-cloud" />
        </div>
        <div>{temp}{'\u00b0'}C</div>
      </div>
    </Tippy>
  )
}

export default withRouter(WeatherFiveDays);