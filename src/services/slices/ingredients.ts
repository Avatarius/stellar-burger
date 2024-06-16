import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';

interface IngredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
}

const initialState: IngredientsState = {
  isLoading: false,
  ingredients: []
};
const fetchIngredients = createAsyncThunk('ingredients/fetch', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchIngredients.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

const ingredientsReducer = ingredientsSlice.reducer;
const { selectIngredients, selectIsLoading } = ingredientsSlice.selectors;

export {
  ingredientsSlice,
  ingredientsReducer,
  selectIngredients,
  selectIsLoading,
  fetchIngredients
};
