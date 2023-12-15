import { RequestStatusType } from 'app/app.reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk, handleServerAppError } from 'common/utils';
import { RESPONSE_RESULT } from 'common/enums';
import { ChangeTodolistTitleArgsType, TodolistType } from 'features/todolistsList/api/todolists/todolistsApi.types';
import { todolistsAPI } from 'features/todolistsList/api/todolists/todolistsApi';
import { thunkTryCatch } from 'common/utils/thunkTryCatch';

const slice = createSlice({
  name: 'todolists',
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
      const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
      if (index !== -1) state[index].filter = action.payload.filter;
    },
    changeTodolistEntityStatus: (state, action: PayloadAction<{ todolistId: string; entityStatus: RequestStatusType }>) => {
      const todo = state.find((tl) => tl.id === action.payload.todolistId);
      if (todo) todo.entityStatus = action.payload.entityStatus;
    },
    clearTodosData: () => {
      return [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({ ...tl, filter: 'all', entityStatus: 'idle' }));
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state.unshift({ ...action.payload.todolist, filter: 'all', entityStatus: 'idle' });
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
        if (index !== -1) state.splice(index, 1);
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const index = state.findIndex((tl) => tl.id === action.payload.todolistId);
        if (index !== -1) state[index].title = action.payload.title;
      });
  },
});

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(`${slice.name}/fetchTodolists`, async (_, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistsAPI.getTodolists();
    return { todolists: res.data };
  });
});

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(`${slice.name}/addTodolist`, async (title, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await todolistsAPI.createTodolist(title);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      return { todolist: res.data.data.item };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(`${slice.name}/deleteTodolist`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: 'loading' }));
    const res = await todolistsAPI.deleteTodolist(todolistId);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: 'idle' }));
      return { todolistId };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const changeTodolistTitle = createAppAsyncThunk<ChangeTodolistTitleArgsType, ChangeTodolistTitleArgsType>(
  `${slice.name}/changeTodolistTitle`,
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    return thunkTryCatch(thunkAPI, async () => {
      const res = await todolistsAPI.updateTodolist(arg);
      if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
        return arg;
      } else {
        handleServerAppError(res.data, dispatch);
        return rejectWithValue(null);
      }
    });
  },
);

export type FilterType = 'all' | 'active' | 'completed';

export type TodolistDomainType = TodolistType & {
  filter: FilterType;
  entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;

export const todolistsThunks = { fetchTodolists, addTodolist, deleteTodolist, changeTodolistTitle };