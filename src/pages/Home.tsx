import React, { useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import PizzaItems from '../components/PizzaItems';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        <PizzaItems />
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
