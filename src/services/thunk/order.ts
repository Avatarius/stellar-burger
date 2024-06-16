import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearOrder } from '../slices/order';
import { getOrderByNumberApi, orderBurgerApi } from '@api';

const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number, { dispatch }) => {
    dispatch(clearOrder());
    return getOrderByNumberApi(orderNumber);
  }
);

const orderBurger = createAsyncThunk(
  'order/create',
  async (id_array: string[], { dispatch }) => {
    dispatch(clearOrder());
    const data = await orderBurgerApi(id_array);
    return data;
  }
);

export { getOrderByNumber, orderBurger };
