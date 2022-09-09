import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';
import { Link } from 'react-router-dom';
import { Pizza } from '../../redux/pizza/types';
import { selectCartItemById } from '../../redux/cart/selectors';
import { IconAdd } from '../icons';

const typeNames = ['тонкое', 'традиционное'];

export const PizzaBlock: React.FC<Pizza> = ({
  id,
  title,
  price,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();

  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem?.count || 0;

  const [firstType] = types;

  const [activeType, setActiveType] = useState(firstType);
  const [activeSize, setActiveSize] = useState(0);

  const onClickAdd = () => {
    const item: CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 1,
    };

    dispatch(addItem(item));
  };

  return (
    <div className="pizza-block">
      <Link to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{title}</h4>
      </Link>
      <div className="pizza-block__selector">
        <ul>
          {types.map((typeId) => (
            <li
              key={typeId}
              className={activeType === typeId ? 'active' : ''}
              onClick={() => setActiveType(typeId)}
            >
              {typeNames[typeId]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, i) => (
            <li
              key={size}
              className={activeSize === i ? 'active' : ''}
              onClick={() => setActiveSize(i)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={onClickAdd}
          className="button button--outline button--add"
        >
          <IconAdd />
          <span>Добавить</span>
          {addedCount > 0 && <i>{addedCount}</i>}
        </button>
      </div>
    </div>
  );
};
