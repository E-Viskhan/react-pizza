import ReactPagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import styles from './Pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { changePage } from '../../redux/slices/paginationSlice';

const Pagination = () => {
  const currentPage = useSelector((state) => state.pagination.currentPage);
  const count = useSelector((state) => state.pagination.countItems);
  const dispatch = useDispatch();

  return (
    <ReactPagination
      className={styles.pagination}
      onChange={(page) => dispatch(changePage(page))}
      current={currentPage}
      total={count}
      defaultPageSize={4}
      locale="ru_RU"
    />
  );
};

export default Pagination;
