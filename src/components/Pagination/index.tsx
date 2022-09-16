import ReactPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import styles from './Pagination.module.scss';
import React from 'react';

type PaginationProps = {
  onChangePage: (page: number) => void;
  currentPage: number;
  count: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  onChangePage,
  currentPage,
  count,
}) => (
  <ReactPagination
    showTitle={false}
    className={styles.pagination}
    onChange={onChangePage}
    current={currentPage}
    total={count}
    defaultPageSize={4}
  />
);
