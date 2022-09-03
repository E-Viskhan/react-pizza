import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import React from 'react';

const Categories: React.FC = () => {
  const categoryId = useSelector((state: any) => state.filter.categoryId);
  const dispatch = useDispatch();

  const onChangeCategory = (i: number) => {
    dispatch(setCategoryId(i));
  };

  const categories: string[] = [
    'Все',
    'Мясные',
    'Вегетарианская',
    'Гриль',
    'Острые',
    'Закрытые',
  ];

  return (
    <ul className="categories">
      {categories.map((category, i) => (
        <li
          className={i === categoryId ? 'active' : ''}
          onClick={() => onChangeCategory(i)}
          key={i}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
