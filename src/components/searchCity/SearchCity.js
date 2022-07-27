import { useEffect, useState, useContext } from "react";

import regionAndCities from '../../regionAndCities.json';
import { Context } from "../app/App";
import './searchCity.scss';


const SearchCity = ({setTogSearchCity}) => {

  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState();
  const [activeRegion, setActiveRegion] = useState('');

  const {setActiveCity} = useContext(Context);

  useEffect(() => {
    const region = regionAndCities.map(obl => obl.region);
    // console.log(region);
    setRegions(region);
  }, []);

  const targetCity = (region) => {
    const FullRegion = regionAndCities.find(FullRegion => FullRegion.region === region);
    setCities(FullRegion.cities);
    setActiveRegion(region);
  }

  const sumbitCity = (city) => {
    setActiveCity(city);
    setTogSearchCity(false);
  }

  // console.log(Object.keys(cities));

  return (
    <div className="searchPanel">
      <div className="searchPanel__info">
        Область: {activeRegion + (activeRegion ? ',' : '')}
        {activeRegion && 
          <div style={{display: 'inline-block', marginLeft: '15px'}}>Город: </div>  
        }
      </div>
      <div className="searchPanel__content">
        {!cities && regions.map(region => (
          <li 
            className="searchPanel__content__item" 
            key={region}
            onClick={() => targetCity(region)}
          >{region}</li>
        ))}
        
        {!!cities && Object.keys(cities).map(city => (
          <li 
          className="searchPanel__content__item" 
          key={city}
          onClick={() => sumbitCity(city)}
        >{city}</li>
        ))}
      </div>
    </div>
  )
}

export default SearchCity;