import { useState } from 'react';
import DetailsWeather from '../detailsWeather/DetailsWeather';

import './currentWeather.scss';

const CurrentWeather = ({weather}) => {
  const {name, temp, info, icon, activeCity} = weather;
  const [details, setDetails] = useState(false);

  
  return (
    <div className='weather'>
      <div className="weather__city">Текущая температура в городе {name}:</div>
      <div className="weather__temp">{temp}{'\u00b0'}C</div>
      <img className="weather__icon" src={`https://openweathermap.org/img/w/${icon}.png`} alt="weather" />
      <div className="weather__info">{info}</div>
      <div className="weather__detail"
        onClick={() => setDetails(details => !details)}
      >
        Подробнее...
      </div>
      {details && <DetailsWeather activeCity={activeCity}/>}
    </div>
  )
}

export default CurrentWeather;


