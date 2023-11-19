import { authAPI, RESPONSE_RESULT } from 'api/todolists-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authActions } from 'features/Login/auth-reducer';
import { AppThunk } from 'app/store';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialised: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status;
    },
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setIsInitialised: (state, action: PayloadAction<{ isInitialised: boolean }>) => {
      state.isInitialised = action.payload.isInitialised;
    },
  },
});

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const initializeAppTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  try {
    const res = await authAPI.me();
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
    } else {
      handleServerAppError(res.data, dispatch);
    }
  } catch (e) {
    handleServerNetworkError((e as Error).message, dispatch);
  } finally {
    dispatch(appActions.setIsInitialised({ isInitialised: true }));
  }
};

export const appReducer = slice.reducer;
export const appActions = slice.actions;
