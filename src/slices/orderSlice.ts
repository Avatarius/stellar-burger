import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '@api';
import { getCookie } from '../utils/cookie';

interface IOrderState {
  orders: TOrder[];
  orderRequest: boolean;
  newOrder: TOrder | null;
}

const initialState: IOrderState = {
  orders: [],
  orderRequest: false,
  newOrder: null
};

const fetchOrders = createAsyncThunk('order/fetch', async () => getOrdersApi());

const orderBurger = createAsyncThunk(
  'order/create',
  async (id_array: string[]) => orderBurgerApi(id_array)
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.orderRequest = action.payload;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectNewOrder: (state) => state.newOrder,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.newOrder = action.payload.order;
      });
  }
});

const orderReducer = orderSlice.reducer;
const { selectOrders, selectNewOrder, selectOrderRequest } =
  orderSlice.selectors;
const { setOrderRequest } = orderSlice.actions;

export {
  orderReducer,
  fetchOrders,
  orderBurger,
  selectOrders,
  selectOrderRequest,
  selectNewOrder,
  setOrderRequest
};
