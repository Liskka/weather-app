import { useState } from 'react';
import SearchCity from '../searchCity/SearchCity';

import logoIcon from '../../resources/img/pngegg.png';
import './appHeader.scss';
import { withRouter } from 'react-router-dom';



const AppHeader = ({history}) => {
  const [togSearchCity, setTogSearchCity] = useState(false);


  return (
    <>
      <img 
        src={logoIcon} 
        alt="logo" 
        className="logo" 
        onClick={() => history.push({pathname: '/'})}
        style={{cursor: 'pointer'}}
      />
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

export default withRouter(AppHeader);