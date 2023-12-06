import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    setAppInitialised: (state, action: PayloadAction<{ isInitialised: boolean }>) => {
      state.isInitialised = action.payload.isInitialised;
    },
  },
});

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const appReducer = slice.reducer;
export const appActions = slice.actions;
