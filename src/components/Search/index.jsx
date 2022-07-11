import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import clearIcon from '../../assets/img/close.svg';

const Search = ({ searchValue, setSearchValue }) => {
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
        onChange={(e) => setSearchValue(e.target.value)}
      />
      {searchValue && (
        <img
          src={clearIcon}
          className={`${styles.icon} ${styles.clearIcon}`}
          onClick={() => setSearchValue('')}
          alt="Кнопка очистки поля поиска"
        />
      )}
    </div>
  );
};

export default Search;
