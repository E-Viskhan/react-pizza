import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pizzasApi } from '../../api';
import Skeleton from '../PizzaBlock/Skeleton';
import PizzaBlock from '../PizzaBlock';
import { setCountItems, setFilters } from '../../redux/slices/filterSlice';
import qs from 'qs';
import { pickBy } from 'lodash';
import { sortTypes } from '../Sort';

const PizzaItems = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isSearchReady = useRef(false);
  const isMounted = useRef(false);

  const categoryId = useSelector((state) => state.filter.categoryId);
  const searchValue = useSelector((state) => state.filter.searchValue);
  const sort = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  return <>{isLoading ? skeletons : pizzas}</>;
};

export default PizzaItems;
