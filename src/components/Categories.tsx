import React, { memo } from 'react';

type CategoriesProps = {
  currentCatId: number;
  onChangeCategory: (idx: number) => void;
};

export const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

export const Categories: React.FC<CategoriesProps> = memo(
  ({ currentCatId, onChangeCategory }) => {
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
  }
);
