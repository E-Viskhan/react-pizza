import React, { memo, useEffect, useRef, useState } from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../redux/filter/slice';
import { sortBy, SortItem, sortName, sortOrder } from '../redux/filter/types';
import { selectSort } from '../redux/filter/selectors';
import { IconArrow } from './icons';

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

export const Sort: React.FC = memo(() => {
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
        <IconArrow className={open ? 'rotate180' : ''} />
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
