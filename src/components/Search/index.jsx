import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import clearIcon from '../../assets/img/close.svg';
import { useDispatch, useSelector } from 'react-redux';
import { changeSearchValue } from '../../redux/slices/filterSlice';

const Search = (props) => {
  const searchValue = useSelector((state) => state.filter.searchValue);
  const dispatch = useDispatch();

  return (
    <div className={styles.wrapper}>
      <img
        src={searchIcon}
        className={`${styles.icon} ${styles.searchIcon}`}
        alt=""
      />
      <input
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={searchValue}
        onChange={(e) => dispatch(changeSearchValue(e.target.value))}
      />
      {searchValue && (
        <img
          src={clearIcon}
          className={`${styles.icon} ${styles.clearIcon}`}
          onClick={() => dispatch(changeSearchValue(''))}
          alt="Кнопка очистки поля поиска"
        />
      )}
    </div>
  );
};

export default Search;
