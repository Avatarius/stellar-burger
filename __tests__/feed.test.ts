import { expect, describe } from '@jest/globals';
import { clearFeed, feedReducer } from '../src/services/slices/feed';
import { configureStore } from '@reduxjs/toolkit';
import { fetchFeed } from '../src/services/thunk/feed';

describe('[FeedSlice]', () => {
  const initialState = {
    orders: [
      {
        _id: '667dd974856777001bb1e5a0',
        ingredients: [
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный фалленианский бургер',
        createdAt: '2024-06-27T21:28:20.849Z',
        updatedAt: '2024-06-27T21:28:21.238Z',
        number: 44518
      },
      {
        _id: '667dcc0d856777001bb1e580',
        ingredients: [
          '643d69a5c3f7b9001cfa093c',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0947',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093c'
        ],
        status: 'done',
        name: 'Краторный минеральный фалленианский антарианский бургер',
        createdAt: '2024-06-27T20:31:09.170Z',
        updatedAt: '2024-06-27T20:31:09.592Z',
        number: 44517
      },
      {
        _id: '667dcb35856777001bb1e57e',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0944',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa0946',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Традиционный-галактический флюоресцентный минеральный бургер',
        createdAt: '2024-06-27T20:27:33.645Z',
        updatedAt: '2024-06-27T20:27:34.261Z',
        number: 44516
      }
    ],
    totalData: {
      total: 44144,
      totalToday: 106
    }
  };
  describe('Проверка обработки экшнов', () => {
    it('Очистка ленты', () => {
      const newState = feedReducer(initialState, clearFeed());
      const { orders } = newState;
      expect(orders).toEqual([]);
    });
  });
  describe('Проверка селекторов', () => {});
  describe('Проверка асинхронных экшнов', () => {
    it('Получение списка недавних заказов', async () => {
      const expectedResult = {
        orders: [
          {
            _id: '667dd974856777001bb1e5a0',
            ingredients: [
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Флюоресцентный фалленианский бургер',
            createdAt: '2024-06-27T21:28:20.849Z',
            updatedAt: '2024-06-27T21:28:21.238Z',
            number: 44518
          },
          {
            _id: '667dcc0d856777001bb1e580',
            ingredients: [
              '643d69a5c3f7b9001cfa093c',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa0947',
              '643d69a5c3f7b9001cfa0945',
              '643d69a5c3f7b9001cfa093c'
            ],
            status: 'done',
            name: 'Краторный минеральный фалленианский антарианский бургер',
            createdAt: '2024-06-27T20:31:09.170Z',
            updatedAt: '2024-06-27T20:31:09.592Z',
            number: 44517
          },
          {
            _id: '667dcb35856777001bb1e57e',
            ingredients: [
              '643d69a5c3f7b9001cfa093d',
              '643d69a5c3f7b9001cfa0944',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa0946',
              '643d69a5c3f7b9001cfa093d'
            ],
            status: 'done',
            name: 'Традиционный-галактический флюоресцентный минеральный бургер',
            createdAt: '2024-06-27T20:27:33.645Z',
            updatedAt: '2024-06-27T20:27:34.261Z',
            number: 44516
          }
        ],
        total: 44144,
        totalToday: 106
      };

      global.fetch = jest.fn(() => {
        Promise.resolve({
          json: () => Promise.resolve(expectedResult)
        });
      }) as jest.Mock;

      const store = configureStore({
        reducer: { feed: feedReducer }
      });

      await store.dispatch(fetchFeed());
      const { feed } = store.getState();
      expect(feed).toEqual(expectedResult);
    });
  });
});
