import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import { setFilters } from '../../redux/slices/filterSlice';
import qs from 'qs';
import { pickBy } from 'lodash';
import { sortTypes } from '../Sort';
import { fetchPizzas } from '../../redux/slices/pizzaSlice';

const PizzaItems = () => {
  const isSearchReady = useRef(false);
  const isMounted = useRef(false);

  const items = useSelector((state) => state.pizza.items);
  const status = useSelector((state) => state.pizza.status);
  const categoryId = useSelector((state) => state.filter.categoryId);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const sort = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
    const sortBy = sort.sortProperty;
    const order = sort.order;
    const limit = 4;

    dispatch(
      fetchPizzas({
        categoryId,
        sortBy,
        order,
        searchValue,
        limit,
        currentPage,
      })
    );
  };

  useEffect(() => {
    const search = window.location.search;

    if (!search || (search && isSearchReady.current)) {
      getPizzas();
    }
  }, [categoryId, sort, currentPage, searchValue]);

  useEffect(() => {
    const search = window.location.search;

    if (search) {
      const params = qs.parse(search, { ignoreQueryPrefix: true });
      const sort = sortTypes.find(
        (sort) =>
          sort.sortProperty === params.sortProperty &&
          sort.order === params.order
      );

      const filters = {
        currentPage: params.currentPage,
        categoryId: params.categoryId,
        sort,
      };

      dispatch(setFilters(filters));
      isSearchReady.current = true;
    }
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify(
        pickBy({
          categoryId,
          currentPage,
          sortProperty: sort.sortProperty,
          order: sort.order,
        })
      );

      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }
  }, [categoryId, sort, currentPage]);

  const skeletons = useMemo(
    () => [...Array(4)].map((_, i) => <Skeleton key={i} />),
    []
  );
  const pizzas = useMemo(
    () => items.map((item) => <PizzaBlock key={item.id} {...item} />),
    [items]
  );

  if (status === 'error') {
    return (
      <div className="content__error-info">
        <h2>Произошла ошибка 😕</h2>
        <p>
          Произошла ошибка и мы уже занимаемся данной проблемой. Извините за
          неудобства.
        </p>
      </div>
    );
  }

  return <>{status === 'loading' ? skeletons : pizzas}</>;
};

export default PizzaItems;
