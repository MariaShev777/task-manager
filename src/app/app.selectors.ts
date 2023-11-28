import { AppRootStateType } from 'app/store';

export const selectAppStatus = (state: AppRootStateType) => state.app.status;
export const selectIsInitialised = (state: AppRootStateType) => state.app.isInitialised;
export const selectAppError = (state: AppRootStateType) => state.app.error;
