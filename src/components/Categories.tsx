import React from 'react';

type CategoriesProps = {
  currentCatId: number;
  onChangeCategory: (idx: number) => void;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = ({
  currentCatId,
  onChangeCategory,
}) => {
  return (
    <ul className="categories">
      {categories.map((category, i) => (
        <li
          className={i === currentCatId ? 'active' : ''}
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
