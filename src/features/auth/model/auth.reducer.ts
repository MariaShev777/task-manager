import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { todolistsActions } from 'features/todolistsList/model/todolists/todolistsReducer';
import { createAppAsyncThunk } from 'common/utils';
import { RESPONSE_RESULT } from 'common/enums';
import { authAPI, LoginParams } from 'features/auth/api';

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authThunks.login.fulfilled, authThunks.logout.fulfilled, authThunks.initializeApp.fulfilled),
      (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      },
    );
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(`${slice.name}/login`, async (arg, { rejectWithValue }) => {
  const res = await authAPI.login(arg);
  if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  const res = await authAPI.logout();
  if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
    dispatch(todolistsActions.clearTodosData());
    return { isLoggedIn: false };
  } else {
    return rejectWithValue(res.data);
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/initializeApp`, async (_, { rejectWithValue }) => {
  const res = await authAPI.me();
  if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
    return { isLoggedIn: true };
  } else {
    return rejectWithValue(res.data);
  }
});

export const authReducer = slice.reducer;

export const authThunks = { login, logout, initializeApp };
