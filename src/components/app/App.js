import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import AppHeader from '../appHeader/AppHeader';
import CurrentWeather from '../currentWeather/CurrentWeather';
import HomePage from '../../pages/HomePage/HomePage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

import allCity from '../../regionAndCities.json';

import '../../style/style.scss';




function App() {

  const cities = allCity.reduce((acc, region) => {
    return [...acc, ...Object.values(region.cities).filter(Boolean)];
  }, []);
  

  return (
    <Router>
      <div className="container">
          <AppHeader />
          <Switch>
            <Route exact path="/" component={HomePage} />
            {cities.map((city, i) => (
              <Route path={"/" + city} key={city + i} component={CurrentWeather} />
            ))}
            <Route path="/error" component={NotFoundPage} />
            <Redirect to="/error" />
          </Switch>
      </div>
   </Router>
  );
}

export default App;
