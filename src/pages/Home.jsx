import { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import { pizzasApi } from '../api';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sortType, setSortType] = useState({
    name: 'популярные',
    sortProperty: 'rating',
    order: 'desc',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const getPizzas = async () => {
      setIsLoading(true);

      const sortBy = sortType.sortProperty;
      const order = sortType.order;

      const data = await pizzasApi.getPizzas(
        categoryId,
        sortBy,
        order,
        searchValue
      );

      setItems(data);
      setIsLoading(false);
    };

    getPizzas();
  }, [categoryId, sortType, searchValue]);

  const skeletons = [...Array(8)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);

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
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};

export default Home;
