import axios from 'axios';
import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

interface Pizza {
  imageUrl: string;
  title: string;
  price: number;
}

const FullPizza: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [fullPizza, setFullPizza] = React.useState<Pizza>();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://63150049fa82b738f7520d84.mockapi.io/items/${id}`,
        );
        setFullPizza(data);
      } catch (error) {
        alert('Такой пиццы не найдено!');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!fullPizza) {
    return <>Загрузка...</>;
  }
  return (
    <div className='container'>
      <img src={fullPizza.imageUrl} />
      <h2>{fullPizza.title}</h2>
      <h4>{fullPizza.price} ₽</h4>
      <Link to='/'>
        <button className='button button--outline button--add'>
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};

export default FullPizza;
