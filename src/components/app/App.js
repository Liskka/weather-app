import axios from 'axios';
import { useEffect, useState, createContext } from 'react';
import AppHeader from '../appHeader/AppHeader';
import CurrentWeather from '../currentWeather/CurrentWeather';

import WeatherFiveDays from '../weatherFiveDays/WeatherFiveDays';

// import decoration from '../../resources/img/lightTheme.jpg';
import '../../style/style.scss';


export const Context = createContext('');

function App() {

  // useEffect(() => {
    const _apiBase = 'https://api.openweathermap.org/data/2.5/weather?';
    const _apiKey = 'a4d1d3041a0a7f472aafed3229a84bd1';
    const [weather, setWeather] = useState({});
    const [activeCity, setActiveCity] = useState('Zaporizhia');
    


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
    // console.log('data = ', data);
    return {
      name: data.name,
      temp: Math.round(data.main.temp - 273),
      info: data.weather[0].description,
      icon: data.weather[0].icon,
      activeCity
    }
  }


  return (
    <div className="app">
      <Context.Provider value={{activeCity, setActiveCity}} >
        <AppHeader />
        <CurrentWeather weather={weather} />
      </Context.Provider>


      <WeatherFiveDays/>
    </div>
  );
}

export default App;
