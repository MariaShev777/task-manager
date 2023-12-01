import { AnyAction, combineReducers } from 'redux';
import { tasksReducer } from 'features/todolistsList/model/tasks.reducer';
import { todolistsReducer } from 'features/todolistsList/model/todolists.reducer';
import { ThunkAction } from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { appReducer } from 'app/app.reducer';
import { authReducer } from 'features/auth/model/auth.reducer';
import { configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>;
export type AppDispatchType = typeof store.dispatch;

// @ts-ignore
window.store = store;
