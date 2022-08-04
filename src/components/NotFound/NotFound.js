import React from 'react';

import './notFound.scss';


const NotFound = () => {
  return (
      <div className='not-found'>
        <h1>
          <span>😕</span>
          <br />
          404
        </h1>
        <p className='not-found__text'>К сожалению данная страница отсутствует</p>
      </div>
  )
}

export default NotFound;