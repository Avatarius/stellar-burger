import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  resetPasswordApi,
  updateUserApi
} from '@api';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { authChecked } from '../slices/user';

const getUser = createAsyncThunk('user/get', async () => getUserApi());

const checkUserAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, { dispatch }) => {
    if (getCookie('accessToken')) {
      dispatch(getUser()).finally(() => {
        dispatch(authChecked());
      });
    } else {
      dispatch(authChecked());
    }
  }
);

const updateUser = createAsyncThunk(
  'user/update',
  async (newData: Partial<TRegisterData>) => updateUserApi(newData)
);

const loginUser = createAsyncThunk(
  'user/login',
  async (loginData: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi(loginData);
    if (!data.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

const logoutUser = createAsyncThunk('user/logout', async () => logoutApi());

const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData, { rejectWithValue }) => {
    const register_data = await registerUserApi(data);
    if (!register_data.success) {
      rejectWithValue(register_data);
    }
    setCookie('accessToken', register_data.accessToken);
    localStorage.setItem('refreshToken', register_data.refreshToken);
    return register_data.user;
  }
);

const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (data: { password: string; token: string }) => resetPasswordApi(data)
);

export {
  getUser,
  checkUserAuth,
  updateUser,
  loginUser,
  logoutUser,
  registerUser,
  resetPassword
};
