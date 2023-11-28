import { AppThunk } from 'app/store';
import { handleServerAppError, handleServerNetworkError } from 'utils/error-utils';
import { RESPONSE_RESULT, TASK_PRIORITIES, TASK_STATUSES, TaskType, todolistsAPI, UpdateTaskModelType } from 'api/todolists-api';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { todolistsActions } from 'features/TodolistsList/todolists-reducer';
import { appActions } from 'app/app-reducer';

const slice = createSlice({
  name: 'tasks',
  initialState: {} as TasksStateType,
  reducers: {
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks;
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasksForTodolist = state[action.payload.task.todoListId];
      tasksForTodolist.unshift(action.payload.task);
    },
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasksForTodolist = state[action.payload.todolistId];
      const index = tasksForTodolist.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) tasksForTodolist.splice(index, 1);
    },
    updateTask: (state, action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>) => {
      const tasksForTodolist = state[action.payload.todolistId];
      const index = tasksForTodolist.findIndex((t) => t.id === action.payload.taskId);
      if (index !== -1) tasksForTodolist[index] = { ...tasksForTodolist[index], ...action.payload.model };
    },
  },
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
      });
  },
});

export type TasksStateType = {
  [key: string]: TaskType[];
};

export const fetchTasksTC =
  (todolistId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistsAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }));
        dispatch(appActions.setAppStatus({ status: 'succeeded' }));
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

export const deleteTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistsAPI
      .deleteTask(todolistId, taskId)
      .then((res) => {
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
          dispatch(tasksActions.removeTask({ todolistId, taskId }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

export const addTaskTC =
  (todolistId: string, title: string): AppThunk =>
  (dispatch) => {
    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistsAPI
      .createTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
          dispatch(tasksActions.addTask({ task: res.data.data.item }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

export const updateTaskTC =
  (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk =>
  (dispatch, getState) => {
    const task = getState().tasks[todolistId].find((t) => t.id === taskId);

    if (!task) {
      console.warn('task not found in the state');
      return;
    }

    const apiModel: UpdateTaskModelType = {
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
      title: task.title,
      status: task.status,
      ...domainModel,
    };

    dispatch(appActions.setAppStatus({ status: 'loading' }));
    todolistsAPI
      .updateTask(todolistId, taskId, apiModel)
      .then((res) => {
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
          dispatch(tasksActions.updateTask({ todolistId, taskId, model: domainModel }));
          dispatch(appActions.setAppStatus({ status: 'succeeded' }));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch((e) => {
        handleServerNetworkError(e.message, dispatch);
      });
  };

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
