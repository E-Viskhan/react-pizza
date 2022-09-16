import logoSvg from '../assets/img/pizza-logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { setCart } from '../redux/cart/slice';
import { CartSliceState } from '../redux/cart/types';
import { selectCart } from '../redux/cart/selectors';
import { useEffect, useRef } from 'react';
import { useAppDispatch } from '../redux/store';
import { Search } from './';
import { IconCart } from './icons';
import { initialState, setFilters } from '../redux/filter/slice';

export const Header = () => {
  const { items, totalPrice } = useSelector(selectCart);

  const isFirstRender = useRef(true);

  const dispatch = useAppDispatch();

  const totalCount = items.reduce((sum: number, item) => sum + item.count, 0);

  const clearFilters = () => {
    dispatch(setFilters(initialState));
  };

  useEffect(() => {
    if (!isFirstRender.current) {
      const cartString = JSON.stringify({ items, totalPrice });
      localStorage.setItem('cart', cartString);
    }

    isFirstRender.current = false;
  }, [items, totalPrice]);

  useEffect(() => {
    const cartString = localStorage.getItem('cart');

    if (cartString) {
      const cart: CartSliceState = JSON.parse(cartString);
      dispatch(setCart(cart));
    }
  }, []);

  return (
    <div className="header">
      <div className="container">
        <div className="header__wrapper">
          <Link onClick={clearFilters} to="/" className="header__link">
            <div className="header__logo">
              <img width="38" src={logoSvg} alt="Pizza logo" />
              <div>
                <h1>React Pizza</h1>
                <p>самая вкусная пицца во вселенной</p>
              </div>
            </div>
          </Link>
          <Search />
        </div>
        <div className="header__cart">
          <Link to="/cart" className="button button--cart">
            <span>{totalPrice} ₽</span>
            <div className="button__delimiter"></div>
            <IconCart />
            <span>{totalCount}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
