import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '@api';
import { getCookie } from '../utils/cookie';

interface IOrderState {
  orders: TOrder[];
  request: boolean;
  newOrder: TOrder | null;
}

const initialState: IOrderState = {
  orders: [],
  request: false,
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
    clearNewOrder: (state) => {
      state.newOrder = null;
    },
    setOrderRequest: (state, action) => {
      state.request = action.payload;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectNewOrder: (state) => state.newOrder,
    selectOrderRequest: (state) => state.request
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.request = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.newOrder = action.payload.order;
        state.request = false;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.request = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});

const orderReducer = orderSlice.reducer;
const { selectOrders, selectNewOrder, selectOrderRequest } =
  orderSlice.selectors;
const { clearNewOrder, setOrderRequest } = orderSlice.actions;

export {
  orderReducer,
  clearNewOrder,
  setOrderRequest,
  fetchOrders,
  orderBurger,
  selectOrders,
  selectOrderRequest,
  selectNewOrder
};
