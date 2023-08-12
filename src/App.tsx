import React, { Suspense } from 'react';
import Loadable from 'react-loadable';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';

const Cart = Loadable({
  loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
  loading: () => <div>Идёт загрузка корзины...</div>,
});

// const Cart = React.lazy(()=> import(/* webpackChunkName: "Cart" */'pages/Cart'));
const FullPizza = React.lazy(()=> import(/* webpackChunkName: "FullPizza" */'pages/FullPizza'));
const NotFound = React.lazy(()=> import(/* webpackChunkName: "NotFound" */'pages/NotFound'));

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart' element={<Suspense fallback={'Идет загрузка корзины...'}><Cart /></Suspense>} />
        <Route path='pizza/:id' element={<Suspense fallback={'Идет загрузка...'}><FullPizza /></Suspense>} />
        <Route path='*' element={<Suspense fallback={'Идет загрузка...'}><NotFound /></Suspense>} />
      </Route>
    </Routes>
  );
};

export default App;
