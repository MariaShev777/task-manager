import { tasksReducer } from 'features/todolistsList/model/tasks/tasksReducer';
import { todolistsReducer } from 'features/todolistsList/model/todolists/todolistsReducer';
import { appReducer } from 'app/app.reducer';
import { authReducer } from 'features/auth/model/auth.reducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;

// @ts-ignore
window.store = store;
