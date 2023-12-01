import { createSlice } from '@reduxjs/toolkit';
import { todolistsActions } from 'features/todolistsList/model/todolists.reducer';
import { appActions } from 'app/app.reducer';
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from 'common/utils';
import { RESPONSE_RESULT, TASK_PRIORITIES, TASK_STATUSES } from 'common/enums';
import {
  CreateTaskArgsType,
  DeleteTaskArgsType,
  TaskType,
  UpdateTaskArgsType,
  UpdateTaskModelType,
} from 'features/todolistsList/api/todolistsApi.types';
import { todolistsAPI } from 'features/todolistsList/api/todolistsApi';

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.forEach((tl) => {
          state[tl.id] = [];
        });
      })
      .addCase(todolistsActions.addTodolist, (state, action) => {
        state[action.payload.todolist.id] = [];
      })
      .addCase(todolistsActions.removeTodolist, (state, action) => {
        delete state[action.payload.todolistId];
      })
      .addCase(todolistsActions.clearTodosData, () => {
        return {};
      })
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
      });
  },
});

export type TasksStateType = {
  [key: string]: TaskType[];
};

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>(
  `${slice.name}/fetchTasks`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI;
    try {
      dispatch(appActions.setAppStatus({ status: 'loading' }));
      const res = await todolistsAPI.getTasks(todolistId);
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      const tasks = res.data.items;
      return { todolistId, tasks };
    } catch (e) {
      handleServerNetworkError(e, dispatch);
      return rejectWithValue(null);
    }
  },
);

const deleteTask = createAppAsyncThunk<DeleteTaskArgsType, DeleteTaskArgsType>(`${slice.name}/deleteTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    const res = await todolistsAPI.deleteTask(arg);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      return { todolistId: arg.todolistId, taskId: arg.taskId };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgsType>(`${slice.name}/addTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    const res = await todolistsAPI.createTask(arg);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      const task = res.data.data.item;
      return { task };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

const updateTask = createAppAsyncThunk<UpdateTaskArgsType, UpdateTaskArgsType>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  try {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    const task = getState().tasks[arg.todolistId].find((t) => t.id === arg.taskId);

    if (!task) {
      dispatch(appActions.setAppError({ error: 'Task has not been found' }));
      return rejectWithValue(null);
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...arg.domainModel,
    };

    const res = await todolistsAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  } catch (e) {
    handleServerNetworkError(e, dispatch);
    return rejectWithValue(null);
  }
});

export type UpdateDomainTaskModelType = {
  title?: string;
  description?: string;
  status?: TASK_STATUSES;
  priority?: TASK_PRIORITIES;
  startDate?: string;
  deadline?: string;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;

export const tasksThunks = { fetchTasks, deleteTask, addTask, updateTask };
