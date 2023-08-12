import React from 'react';

export const NotFoundBlock:React.FC = () => {
  return (
    <>
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className='description'>
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </>
  );
};
