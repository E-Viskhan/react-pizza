import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { pizzasApi } from '../../api';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import { setCountItems } from '../../redux/slices/filterSlice';

const PizzaItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const sort = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const dispatch = useDispatch();

  const getPizzas = async () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty;
    const order = sort.order;
    const limit = 4;

    const data = await pizzasApi.getPizzas(
      categoryId,
      sortBy,
      order,
      searchValue,
      limit,
      currentPage
    );

    setItems(data.pizzas);
    dispatch(setCountItems(data.count));
    setIsLoading(false);
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort, currentPage, searchValue]);

  const skeletons = useMemo(
    () => [...Array(4)].map((_, i) => <Skeleton key={i} />),
    []
  );
  const pizzas = useMemo(
    () => items.map((item) => <PizzaBlock key={item.id} {...item} />),
    [items]
  );

  return <>{isLoading ? skeletons : pizzas}</>;
};

export default PizzaItems;
