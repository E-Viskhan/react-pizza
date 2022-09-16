import styles from './Search.module.scss';
import searchIcon from '../../assets/img/search.svg';
import clearIcon from '../../assets/img/close.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';
import React, { useCallback, useRef, useState } from 'react';
import { debounce } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';

export const Search: React.FC = () => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const inputEl = useRef<HTMLInputElement>(null);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputEl.current?.focus();
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchValue(e.target.value);
    setValue(e.target.value);
  };

  const updateSearchValue = useCallback(
    debounce((str: string) => {
      if (pathname !== '/') {
        navigate('/');
      }

      dispatch(setSearchValue(str));
    }, 500),
    []
  );

  return (
    <div className={styles.wrapper}>
      <img
        src={searchIcon}
        className={`${styles.icon} ${styles.searchIcon}`}
        alt=""
      />
      <input
        ref={inputEl}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
        onChange={onChangeInput}
      />
      {value && (
        <img
          src={clearIcon}
          className={`${styles.icon} ${styles.clearIcon}`}
          onClick={onClickClear}
          alt="Кнопка очистки поля поиска"
        />
      )}
    </div>
  );
};
