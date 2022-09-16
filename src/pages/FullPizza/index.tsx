import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pizzasApi } from '../../api';
import styles from './FullPizza.module.scss';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getPizza = async () => {
      try {
        if (id) {
          const { data } = await pizzasApi.getPizzaById(id);
          setPizza(data);
        }
      } catch (e) {
        alert('Произошла ошибка при получении пиццы.');
        navigate('/');
      }
    };

    getPizza();
  }, []);

  if (!pizza) {
    return <span>Загрузка...</span>;
  }

  return (
    <div className={styles.container}>
      <img className={styles.img} src={pizza.imageUrl} alt="" />
      <div className={styles.info}>
        <h2 className={styles.title}>{pizza.title}</h2>
        <p className={styles.desc}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Accusantium alias consequatur cum cumque, eos fugiat maiores maxime,
            minima nihil nobis numquam quo ratione tenetur.
          </p>
          <br />
          <p>
            Architecto aut minus nulla odio ut? Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Asperiores culpa praesentium quia?
            Autem cupiditate dolorem dolores eum labore rem similique. Accusamus
            aliquid fuga fugit impedit, labore nam natus rem soluta.
          </p>
        </p>
        <h4 className={styles.price}>От {pizza.price} ₽</h4>
      </div>
    </div>
  );
};

export default FullPizza;
