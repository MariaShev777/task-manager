import { createSlice } from '@reduxjs/toolkit';
import { todolistsActions, todolistsThunks } from 'features/todolistsList/model/todolists/todolistsReducer';
import { appActions } from 'app/app.reducer';
import { createAppAsyncThunk } from 'common/utils';
import { RESPONSE_RESULT } from 'common/enums';
import { CreateTaskArgs, DeleteTaskArgs, TaskType, UpdateTaskArgs, UpdateTaskModel } from 'features/todolistsList/api/tasks/tasksApi.types';
import { tasksAPI } from 'features/todolistsList/api/tasks';

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todolistId];
        const index = tasksForTodolist.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasksForTodolist.splice(index, 1);
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.task.todoListId];
        tasksForTodolist.unshift(action.payload.task);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasksForTodolist = state[action.payload.todolistId];
        const index = tasksForTodolist.findIndex((t) => t.id === action.payload.taskId);
        if (index !== -1) tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.domainModel };
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsActions.clearTodosData, () => {
        return {};
      });
  },
});

export type TasksStateType = Record<string, TaskType[]>;

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId) => {
    const res = await tasksAPI.getTasks(todolistId);
    const tasks = res.data.items;
    return { todolistId, tasks };
  },
);

const deleteTask = createAppAsyncThunk<DeleteTaskArgs, DeleteTaskArgs>(`${slice.name}/deleteTask`, async (arg, { rejectWithValue }) => {
  const res = await tasksAPI.deleteTask(arg);
  if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
    return arg;
  } else {
    return rejectWithValue(res.data);
  }
});

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgs>(`${slice.name}/addTask`, async (arg, { rejectWithValue }) => {
  const res = await tasksAPI.createTask(arg);
  if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
    const task = res.data.data.item;
    return { task };
  } else {
    return rejectWithValue(res.data);
  }
});

const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);

  if (!task) {
    dispatch(appActions.setAppError({ error: 'task has not been found' }));
    return rejectWithValue(null);
  }

  const apiModel: UpdateTaskModel = {
    deadline: task.deadline,
    description: task.description,
    priority: task.priority,
    startDate: task.startDate,
    title: task.title,
    status: task.status,
    ...arg.domainModel,
  };

  const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
  if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
    return arg;
  } else {
    return rejectWithValue(res.data);
  }
});

export const tasksReducer = slice.reducer;
export const tasksThunks = { fetchTasks, deleteTask, addTask, updateTask };
