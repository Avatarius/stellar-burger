import {
  TLoginData,
  TRegisterData,
  getUserApi,
  updateUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi
} from '@api';
import {
  createSlice,
  createAsyncThunk,
  SerializedError
} from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../utils/cookie';

interface UserState {
  isAuthChecked: boolean;
  data: TUser | null;
  loginUserError: SerializedError | null;
  registerUserError: SerializedError | null;
}

const initialState: UserState = {
  isAuthChecked: false,
  data: null,
  loginUserError: null,
  registerUserError: null
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
  logoutApi().then(() => {
    dispatch(userLogout());
  })
);

const registerUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => registerUserApi(data)
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
      state.loginUserError = null;
    }
  },
  selectors: {
    selectUserData: (state) => state.data,
    selectIsAuthChecked: (state) => state.isAuthChecked,
    selectLoginUserError: (state) => state.loginUserError
  },
  extraReducers: (builder) => {
    builder

      .addCase(loginUser.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.loginUserError = action.error;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.data = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerUserError = action.error;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
      });
  }
});

const userReducer = userSlice.reducer;
const { selectUserData, selectIsAuthChecked, selectLoginUserError } =
  userSlice.selectors;
const { authChecked, userLogout } = userSlice.actions;

export {
  userReducer,
  loginUser,
  registerUser,
  logoutUser,
  checkUserAuth,
  updateUser,
  selectUserData,
  selectIsAuthChecked,
  selectLoginUserError
};
