import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import clearIcon from '../../assets/img/close.svg';
import { useContext } from 'react';
import { AppContext } from '../../App';

const Search = (props) => {
  const { searchValue, setSearchValue } = useContext(AppContext);

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
