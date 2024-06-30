import { expect, describe } from '@jest/globals';
import {
  burgerConstructorReducer,
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  clearConstructor
} from '../../src/services/slices/burgerConstructor';
import {
  burgerAfterDeleteState,
  burgerAfterReorderState,
  burgerFullState,
  newBun,
  newIngredient
} from '../test-constants';

jest.mock('uuid', () => ({ v4: () => '0000-0000-0000-0000' }));

describe('[burgerConstructorSlice]', () => {
  describe('Проверка обработки экшнов', () => {
    it('Добавление ингредиента в конструктор', () => {
      const newState = burgerConstructorReducer(
        burgerFullState,
        addToConstructor(newIngredient)
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual([
        ...burgerFullState.ingredients,
        { ...newIngredient, id: '0000-0000-0000-0000' }
      ]);
    });
    it('Изменение булки', () => {
      const newState = burgerConstructorReducer(
        burgerFullState,
        addToConstructor(newBun)
      );
      const { bun } = newState;
      expect(bun).toEqual({ ...newBun, id: '0000-0000-0000-0000' });
    });
    it('Удаление ингредиента из конструктора', () => {
      const newState = burgerConstructorReducer(
        burgerFullState,
        removeFromConstructor('0b5b267b-b544-45ba-9817-e3cb1ef5b372')
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual(burgerAfterDeleteState);
    });
    it('Изменение порядка ингредиентов в начинке;', () => {
      const newState = burgerConstructorReducer(
        burgerFullState,
        reorderConstructor({ indexA: 0, indexB: 1 })
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual(burgerAfterReorderState);
    });
    it('Очистка конструктора', () => {
      const newState = burgerConstructorReducer(
        burgerFullState,
        clearConstructor()
      );
      expect(newState).toEqual({ bun: null, ingredients: [] });
    });
  });
  afterAll(() => {
    jest.restoreAllMocks();
  });
});
