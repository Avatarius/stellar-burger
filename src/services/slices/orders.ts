import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchOrders } from '../thunk/orders';

interface IOrdersState {
  orders: TOrder[];
  request: boolean;
}

const initialState: IOrdersState = {
  orders: [],
  request: false
};

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
