import { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";

import regionAndCities from '../../regionAndCities.json';
import './searchCity.scss';


const SearchCity = ({setTogSearchCity, history}) => {

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState(null);
  const [activeRegion, setActiveRegion] = useState('');


  useEffect(() => {
    const region = regionAndCities.map(obl => obl.region);
    setRegions(region);
  }, []);

  const targetCity = (region) => {
    const FullRegion = regionAndCities.find(FullRegion => FullRegion.region === region);
    setCities(FullRegion.cities);
    setActiveRegion(region);
  }

  const sumbitCity = (city) => {
    setTogSearchCity(false);
    history.push({pathname: cities[city], state: {fetchName: cities[city]}});
  }

  const backToRegion = () => {
    setActiveRegion('');
    setCities(false);
  }

  return (
    <div className="searchPanel">
      <div className="searchPanel__header">
        <div 
          className="searchPanel__text" 
          onClick={() => backToRegion()}
        >
          Область: {activeRegion + (activeRegion ? ',' : '')}
          {activeRegion && 
            <div style={{display: 'inline-block', marginLeft: '15px'}}>Город: </div>  
          }
        </div>
      </div>
      <div className="searchPanel__content">
        {!cities && regions.map(region => (
          <li 
            className="searchPanel__item" 
            key={region}
            onClick={() => targetCity(region)}
          ><div className="searchPanel__item-text">{region}</div></li>
        ))}
        
        {cities && Object.keys(cities).map(city => (
          <li 
          className="searchPanel__item" 
          key={city}
          onClick={() => sumbitCity(city)}
        >{city}</li>
        ))}
      </div>
    </div>
  )
}

export default withRouter(SearchCity);