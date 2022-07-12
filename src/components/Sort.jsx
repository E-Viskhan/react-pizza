import { useState } from 'react';
import { isEqual } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { changeSortType } from '../redux/slices/filterSlice';

const Sort = (props) => {
  const [open, setOpen] = useState(false);
  const sortType = useSelector((state) => state.filter.sortType);
  const dispatch = useDispatch();

  const sortTypes = [
    { name: 'популярные', sortProperty: 'rating', order: 'desc' },
    { name: 'сначала дорогие', sortProperty: 'price', order: 'desc' },
    { name: 'сначала доступные', sortProperty: 'price', order: 'asc' },
    { name: 'от А до Я', sortProperty: 'title', order: 'asc' },
    { name: 'от Я до А', sortProperty: 'title', order: 'desc' },
  ];

  const onClickListItem = (value) => {
    if (!isEqual(value, sortType)) {
      dispatch(changeSortType(value));
      setOpen(false);
    }
  };

  return (
    <div className="sort">
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
        <span onClick={() => setOpen(!open)}>{sortType.name}</span>
      </div>
      {open && (
        <div className="sort__popup">
          <ul>
            {sortTypes.map((value, i) => (
              <li
                key={i}
                className={sortType.name === value.name ? 'active' : ''}
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
};

export default Sort;
