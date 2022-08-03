import { BrowserRouter as Router, Route } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import CurrentWeather from '../currentWeather/CurrentWeather';
import HomePage from '../../pages/HomePage/HomePage';

import allCity from '../../regionAndCities.json';

import WeatherFiveDays from '../weatherFiveDays/WeatherFiveDays';

// import decoration from '../../resources/img/lightTheme.jpg';
import '../../style/style.scss';




function App() {

  const cities = allCity.reduce((acc, region) => {
    return [...acc, ...Object.values(region.cities).filter(Boolean)];
  }, []);
  // console.log('cities = ', cities);
  

  return (
    <Router>
      <div className="container">
          <AppHeader />
          <Route exact path="/" component={HomePage} />
          {cities.map((city, i) => (
            <Route path={"/" + city} key={city + i} component={CurrentWeather} />
          ))}
      </div>
   </Router>
  );
}

export default App;
