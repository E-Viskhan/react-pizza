import React, { memo, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSort,
  setSort,
  sortBy,
  SortItem,
  sortName,
  sortOrder,
} from '../redux/slices/filterSlice';

export const sortTypes: SortItem[] = [
  { name: sortName.RATING, sortBy: sortBy.RATING, order: sortOrder.DESC },
  {
    name: sortName.EXPENSIVE_FIRST,
    sortBy: sortBy.PRICE,
    order: sortOrder.DESC,
  },
  { name: sortName.CHEAP_FIRST, sortBy: sortBy.PRICE, order: sortOrder.ASC },
  { name: sortName.ALPHABET, sortBy: sortBy.TITLE, order: sortOrder.DESC },
  {
    name: sortName.REVERSE_ALPHABET,
    sortBy: sortBy.TITLE,
    order: sortOrder.ASC,
  },
];

const Sort: React.FC = memo(() => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const sort = useSelector(selectSort);

  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (newSort: SortItem) => {
    if (!isEqual(newSort, sort)) {
      dispatch(setSort(newSort));
      setOpen(false);
    }
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (sortRef.current && !event.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', onClick);

    return () => document.body.removeEventListener('click', onClick);
  }, []);

  return (
    <div className="sort" ref={sortRef}>
      <div className="sort__label">
        <svg
          className={open ? 'rotate180' : ''}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
            fill="#2C2C2C"
          />
        </svg>
        <b>Сортировка:</b>
        <span onClick={() => setOpen(!open)}>{sort.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((value, i) => (
              <li
                key={i}
                className={sort.name === value.name ? 'active' : ''}
                onClick={() => onClickListItem(value)}
              >
                {value.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default Sort;