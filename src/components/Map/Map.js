import { Link } from "react-router-dom";
import citiesInfo from './citiesInfo.json';

import'./map.scss';


const Map = () => {

  // console.log(citiesInfo)

  return (
    <div className="map__container">
      <div className="map__content">
        {citiesInfo.length ? citiesInfo.map(cityInfo => (
          <CityLink key={cityInfo.id} cityInfo={cityInfo} />
        )) : null}
      </div>
    </div>
  )
}


const CityLink = ({cityInfo}) => {

  const {position: {top, left}} = cityInfo;
  
  return (
    <Link className="cityLink" to={{pathname: cityInfo.fetchName, state: {fetchName: cityInfo.fetchName}}} style={{position: "absolute", top: String(top), left: String(left)}} >{cityInfo.name}</Link>
    )
}


export default Map;