import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

interface IngredientsState {
  isLoading: boolean;
  ingredients: TIngredient[];
  constructorItems: IConstructorItems;
}

const initialState: IngredientsState = {
  isLoading: false,
  ingredients: [],
  constructorItems: { bun: null, ingredients: [] }
};
const fetchIngredients = createAsyncThunk('ingredients/fetch', async () =>
  getIngredientsApi()
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    addToConstructor: (state, action) => {
      action.payload.type === 'bun'
        ? (state.constructorItems.bun = action.payload)
        : state.constructorItems.ingredients.push({
            ...action.payload,
            id: uuidv4()
          });
    },
    removeFromConstructor: (state, action) => {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (item) => item.id !== action.payload.id
        );
    }
  },
  selectors: {
    selectIngredients: (state) => state.ingredients,
    selectConstructorItems: (state) => state.constructorItems
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      });
  }
});

const ingredientsReducer = ingredientsSlice.reducer;
const { selectIngredients, selectConstructorItems } =
  ingredientsSlice.selectors;
const { addToConstructor, removeFromConstructor } = ingredientsSlice.actions;

export {
  ingredientsReducer,
  selectIngredients,
  selectConstructorItems,
  addToConstructor,
  removeFromConstructor,
  fetchIngredients
};
