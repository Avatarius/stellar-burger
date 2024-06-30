import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { v4 as uuidv4 } from 'uuid';

interface IBurgerConstructorState {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addToConstructor: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuidv4() }
      })
    },
    removeFromConstructor: (state, action) => {
      state.ingredients = state.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    reorderConstructor: (state, action) => {
      const { indexA, indexB } = action.payload;
      state.ingredients[indexA] = state.ingredients.splice(
        indexB,
        1,
        state.ingredients[indexA]
      )[0];
    },
    clearConstructor: () => initialState
  },
  selectors: {
    selectConstructorsItems: (state) => state
  }
});

const burgerConstructorReducer = burgerConstructorSlice.reducer;
const { selectConstructorsItems } = burgerConstructorSlice.selectors;
const {
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  clearConstructor
} = burgerConstructorSlice.actions;

export {
  initialState,
  burgerConstructorSlice,
  burgerConstructorReducer,
  selectConstructorsItems,
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  clearConstructor
};
