import { createAsyncThunk } from '@reduxjs/toolkit';
import API from 'api/api';
import { Pizza, SearchPizzaParams } from './types';

export const fetchPizzas = createAsyncThunk<Pizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async (params) => {
    const { curPage, category, sortBy, order, search } = params;
    const { data } = await API.get<Pizza[]>(
      `items?page=${curPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);