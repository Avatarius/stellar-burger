import { createSlice } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

interface IConstructorItems {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
}

export interface IngredientListState {
  isLoading: boolean;
  ingredients: TIngredient[];
  constructorItems: IConstructorItems;
}

const initialState: IngredientListState = {
  isLoading: false,
  ingredients: [],
  constructorItems: { bun: null, ingredients: [] }
};
const fetchBurgers = createAsyncThunk('burgers/fetch', async () =>
  getIngredientsApi()
);

const burgerSlice = createSlice({
  name: 'burgers',
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
      .addCase(fetchBurgers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchBurgers.fulfilled, (state, action) => {
        state.ingredients = action.payload;
      });
  }
});

const burgerReducer = burgerSlice.reducer;
const { selectIngredients, selectConstructorItems } = burgerSlice.selectors;
const { addToConstructor, removeFromConstructor } = burgerSlice.actions;

export {
  burgerReducer,
  selectIngredients,
  selectConstructorItems,
  addToConstructor,
  removeFromConstructor,
  fetchBurgers
};
