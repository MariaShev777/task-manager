import { authAPI, LoginDataType, RESPONSE_RESULT } from 'api/todolists-api';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from 'app/store';
import { appActions } from 'app/app-reducer';

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
});

export const loginTC =
  (loginData: LoginDataType): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    authAPI
      .login(loginData)
      .then((res) => {
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
          dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

export const logoutTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  authAPI
    .logout()
    .then((res) => {
      if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }));
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch((e) => {
      handleServerNetworkError(e.message, dispatch);
    });
};

export const authReducer = slice.reducer;
export const authActions = slice.actions;
