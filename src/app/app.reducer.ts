import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'app',
  initialState: {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialised: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: null | string }>) => {
      state.error = action.payload.error;
    },
    setAppInitialised: (state, action: PayloadAction<{ isInitialised: boolean }>) => {
      state.isInitialised = action.payload.isInitialised;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/pending');
        },
        (state) => {
          state.status = 'loading';
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/fulfilled');
        },
        (state) => {
          state.status = 'succeeded';
        },
      )
      .addMatcher(
        (action: AnyAction) => {
          return action.type.endsWith('/rejected');
        },
        (state) => {
          state.status = 'failed';
        },
      );
  },
});

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export const appReducer = slice.reducer;
export const appActions = slice.actions;
