import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../redux/cart/slice';
import { CartItem } from '../../redux/cart/types';
import { Link } from 'react-router-dom';
import { Pizza } from '../../redux/pizza/types';
import { selectCartItemById } from '../../redux/cart/selectors';
import { IconAdd } from '../icons';
import { calcPriceFromSize, createPizzaIndex } from '../../utils';

const typeNames = ['тонкое', 'традиционное'];

export const PizzaBlock: React.FC<Pizza> = ({
  id,
  title,
  price: basePrice,
  imageUrl,
  sizes,
  types,
}) => {
  const dispatch = useDispatch();

  const [initialType] = types;
  const [initialSize] = sizes;

  const [activeType, setActiveType] = useState(initialType);
  const [activeSize, setActiveSize] = useState(initialSize);
  const [price, setPrice] = useState(basePrice);
  const [currentPizzaId, setCurrentPizzaId] = useState('');

  const cartItem = useSelector(selectCartItemById(currentPizzaId));
  const addedCount = cartItem?.count || 0;

  const onClickAdd = () => {
    const type = typeNames[activeType];

    const item: CartItem = {
      id: currentPizzaId,
      title,
      price,
      imageUrl,
      type,
      size: activeSize,
      count: 1,
    };

    dispatch(addItem(item));
  };

  useEffect(() => {
    setCurrentPizzaId(createPizzaIndex(title, activeType, activeSize));
  }, [activeSize, activeType, title, sizes]);

  useEffect(() => {
    setPrice(calcPriceFromSize(basePrice, activeSize));
  }, [activeSize, basePrice]);

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
          {sizes.map((size) => (
            <li
              key={size}
              className={activeSize === size ? 'active' : ''}
              onClick={() => setActiveSize(size)}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">{price} ₽</div>
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
