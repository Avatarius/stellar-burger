import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunk/ingredients';

interface IngredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
}

const initialState: IngredientsState = {
  isLoading: false,
  ingredients: []
};

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
