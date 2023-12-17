import { RequestStatusType } from 'app/app.reducer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createAppAsyncThunk } from 'common/utils';
import { RESPONSE_RESULT } from 'common/enums';
import { ChangeTodolistTitleArgs, TodolistType } from 'features/todolistsList/api/todolists/todolistsApi.types';
import { todolistsAPI } from 'features/todolistsList/api/todolists';

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

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, void>(`${slice.name}/fetchTodolists`, async () => {
  const res = await todolistsAPI.getTodolists();
  return { todolists: res.data };
});

const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${slice.name}/addTodolist`,
  async (title, { rejectWithValue }) => {
    const res = await todolistsAPI.createTodolist(title);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      return { todolist: res.data.data.item };
    } else {
      return rejectWithValue(res.data);
    }
  },
);

const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(`${slice.name}/deleteTodolist`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: 'loading' }));
  const res = await todolistsAPI.deleteTodolist(todolistId).finally(() => {
    dispatch(todolistsActions.changeTodolistEntityStatus({ todolistId, entityStatus: 'idle' }));
  });
  if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
    return { todolistId };
  } else {
    return rejectWithValue(res.data);
  }
});

const changeTodolistTitle = createAppAsyncThunk<ChangeTodolistTitleArgs, ChangeTodolistTitleArgs>(
  `${slice.name}/changeTodolistTitle`,
  async (arg, { rejectWithValue }) => {
    const res = await todolistsAPI.updateTodolist(arg);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      return arg;
    } else {
      return rejectWithValue(res.data);
    }
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
