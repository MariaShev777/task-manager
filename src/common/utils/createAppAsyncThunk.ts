import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, AppRootStateType } from 'app/store';
import { BaseResponseType } from 'common/types';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatchType;
  state: AppRootStateType;
  rejectValue: null | BaseResponseType;
}>();
