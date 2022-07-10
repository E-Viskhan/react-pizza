import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { pizzasApi } from '../api';

const Home = (props) => {
  const [pizzas, setPizzas] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярные',
    sortProperty: 'rating',
    order: 'desc',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getPizzas = async () => {
      setIsLoading(true);

      const sortBy = sortType.sortProperty;
      const order = sortType.order;

      const data = await pizzasApi.getPizzas(categoryId, sortBy, order);

      setPizzas(data);
      setIsLoading(false);
    };

    getPizzas();
  }, [categoryId, sortType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(id) => setCategoryId(id)}
        />
        <Sort
          value={sortType}
          onChangeSort={(sortType) => setSortType(sortType)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...Array(8)].map((_, i) => <Skeleton key={i} />)
          : pizzas.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
