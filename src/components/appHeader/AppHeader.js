import { useState } from 'react';
import SearchCity from '../searchCity/SearchCity';
import { useTheme } from '../../hooks/useTheme';

import { withRouter } from 'react-router-dom';

// import logoDay from '../../resources/img/pngegg.png';
// import logoNught from '../../resources/img/night.png';
import sunImg from '../../resources/icon/sun.png';
import moonImg from '../../resources/icon/moon.png';
import './appHeader.scss';




const AppHeader = ({history}) => {
  const [togSearchCity, setTogSearchCity] = useState(false);
  const {theme, setTheme} = useTheme();

  const sumbitTheme = (theme) => {
    setTheme(theme);
  }

  return (
    <>
      <div className="header">
        <div 
          className="header__logo" 
          onClick={() => {
            history.push({pathname: '/'});
            setTogSearchCity(false);
          }}
          style={{cursor: 'pointer'}}>
        </div>
        <div className="header__content">
          <div 
            className="header__selection"
            onClick={() => setTogSearchCity(togSearchCity => !togSearchCity)}
          >
            Выбрать город <span className="header__dropdown"></span>
          </div>
          <div className="sumbit-theme">
            <img 
              className={theme !== 'light' ? 'disabled-theme' : 'active-theme'}
              src={sunImg} alt="sun" 
              onClick={() => sumbitTheme('light')} 
            />
            <img 
              className={theme !== 'dark' ? 'disabled-theme' : 'active-theme'}
              src={moonImg} alt="moon" 
              onClick={() => sumbitTheme('dark')}
            />
          </div>
        </div>
      </div>
          {togSearchCity && <SearchCity setTogSearchCity={setTogSearchCity}/>}
    </>
  );
}

export default withRouter(AppHeader);