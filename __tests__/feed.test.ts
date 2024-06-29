import { expect, describe } from '@jest/globals';
import { clearFeed, feedReducer } from '../src/services/slices/feed';
import {fetchFeed} from '../src/services/thunk/feed';
import { initialState } from '../src/services/slices/feed';
import {feedFullState} from '../src/utils/test-constants';


describe('[FeedSlice]', () => {
  describe('Проверка обработки экшнов', () => {
    it('Очистка ленты', () => {
      const newState = feedReducer(feedFullState, clearFeed());
      const { orders } = newState;
      expect(orders).toEqual([]);
    });
  });
  describe('Проверка асинхронных экшнов', () => {
    it('Получение списка недавних заказов', async () => {
      const newState = feedReducer(initialState, {type: fetchFeed.fulfilled.type, payload: feedFullState});
      const {orders, total, totalToday} = newState;
      expect(orders).toEqual(feedFullState.orders);
      expect(total).toBe(feedFullState.total);
      expect(totalToday).toBe(feedFullState.totalToday);
    });
  });
});
