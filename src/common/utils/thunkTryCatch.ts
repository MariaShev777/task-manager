import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk';
import { AppDispatchType, AppRootStateType } from 'app/store';
import { BaseResponse } from 'common/types';
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError';

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatchType, null | BaseResponse>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    return await logic();
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
};
