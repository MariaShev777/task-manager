import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { appActions } from 'app/app.reducer';
import { todolistsActions } from 'features/todolistsList/model/todolists.reducer';
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils';
import { LoginParamsType } from 'features/auth/api/authApi.types';
import { RESPONSE_RESULT } from 'common/enums';
import { authAPI } from 'features/auth/api/authApi';

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
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn;
      });
  },
});

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(`${slice.name}/login`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    const res = await authAPI.login(arg);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      return { isLoggedIn: true };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(res.data);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    const res = await authAPI.logout();
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(todolistsActions.clearTodosData());
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    const res = await authAPI.me();
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      return { isLoggedIn: true };
    } else {
      // handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppInitialised({ isInitialised: true }));
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;

export const authThunks = { login, logout, initializeApp };
