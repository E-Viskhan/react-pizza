import ReactPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';

const Pagination = () => {
  const currentPage = useSelector((state) => state.filter.currentPage);
  const count = useSelector((state) => state.filter.countItems);
  const dispatch = useDispatch();

  const onChangePage = (page) => dispatch(setCurrentPage(page));

  return (
    <ReactPagination
      className={styles.pagination}
      onChange={onChangePage}
      current={currentPage}
      total={count}
      defaultPageSize={4}
      locale="ru_RU"
    />
  );
};

export default Pagination;
