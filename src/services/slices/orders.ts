import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi, getOrderByNumberApi } from '@api';

interface IOrderState {
  orders: TOrder[];
  request: boolean;
  currentOrder: TOrder | null;
  newOrder: TOrder | null;
}

const initialState: IOrderState = {
  orders: [],
  request: false,
  currentOrder: null,
  newOrder: null
};

const fetchOrders = createAsyncThunk('order/fetch', async () => getOrdersApi());

const orderBurger = createAsyncThunk(
  'order/create',
  async (id_array: string[]) => orderBurgerApi(id_array)
);

const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number, { dispatch }) => {
    dispatch(clearCurrentOrder());
    return getOrderByNumberApi(orderNumber);
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
    },
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setOrderRequest: (state, action) => {
      state.request = action.payload;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectCurrentOrder: (state) => state.currentOrder,
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
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.currentOrder = action.payload.orders[0];
      });
  }
});

const orderReducer = orderSlice.reducer;
const { selectOrders, selectCurrentOrder, selectNewOrder, selectOrderRequest } =
  orderSlice.selectors;
const { clearNewOrder, clearCurrentOrder, setOrderRequest } =
  orderSlice.actions;

export {
  orderSlice,
  orderReducer,
  clearNewOrder,
  setOrderRequest,
  fetchOrders,
  orderBurger,
  getOrderByNumber,
  selectOrders,
  selectOrderRequest,
  selectCurrentOrder,
  selectNewOrder
};
