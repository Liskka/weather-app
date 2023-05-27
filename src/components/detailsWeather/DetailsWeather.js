import { useEffect, useState } from "react";
import axios from "axios";

import sunCycle from '../../resources/img/sunCycle.png';
import './detailsWeather.scss';


const DetailsWeather = ({weather}) => {

  const {
        temp = 0,
        feelsLike = 0, 
        clouds = '', 
        humidity = 0, 
        pressure = 0, 
        windSpeed = '', 
        sunrise = '', 
        sunset = ''
  } = weather;

  const daylightMinutes = Number(sunset.slice(0, 2) * 60) + Number(sunset.slice(-2)) - Number(sunrise.slice(0, 2) * 60) - Number(sunrise.slice(-2));
  const daylightTime = (daylightMinutes / 60 | 0) + " ч " + daylightMinutes % 60 + " мин" ;

  return (
    <div className="details">
      <div className="details__header"><div className="details__text">Подробная информация:</div></div>
      <div className="details__item">
        <div className="description">Температура</div>
        <div className="info">{temp}{'\u00b0'}C</div>
      </div>
      <div className="details__item">
        <div className="description">Ощущается</div>
        <div className="info">{feelsLike}{'\u00b0'}C</div>
      </div>
      <div className="details__item">
        <div className="description">Облачность</div>
        <div className="info">{clouds}%</div>
      </div>
      <div className="details__item">
        <div className="description">Влажность</div>
        <div className="info">{humidity}%</div>
      </div>
      <div className="details__item">
        <div className="description">Давление</div>
        <div className="info">{pressure}мм</div>
      </div>
      <div className="details__item">
        <div className="description">Скорость ветра</div>
        <div className="info">{windSpeed}м/с</div>
      </div>
      <div className="details__sunCycle">
        <img src={sunCycle} alt="sunCycle" />
        <div className="details__descr">
          <div className="details__info">Восход</div>
          <div className="details__info">Световой день</div>
          <div className="details__info">Закат</div>
        </div>
        <div className="details__descr">
        <div className="details__info">{sunrise}</div>
        <div className="details__info">{daylightTime}</div>
        <div className="details__info">{sunset}</div>
        </div>
      </div>
    </div>
  )
}

export default DetailsWeather;