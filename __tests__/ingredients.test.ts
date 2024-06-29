import { expect, describe } from '@jest/globals';
import {initialState, ingredientsReducer} from '../src/services/slices/ingredients';
import {fetchIngredients} from '../src/services/thunk/ingredients';
import { ingredientsFullState } from '../src/utils/test-constants';

describe('[IngredientsSlice]', () => {
  describe('Проверка асинхронных экшнов', () => {
    it('Получение ингредиентов / Request', () => {
      const newState = ingredientsReducer(initialState, {type: fetchIngredients.pending.type});
      const {isLoading} = newState;
      expect(isLoading).toBe(true);
    });
    it('Получение ингредиентов / Success', () => {
      const newState = ingredientsReducer(initialState, {type: fetchIngredients.fulfilled.type, payload: ingredientsFullState});
      const {ingredients, isLoading} = newState;
      expect(ingredients).toEqual(ingredientsFullState);
      expect(isLoading).toBe(false);
    });
    it('Получение ингредиентов / Failed', () => {
      const newState = ingredientsReducer(initialState, {type: fetchIngredients.rejected.type});
      const {isLoading} = newState;
      expect(isLoading).toBe(false);
    });
  });
});
