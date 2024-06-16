import { getOrdersApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchOrders = createAsyncThunk('order/fetch', async () => getOrdersApi());

export { fetchOrders };
