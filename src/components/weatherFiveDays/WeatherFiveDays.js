import { useEffect } from "react";
import axios from "axios";


const WeatherFiveDays = () => {

  const _apiBase = 'https://api.openweathermap.org/data/2.5/forecast?';
  const _apiKey = 'a4d1d3041a0a7f472aafed3229a84bd1';

  // //ПОЛУЧИТЬ ПОГОДУ НА 5 ДНЕЙ
  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       const {data} = await axios.get(`${_apiBase}q=${'zaporizhia'}&lang=ru&appid=${_apiKey}`);
  //       console.log('data = ', data.list);
  //       // setWeather(transformData(data));
  //     } catch (error) {
  //       alert('Ошибка при получении погоды');
  //     }

  //   }
    
  //   getData();
  // }, []);

  useEffect(() => {
    async function getData() {
      try {
        const {data} = await axios.get(`${_apiBase}q=${'zaporizhia'}&lang=ru&appid=${_apiKey}`);
        // console.log('data = ', data.list);
        // setWeather(transformData(data));
      } catch (error) {
        alert('Ошибка при получении погоды');
      }

    }
    
    getData();
  }, []);

  

  return (
    <div className="fivedays">

    </div>
  )
}

export default WeatherFiveDays;