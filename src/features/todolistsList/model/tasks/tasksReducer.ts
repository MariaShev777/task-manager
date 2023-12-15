import { createSlice } from '@reduxjs/toolkit';
import { todolistsActions, todolistsThunks } from 'features/todolistsList/model/todolists/todolistsReducer';
import { appActions } from 'app/app.reducer';
import { createAppAsyncThunk, handleServerAppError } from 'common/utils';
import { RESPONSE_RESULT, TASK_PRIORITIES, TASK_STATUSES } from 'common/enums';
import { thunkTryCatch } from 'common/utils/thunkTryCatch';
import { tasksAPI } from 'features/todolistsList/api/tasks/tasksApi';
import {
  CreateTaskArgsType,
  DeleteTaskArgsType,
  TaskType,
  UpdateTaskArgsType,
  UpdateTaskModelType,
} from 'features/todolistsList/api/tasks/tasksApi.types';

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
  async (todolistId, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await tasksAPI.getTasks(todolistId);
      const tasks = res.data.items;
      return { todolistId, tasks };
    });
  },
);

const deleteTask = createAppAsyncThunk<DeleteTaskArgsType, DeleteTaskArgsType>(`${slice.name}/deleteTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksAPI.deleteTask(arg);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgsType>(`${slice.name}/addTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
    const res = await tasksAPI.createTask(arg);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      const task = res.data.data.item;
      return { task };
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
});

const updateTask = createAppAsyncThunk<UpdateTaskArgsType, UpdateTaskArgsType>(`${slice.name}/updateTask`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue, getState } = thunkAPI;
  return thunkTryCatch(thunkAPI, async () => {
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

    const res = await tasksAPI.updateTask(arg.todolistId, arg.taskId, apiModel);
    if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
      return arg;
    } else {
      handleServerAppError(res.data, dispatch);
      return rejectWithValue(null);
    }
  });
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
export const tasksThunks = { fetchTasks, deleteTask, addTask, updateTask };
