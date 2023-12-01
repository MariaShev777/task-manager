import { Dispatch } from 'redux';
import { appActions, RequestStatusType } from 'app/app.reducer';
import { AppThunk } from 'app/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { handleServerAppError, handleServerNetworkError } from 'common/utils';
import { RESPONSE_RESULT } from 'common/enums';
import { TodolistType } from 'features/todolistsList/api/todolistsApi.types';
import { todolistsAPI } from 'features/todolistsList/api/todolistsApi';

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
    },
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index !== -1) state.splice(index, 1);
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index !== -1) state[index].title = action.payload.title;
    },
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeEntityStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((tl) => tl.id === action.payload.todolistId);
      if (todo) todo.entityStatus = action.payload.entityStatus;
    },
    clearTodosData: () => {
      return [];
    },
  },
});

export const fetchTodolistsTC = (): AppThunk => (dispatch) => {
  dispatch(appActions.setAppStatus({ status: 'loading' }));
  todolistsAPI
    .getTodolists()
    .then((res) => {
      dispatch(todolistsActions.setTodolists({ todolists: res.data }));
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
    })
    .catch((e) => {
      handleServerNetworkError(e.message, dispatch);
    });
};

export const addTodolistTC =
  (title: string): AppThunk =>
  (dispatch: Dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistsAPI
      .createTodolist(title)
      .then((res) => {
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
          dispatch(todolistsActions.addTodolist({ todolist: res.data.data.item }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

export const deleteTodolistTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    dispatch(todolistsActions.changeEntityStatus({ todolistId, entityStatus: 'loading' }));
    todolistsAPI
      .deleteTodolist(todolistId)
      .then((res) => {
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
          dispatch(todolistsActions.removeTodolist({ todolistId }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
          dispatch(todolistsActions.changeEntityStatus({ todolistId, entityStatus: 'idle' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

export const changeTodolistTitleTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistsAPI
      .updateTodolist(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
          dispatch(todolistsActions.changeTodolistTitle({ todolistId, title }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
