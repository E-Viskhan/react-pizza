import styles from './NotFoundBlock.module.scss';
import React from 'react';

export const NotFoundBlock: React.FC = () => (
  <div className={styles.root}>
    <h1>
      <span>😕</span>
      <h1>Ничего не найдено</h1>
    </h1>
    <p className={styles.description}>
      К сожалению, такой страницы нет в нашем интернет-магазине
    </p>
  </div>
);
