import { createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { fetchFeed } from '../thunk/feed';

interface IFeedState {
  orders: TOrder[];
  totalData: {
    total: number;
    totalToday: number;
  };
}

const initialState: IFeedState = {
  orders: [],
  totalData: {
    total: 0,
    totalToday: 0
  }
};

const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  selectors: {
    selectFeedOrders: (state) => state.orders,
    selectTotalData: (state) => state.totalData,
    selectFeed: (state) => state
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      state.orders = action.payload.orders;
      state.totalData.total = action.payload.total;
      state.totalData.totalToday = action.payload.totalToday;
    });
  }
});

const feedReducer = feedSlice.reducer;
const { selectFeedOrders, selectTotalData, selectFeed } = feedSlice.selectors;
const { clearFeed } = feedSlice.actions;

export {
  feedSlice,
  feedReducer,
  fetchFeed,
  selectFeedOrders,
  selectTotalData,
  selectFeed,
  clearFeed
};
