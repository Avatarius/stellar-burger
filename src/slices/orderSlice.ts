import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

interface IOrderTotal {
  total: number;
  totalToday: number;
}

interface IOrderState {
  orders: TOrder[];
  totalData: IOrderTotal;
  isLoading: boolean;
}

const initialState: IOrderState = {
  orders: [],
  totalData: { total: 0, totalToday: 0 },
  isLoading: false
};

const fetchFeed = createAsyncThunk('order/fetchAll', async () => getFeedsApi());

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.totalData = { total: 0, totalToday: 0 };
      state.isLoading = false;
    }
  },
  selectors: {
    selectOrders: (state) => state.orders,
    selectTotalData: (state) => state.totalData
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.totalData = {
          total: action.payload.total,
          totalToday: action.payload.totalToday
        };
      });
  }
});

const orderReducer = orderSlice.reducer;
const { selectOrders, selectTotalData } = orderSlice.selectors;
const { clearOrders } = orderSlice.actions;

export { orderReducer, fetchFeed, selectOrders, selectTotalData, clearOrders };
