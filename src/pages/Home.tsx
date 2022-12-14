import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/filter/slice';
import { RootState } from '../redux/store';
import { Categories, Pagination, PizzaItems, Sort } from '../components';

const Home: React.FC = () => {
  const categoryId = useSelector((state: RootState) => state.filter.categoryId);
  const currentPage = useSelector(
    (state: RootState) => state.filter.currentPage
  );
  const countItems = useSelector((state: RootState) => state.pizza.countItems);

  const dispatch = useDispatch();

  const onChangeCategory = useCallback(
    (idx: number) => {
      dispatch(setCategoryId(idx));
    },
    [dispatch]
  );

  const onChangePage = useCallback(
    (page: number) => dispatch(setCurrentPage(page)),
    [dispatch]
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          onChangeCategory={onChangeCategory}
          currentCatId={categoryId}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        <PizzaItems />
      </div>
      <Pagination
        onChangePage={onChangePage}
        currentPage={currentPage}
        count={countItems}
      />
    </div>
  );
};

export default Home;
