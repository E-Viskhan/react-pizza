import ReactPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import React from 'react';

const Pagination: React.FC = () => {
  const currentPage = useSelector((state: any) => state.filter.currentPage);
  const count = useSelector((state: any) => state.pizza.countItems);
  const dispatch = useDispatch();

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

  return (
    <ReactPagination
      className={styles.pagination}
      onChange={onChangePage}
      current={currentPage}
      total={count}
      defaultPageSize={4}
    />
  );
};

export default Pagination;
