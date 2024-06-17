import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  checkUserAuth,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunk/user';
import { deleteCookie } from '../../utils/cookie';

interface UserState {
  request: boolean;
  isAuthChecked: boolean;
  data: TUser | null;
  loginError: string;
  registerError: string;
  updateError: string;
}

const initialState: UserState = {
  request: false,
  isAuthChecked: false,
  data: null,
  loginError: '',
  registerError: '',
  updateError: ''
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  selectors: {
    selectUserData: (state) => state.data,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectRequest: (state) => state.request,
    selectLoginError: (state) => state.loginError,
    selectRegisterError: (state) => state.registerError,
    selectUpdateError: (state) => state.updateError
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.request = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginError = action.error.message || '';
        state.request = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.data = action.payload;
        state.request = false;
        state.loginError = '';
      })
      .addCase(logoutUser.pending, (state) => {
        state.request = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.request = false;
        localStorage.clear();
        deleteCookie('accessToken');
        state.data = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.request = false;
        console.log('Ошибка выполнения выхода');
      })
      .addCase(registerUser.pending, (state) => {
        state.request = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error.message || '';
        state.request = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload;
        state.request = false;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loginError = '';
        state.registerError = '';
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.request = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.request = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.request = false;
        state.updateError = action.error.message || '';
      });
  }
});

const userReducer = userSlice.reducer;
const {
  selectUserData,
  selectIsAuthChecked,
  selectRequest,
  selectLoginError,
  selectRegisterError,
  selectUpdateError
} = userSlice.selectors;
const { authChecked } = userSlice.actions;

export {
  userSlice,
  userReducer,
  registerUser,
  selectUserData,
  selectIsAuthChecked,
  selectRequest,
  selectLoginError,
  selectRegisterError,
  selectUpdateError,
  authChecked
};
