import { useDispatch } from 'react-redux';
import { addItem, minusItem, removeItem } from '../redux/cart/slice';
import React from 'react';
import { CartItem } from '../redux/cart/types';
import { IconCancel, IconMinus, IconPlus } from './icons';

type CartItemBlockProps = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number;
  type: string;
  count: number;
};

export const CartItemBlock: React.FC<CartItemBlockProps> = ({
  id,
  title,
  price,
  imageUrl,
  size,
  type,
  count,
}) => {
  const dispatch = useDispatch();

  const onClickPlus = () => {
    dispatch(addItem({ id } as CartItem));
  };

  const onClickMinus = () => {
    dispatch(minusItem(id));
  };

  const onClickRemove = () => {
    if (window.confirm('Ты точно хочешь удалить товар из корзины?')) {
      dispatch(removeItem(id));
    }
  };

  return (
    <div key={id} className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>
          {type}&nbsp;тесто, {size}&nbsp;см.
        </p>
      </div>
      <div className="cart__item-wrapper">
        <div className="cart__item-count">
          <button
            disabled={count === 1}
            onClick={onClickMinus}
            className="button button--outline button--circle cart__item-count-minus"
          >
            <IconMinus />
          </button>
          <b>{count}</b>
          <button
            onClick={onClickPlus}
            className="button button--outline button--circle cart__item-count-plus"
          >
            <IconPlus />
          </button>
        </div>
        <div className="cart__item-price">
          <b>{price * count}&nbsp;₽</b>
        </div>
        <div className="cart__item-remove">
          <div
            onClick={onClickRemove}
            className="button button--outline button--circle cart__item-remove-btn"
          >
            <IconCancel />
          </div>
        </div>
      </div>
    </div>
  );
};
