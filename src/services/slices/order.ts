import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

interface IOrderState {
  data: TOrder | null;
  request: boolean;
}

const initialState: IOrderState = {
  data: null,
  request: false
};

const getOrderByNumber = createAsyncThunk(
  'order/getByNumber',
  async (orderNumber: number, { dispatch }) => {
    dispatch(clearOrder());
    return getOrderByNumberApi(orderNumber);
  }
);

const orderBurger = createAsyncThunk(
  'order/create',
  async (id_array: string[], { dispatch }) => {
    dispatch(clearOrder());
    const data = await orderBurgerApi(id_array);
    return data;
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.data = null;
    }
  },
  selectors: {
    selectOrder: (state) => state.data,
    selectRequest: (state) => state.request
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrderByNumber.pending, (state) => {
        state.request = true;
      })
      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.data = action.payload.orders[0];
        state.request = false;
      })
      .addCase(getOrderByNumber.rejected, (state) => {
        state.request = false;
      })
      .addCase(orderBurger.pending, (state) => {
        state.request = true;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.data = action.payload.order;
        state.request = false;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.request = false;
      });
  }
});

const orderReducer = orderSlice.reducer;
const { selectOrder, selectRequest } = orderSlice.selectors;
const { clearOrder } = orderSlice.actions;

export {
  orderSlice,
  clearOrder,
  orderBurger,
  orderReducer,
  selectOrder,
  selectRequest,
  getOrderByNumber
};
