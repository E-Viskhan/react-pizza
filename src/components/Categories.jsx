const Categories = ({ value, onChangeCategory }) => {
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
          className={i === value ? 'active' : ''}
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
