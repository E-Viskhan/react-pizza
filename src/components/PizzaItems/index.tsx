import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initialSort, setFilters } from '../../redux/filter/slice';
import { isEmpty, pickBy } from 'lodash';
import { sortTypes } from '../Sort';
import { fetchPizzas } from '../../redux/pizza/slice';
import { useAppDispatch } from '../../redux/store';
import { selectPizzaData } from '../../redux/pizza/selectors';
import { selectFilter, selectSort } from '../../redux/filter/selectors';
import { PizzaBlock, Skeleton } from '../';
import { useQueryParams } from '../../hooks';
import { stringify } from '../../utils';

export const PizzaItems: React.FC = () => {
  const isSearchReady = useRef(false);
  const isMounted = useRef(false);

  const { items, status } = useSelector(selectPizzaData);
  const { categoryId, searchValue, currentPage } = useSelector(selectFilter);
  const sort = useSelector(selectSort);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const params = useQueryParams();

  const getPizzas = useCallback(async () => {
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
  }, [dispatch, categoryId, sort, searchValue, currentPage]);

  useEffect(() => {
    const search = window.location.search;

    if (!search || (search && isSearchReady.current)) {
      void getPizzas();
    }
  }, [getPizzas, categoryId, sort, currentPage, searchValue]);

  useEffect(() => {
    if (!isEmpty(params)) {
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
  }, [dispatch]);

  useEffect(() => {
    if (isMounted.current) {
      const params = pickBy({
        categoryId,
        currentPage,
        sortBy: sort.sortBy,
        order: sort.order,
      });

      const queryString = stringify(params);

      navigate(`?${queryString}`);
    } else {
      isMounted.current = true;
    }
  }, [navigate, categoryId, sort, currentPage]);

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
