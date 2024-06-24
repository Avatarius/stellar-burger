import { getIngredientsApi } from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const fetchIngredients = createAsyncThunk('ingredients/fetch', async () =>
  getIngredientsApi()
);

export { fetchIngredients };
