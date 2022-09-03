import React, { useEffect } from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Pagination from '../components/Pagination';
import PizzaItems from '../components/PizzaItems';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage } from '../redux/slices/filterSlice';

const Home: React.FC = () => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const countItems = useSelector((state: any) => state.pizza.countItems);

  const dispatch = useDispatch();

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

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
