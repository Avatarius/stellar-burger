import { expect, describe } from '@jest/globals';
import {initialState, orderReducer, setOrderRequest} from '../src/services/slices/orders';
import { fetchOrders } from '../src/services/slices/orders';
import { orderList } from '../src/utils/test-constants';

describe('[OrdersSlice]', () => {
  describe('Проверка синхронных экшнов', () => {
    it('Выставить request в true', () => {
      const newState = orderReducer(initialState, setOrderRequest(true));
      const { request } = newState;
      expect(request).toBe(true);
    });
  });
  describe('Проверка асинхронных экшнов', () => {
    it('Получение списка заказов / Request', () => {
      const newState = orderReducer(initialState, {type: fetchOrders.fulfilled.type, payload: orderList});
      const {orders} = newState;
      expect(orders).toEqual(orderList);
    });
  });
});
