import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pizzasApi } from '../api';

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
        const data: any = await pizzasApi.getPizzaById(id);
        setPizza(data);
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
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.title}</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus
        cumque molestiae odio quasi vitae. Accusamus deserunt dolor ea eaque
        error explicabo fuga ipsa, ipsum necessitatibus nemo nesciunt nihil non,
        optio quae, quas quo quod similique suscipit tenetur ut? Atque dolorem
        eaque eligendi eveniet facere, iste itaque possimus ullam unde voluptas.
      </p>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
