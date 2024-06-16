import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';

interface IOrdersState {
  orders: TOrder[];
  request: boolean;
}

const initialState: IOrdersState = {
  orders: [],
  request: false
};

const fetchOrders = createAsyncThunk('order/fetch', async () => getOrdersApi());

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrderRequest: (state, action) => {
      state.request = action.payload;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectOrdersRequest: (state) => state.request
  },
  extraReducers: (builder) => {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
  }
});

const orderReducer = ordersSlice.reducer;
const { selectOrders, selectOrdersRequest } = ordersSlice.selectors;
const { setOrderRequest } = ordersSlice.actions;

export {
  ordersSlice,
  orderReducer,
  setOrderRequest,
  fetchOrders,
  selectOrders,
  selectOrdersRequest
};
