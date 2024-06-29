import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeed } from '../thunk/feed';

interface IFeedState {
  orders: TOrder[];
  total: number;
  totalToday: number;
}

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotalData: (state) => ({
      total: state.total,
      totalToday: state.totalToday
    }),
    selectFeed: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    });
  }
});

const feedReducer = feedSlice.reducer;
const { selectFeedOrders, selectTotalData, selectFeed } = feedSlice.selectors;
const { clearFeed } = feedSlice.actions;

export {
  initialState,
  feedSlice,
  feedReducer,
  selectFeedOrders,
  selectTotalData,
  selectFeed,
  clearFeed
};
