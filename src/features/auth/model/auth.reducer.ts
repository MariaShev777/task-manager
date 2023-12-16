import { createSlice, isAnyOf, PayloadAction } from '@reduxjs/toolkit';
import { appActions } from 'app/app.reducer';
import { todolistsActions } from 'features/todolistsList/model/todolists/todolistsReducer';
import { createAppAsyncThunk, handleServerAppError } from 'common/utils';
import { LoginParamsType } from 'features/auth/api/authApi.types';
import { RESPONSE_RESULT } from 'common/enums';
import { authAPI } from 'features/auth/api/authApi';
import { thunkTryCatch } from 'common/utils/thunkTryCatch';

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

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>(`${slice.name}/login`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      return { isLoggedIn: true };
    } else {
      const isShowAppError = !res.data.fieldsErrors?.length;
      handleServerAppError(res.data, dispatch, isShowAppError);
      return rejectWithValue(res.data);
    }
  });
});

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logout`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.logout();
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(todolistsActions.clearTodosData());
      return { isLoggedIn: false };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/initializeApp`, async (_, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.me();
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      return { isLoggedIn: true };
    } else {
      return rejectWithValue(null);
    }
  }).finally(() => {
    dispatch(appActions.setAppInitialised({ isInitialised: true }));
  });
});

export const authReducer = slice.reducer;

export const authThunks = { login, logout, initializeApp };
