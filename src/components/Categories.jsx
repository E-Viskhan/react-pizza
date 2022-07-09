import { useState } from 'react';

const Categories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
          className={i === activeIndex ? 'active' : ''}
          onClick={() => setActiveIndex(i)}
          key={i}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default Categories;
