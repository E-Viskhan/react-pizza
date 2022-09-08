import { useSelector } from 'react-redux';
import React, { useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialSort, setFilters } from '../../redux/filter/slice';
import qs from 'qs';
import { pickBy } from 'lodash';
import { sortTypes } from '../Sort';
import { fetchPizzas } from '../../redux/pizza/slice';
import { useAppDispatch } from '../../redux/store';
import { selectPizzaData } from '../../redux/pizza/selectors';
import { selectFilter, selectSort } from '../../redux/filter/selectors';
import { Skeleton, PizzaBlock } from '../';

export const PizzaItems: React.FC = () => {
  const isSearchReady = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, searchValue, currentPage } = useSelector(selectFilter);
  const sort = useSelector(selectSort);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getPizzas = async () => {
    const sortBy = sort.sortBy;
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
      void getPizzas();
    }
  }, [categoryId, sort, currentPage, searchValue]);

  useEffect(() => {
    const search = window.location.search;

    if (search) {
      const params = qs.parse(search, { ignoreQueryPrefix: true });
      const sort = sortTypes.find(
        (sort) => sort.sortBy === params?.sortBy && sort.order === params?.order
      );

      const filters = {
        currentPage: Number(params.currentPage) || 1,
        categoryId: Number(params.categoryId) || 0,
        sort: sort || initialSort,
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
          sortBy: sort.sortBy,
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
