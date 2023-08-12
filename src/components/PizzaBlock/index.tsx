import classNames from 'classnames';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCartItemById } from 'redux/slices/cart/selectors';
import { addItem } from 'redux/slices/cart/slice';
import { CartItem } from 'redux/slices/cart/types';


const typeNames:string[] = ['тонкое', 'традиционное'];

interface PizzaBlockProps {
  title: string,
  price: number,
  imageUrl: string,
  sizes: number[],
  types: number[],
  id: string,
}

export const PizzaBlock:React.FC<PizzaBlockProps> = ({ title, price, imageUrl, sizes, types, id }) => {
  
  const [activeType, setActiveType] = React.useState<number>(0);
  const [activeSize, setActiveSize] = React.useState<number>(0);
  const cartItem = useSelector(selectCartItemById(id));
  const addedCount = cartItem ? cartItem.count : 0;

  const dispatch = useDispatch();

  const onClickAdd = () => {
    const item:CartItem = {
      id,
      title,
      price,
      imageUrl,
      type: typeNames[activeType],
      size: sizes[activeSize],
      count: 0,
    };
    dispatch(addItem(item));
  };
  return (
    <div className='pizza-block-wrapper'>
      <div className='pizza-block'>
      <Link to={`/pizza/${id}`}><img className='pizza-block__image' src={imageUrl} alt='Pizza' /></Link>
        <h4 className='pizza-block__title'>
          <Link to={`/pizza/${id}`}>{title}</Link>
        </h4>
        <div className='pizza-block__selector'>
          <ul>
            {types && 
              types.map((type) => (
                <li
                  key={typeNames[type]}
                  className={classNames({
                    active: activeType == type,
                  })}
                  onClick={() => {
                    setActiveType(type);
                  }}
                >
                  {typeNames[type]}
                </li>
              ))}
          </ul>
          <ul>
            {sizes &&
              sizes.map((item, i) => (
                <li
                  key={item}
                  className={classNames({
                    active: activeSize == i,
                  })}
                  onClick={() => {
                    setActiveSize(i);
                  }}
                >
                  {item} см.
                </li>
              ))}
          </ul>
        </div>
        <div className='pizza-block__bottom'>
          <div className='pizza-block__price'>от {price} ₽</div>
          <button
            className='button button--outline button--add'
            onClick={onClickAdd}
          >
            <svg
              width='12'
              height='12'
              viewBox='0 0 12 12'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z'
                fill='white'
              />
            </svg>
            <span>Добавить</span>
            {addedCount > 0 && <i>{addedCount}</i>}
          </button>
        </div>
      </div>
    </div>
  );
};
