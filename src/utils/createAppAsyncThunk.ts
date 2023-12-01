import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatchType, AppRootStateType } from 'app/store';

export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  dispatch: AppDispatchType;
  state: AppRootStateType;
  rejectValue: null;
}>();
