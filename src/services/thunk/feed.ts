import { createAsyncThunk } from '@reduxjs/toolkit';
import { clearFeed } from '../slices/feed';
import { getFeedsApi } from '@api';

const fetchFeed = createAsyncThunk(
  'order/fetchAll',
  async (_, { dispatch }) => {
    dispatch(clearFeed());
    const data = await getFeedsApi();
    return data;
  }
);

export { fetchFeed };
