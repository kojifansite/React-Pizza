import ls from 'localstorage-slim';
import { CartItem } from 'redux/slices/cart/types';
import { calcTotalPrice } from './calcTotalPrice';

export const getCartFromLS = () => {
  const data = ls.get('cart');
  const items:any = data ? data : [];
  const totalPrice = calcTotalPrice(items);
  
  return {
    items: items as CartItem[],
    totalPrice,
  };
};