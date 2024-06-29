import { expect, describe } from '@jest/globals';
import {
  initialState,
  clearOrder,
  orderReducer
} from '../src/services/slices/order';
import { currentOrder, newOrder } from '../src/utils/test-constants';
import { getOrderByNumber, orderBurger } from '../src/services/thunk/order';

describe('[OrderSlice]', () => {
  describe('Проверка синхронных экшнов', () => {
    it('Очистить текущий заказ', () => {
      const newState = orderReducer(currentOrder, clearOrder());
      const { data } = newState;
      expect(data).toBe(null);
    });
  });
  describe('Проверка асинхронных экшнов', () => {
    it('Получение заказа по номеру / Request', () => {
      const newState = orderReducer(initialState, {
        type: getOrderByNumber.pending.type
      });
      const { request } = newState;
      expect(request).toBe(true);
    });
    it('Получение заказа по номеру / Success', () => {
      const newState = orderReducer(initialState, {
        type: getOrderByNumber.fulfilled.type,
        payload: { orders: [currentOrder] }
      });
      const { data, request } = newState;
      expect(data).toEqual(currentOrder);
      expect(request).toBe(false);
    });
    it('Получение заказа по номеру / Failed', () => {
      const newState = orderReducer(initialState, {
        type: getOrderByNumber.rejected.type
      });
      const { request } = newState;
      expect(request).toBe(false);
    });
    it('Оформление заказа / Request', () => {
      const newState = orderReducer(initialState, {
        type: orderBurger.pending.type
      });
      const { request } = newState;
      expect(request).toBe(true);
    });
    it('Оформление заказа / Success', () => {
      const newState = orderReducer(initialState, {
        type: orderBurger.fulfilled.type,
        payload: newOrder
      });
      const { request, data } = newState;
      expect(request).toBe(false);
      expect(data).toEqual(newOrder.order);
    });
    it('Оформление заказа / Failed', () => {
      const newState = orderReducer(initialState, {
        type: orderBurger.rejected.type
      });
      const { request } = newState;
      expect(request).toBe(false);
    });
  });
});
