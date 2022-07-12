import { useDispatch, useSelector } from 'react-redux';
import { changeCategory } from '../redux/slices/filterSlice';

const Categories = () => {
  const categoryId = useSelector((state) => state.filter.categoryId);
  const dispatch = useDispatch();

  const categories = [
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
          onClick={() => dispatch(changeCategory(i))}
          key={i}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
