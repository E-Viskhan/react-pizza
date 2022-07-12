import ReactPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, onPageChange, count }) => {
  return (
    <ReactPagination
      className={styles.pagination}
      onChange={onPageChange}
      current={currentPage}
      total={count}
      defaultPageSize={4}
      locale="ru_RU"
    />
  );
};

export default Pagination;
