import { expect, describe } from '@jest/globals';
import {
  burgerConstructorReducer,
  addToConstructor,
  removeFromConstructor,
  reorderConstructor,
  clearConstructor
} from '../src/services/slices/burgerConstructor';
import { burgerFullState } from '../src/utils/test-constants';

jest.mock('uuid', () => ({ v4: () => '0000-0000-0000-0000' }));

describe('[burgerConstructorSlice]', () => {

  describe('Проверка обработки экшнов', () => {
    it('Добавление ингредиента в конструктор', () => {
      const newIngredient = {
        _id: '643d69a5c3f7b9001cfa0940',
        name: 'Говяжий метеорит (отбивная)',
        type: 'main',
        proteins: 800,
        fat: 800,
        carbohydrates: 300,
        calories: 2674,
        price: 3000,
        image: 'https://code.s3.yandex.net/react/code/meat-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
        __v: 0
      };
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
      const newBun = {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      };
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
      expect(ingredients).toEqual([
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          id: '04124f1f-87af-485e-aae5-a58b024aaba1'
        }
      ]);
    });
    it('Изменение порядка ингредиентов в начинке;', () => {
      const newState = burgerConstructorReducer(
        burgerFullState,
        reorderConstructor({ indexA: 0, indexB: 1 })
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual([
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0,
          id: '04124f1f-87af-485e-aae5-a58b024aaba1'
        },
        {
          _id: '643d69a5c3f7b9001cfa0941',
          name: 'Биокотлета из марсианской Магнолии',
          type: 'main',
          proteins: 420,
          fat: 142,
          carbohydrates: 242,
          calories: 4242,
          price: 424,
          image: 'https://code.s3.yandex.net/react/code/meat-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-01-large.png',
          __v: 0,
          id: '0b5b267b-b544-45ba-9817-e3cb1ef5b372'
        }
      ]);
    });
    it('Очистка конструктора', () => {
      const newState = burgerConstructorReducer(
        burgerFullState,
        clearConstructor()
      );
      expect(newState).toEqual({ bun: null, ingredients: [] });
    });
  });
});
