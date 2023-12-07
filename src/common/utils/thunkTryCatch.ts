import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AppDispatchType, AppRootStateType } from 'app/store';
import { BaseResponseType } from 'common/types';
import { appActions } from 'app/app.reducer';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatchType, null | BaseResponseType>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  } finally {
    dispatch(appActions.setAppStatus({ status: 'idle' }));
  }
};
