import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './scss/app.scss';
import MainLayout from './layouts/MainLayout';
import { lazy, Suspense } from 'react';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound')
);

const App = () => {
  return (
    <Suspense fallback={<div>Идет загрузка...</div>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
