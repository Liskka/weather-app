import { useState } from 'react';
import SearchCity from '../searchCity/SearchCity';

import logoIcon from '../../resources/img/pngegg.png';
import './appHeader.scss';



const AppHeader = () => {
  const [togSearchCity, setTogSearchCity] = useState(false);


  return (
    <>
      <img src={logoIcon} alt="logo" className="logo" />
      <div className="header">
        <div className="header__content">
          <div 
            className="header__selection"
            onClick={() => setTogSearchCity(togSearchCity => !togSearchCity)}
          >
            Выбрать город
          </div>
        </div>
      </div>
          {togSearchCity && <SearchCity setTogSearchCity={setTogSearchCity}/>}
    </>
  );
}

export default AppHeader;