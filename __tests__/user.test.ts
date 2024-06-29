import { expect, describe } from '@jest/globals';
import {userReducer, initialState, authChecked} from '../src/services/slices/user';
import { checkUserAuth, getUser, loginUser, logoutUser, registerUser, updateUser } from '../src/services/thunk/user';
import { user } from '../src/utils/test-constants';
import { register } from 'module';

describe('[UserSlice]', () => {
  describe('Проверка синхронных экшнов', () => {
    it('Выставить статус проверки авторизации', () => {
      const newState = userReducer(initialState, authChecked());
      const {isAuthChecked} = newState;
      expect(isAuthChecked).toBe(true);
    })
  });
  describe('Проверка асинхронных экшнов', () => {
    it('login / Request', () => {
      const newState = userReducer(initialState, {type: loginUser.pending.type});
      const {request} = newState;
      expect(request).toBe(true);
    });
    it('login / Success', () => {
      const newState = userReducer(initialState, {type: loginUser.fulfilled.type, payload: user});
      const {isAuthChecked, data, request, loginError} = newState;
      expect(isAuthChecked).toBe(true);
      expect(data).toEqual(user);
      expect(request).toBe(false);
      expect(loginError).toBe('');
    });
    it('login / Failed', () => {
      const error = {message: 'Не удалось авторизироваться'};
      const newState = userReducer(initialState, {type: loginUser.rejected.type, error});
      const {request, isAuthChecked, loginError} = newState;
      expect(request).toBe(false);
      expect(isAuthChecked).toBe(true);
      expect(loginError).toBe(error.message);
    });
    it('register / Request', () => {
      const newState = userReducer(initialState, {type: registerUser.pending.type});
      const {request} = newState;
      expect(request).toBe(true);
    });
    it('register / Success', () => {
      const newState = userReducer(initialState, {type: registerUser.fulfilled.type, payload: user});
      const {data, request} = newState;
      expect(request).toBe(false);
      expect(data).toEqual(user);
    });
    it('register / Failed', () => {
      const error = {message: 'Не удалось зарегистрироваться'};
      const newState = userReducer(initialState, {type: registerUser.rejected.type, error});
      const {request, registerError} = newState;
      expect(request).toBe(false);
      expect(registerError).toBe(error.message);
    });
    it('logout / Request', () => {
      const newState = userReducer(initialState, {type: logoutUser.pending.type});
      const {request} = newState;
      expect(request).toBe(true);
    });
    it('logout / Success', () => {
      const newState = userReducer(initialState, {type: logoutUser.fulfilled.type});
      const {request, data} = newState;
      expect(request).toBe(false);
      expect(data).toBe(null);
    });
    it('logout / Failed', () => {
      const log = jest.spyOn(console, "log").mockImplementation(() => {});
      const newState = userReducer(initialState, {type: logoutUser.rejected.type});
      const {request} = newState;
      window.console.log = jest.fn();
      expect(request).toBe(false);
      expect(log).toHaveBeenCalledWith('Ошибка выполнения выхода');
      log.mockRestore();
    });
    it('Проверка авторизации / Request', () => {
      const newState = userReducer(initialState, {type: checkUserAuth.pending.type});
      const {loginError, registerError} = newState;
      expect(loginError).toBe('');
      expect(registerError).toBe('');
    });
    it('Получение пользователя / Success', () => {
      const newState = userReducer(initialState, {type: getUser.fulfilled.type, payload: {success: true, user: user}});
      const {data} = newState;
      expect(data).toBe(user);
    });
    it('Обновление пользователя / Pending', () => {
      const newState = userReducer(initialState, {type: updateUser.pending.type});
      const {request} = newState;
      expect(request).toBe(true);
    });
    it('Обновление пользователя / Success', () => {
      const newState = userReducer(initialState, {type: updateUser.fulfilled.type, payload: {success: true, user: updateUser}});
      const {request, data} = newState;
      expect(request).toBe(false);
      expect(data).toEqual(updateUser);
    });
    it('Обновление пользователя / Failed', () => {
      const error = {message: 'Не удалось обновить пользователя'};
      const newState = userReducer(initialState, {type: updateUser.rejected.type, error});
      const {request, updateError} = newState;
      expect(request).toBe(false);
      expect(updateError).toBe(error.message);
    })
  });
});
