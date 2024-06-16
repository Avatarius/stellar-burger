import {
  TLoginData,
  TRegisterData,
  getUserApi,
  updateUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi
} from '@api';
import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

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

const logoutUser = createAsyncThunk('user/logout', async (_, { dispatch }) =>
  logoutApi()
    .then(() => {
      localStorage.clear();
      deleteCookie('accessToken');
      dispatch(userLogout());
    })
    .catch(() => {
      console.log('Ошибка выполнения выхода');
    })
);

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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked: (state) => {
      state.isAuthChecked = true;
    },
    userLogout: (state) => {
      state.data = null;
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
      })
      .addCase(logoutUser.rejected, (state) => {
        state.request = false;
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
const { authChecked, userLogout } = userSlice.actions;

export {
  userReducer,
  loginUser,
  registerUser,
  logoutUser,
  checkUserAuth,
  updateUser,
  resetPassword,
  selectUserData,
  selectIsAuthChecked,
  selectRequest,
  selectLoginError,
  selectRegisterError,
  selectUpdateError
};
