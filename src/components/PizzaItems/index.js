import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';
import { pizzasApi } from '../../api';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import { changePage, setCountItems } from '../../redux/slices/paginationSlice';

const PizzaItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const sortType = useSelector((state) => state.filter.sortType);
  const currentPage = useSelector((state) => state.pagination.currentPage);

  const dispatch = useDispatch();

  const getPizzas = async () => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty;
    const order = sortType.order;
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
  }, [categoryId, sortType, currentPage]);

  useEffect(() => {
    currentPage === 1 ? getPizzas() : dispatch(changePage(1));
  }, [searchValue]);

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
