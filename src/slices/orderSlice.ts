import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getFeedsApi } from '@api';

interface IOrderState {
  orders: TOrder[];
  isLoading: boolean;
}

const initialState: IOrderState = {
  orders: [],
  isLoading: false
};

const fetchFeed = createAsyncThunk('order/fetchAll', async () => getFeedsApi());

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {
    selectOrders: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
      });
  }
});

const orderReducer = orderSlice.reducer;
const { selectOrders } = orderSlice.selectors;

export { orderReducer, fetchFeed, selectOrders };
