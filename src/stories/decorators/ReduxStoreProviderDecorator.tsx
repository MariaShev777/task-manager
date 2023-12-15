import React from 'react';
import { Provider } from 'react-redux';
import { AppRootStateType } from 'app/store';
import { combineReducers, legacy_createStore } from 'redux';
import { tasksReducer } from 'features/todolistsList/model/tasks/tasksReducer';
import { todolistsReducer } from 'features/todolistsList/model/todolists/todolistsReducer';
import { v1 } from 'uuid';
import { TASK_PRIORITIES, TASK_STATUSES } from 'common/enums';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const initialGlobalState = {
  todolists: [
    { id: 'todolistId1', title: 'What to learn', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
    { id: 'todolistId2', title: 'What to buy', filter: 'all', addedDate: '', order: 0, entityStatus: 'idle' },
  ],
  tasks: {
    ['todolistId1']: [
      {
        id: v1(),
        title: 'HTML&CSS',
        status: TASK_STATUSES.Completed,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TASK_PRIORITIES.Low,
      },
      {
        id: v1(),
        title: 'JS',
        status: TASK_STATUSES.New,
        todoListId: 'todolistId1',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: -1,
        priority: TASK_PRIORITIES.Low,
      },
    ],
    ['todolistId2']: [
      {
        id: v1(),
        title: 'Milk',
        status: TASK_STATUSES.New,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: 0,
        priority: TASK_PRIORITIES.Low,
      },
      {
        id: v1(),
        title: 'React Book',
        status: TASK_STATUSES.Completed,
        todoListId: 'todolistId2',
        description: '',
        startDate: '',
        deadline: '',
        addedDate: '',
        order: -1,
        priority: TASK_PRIORITIES.Low,
      },
    ],
  },
  app: {
    status: 'idle',
    error: null,
    isInitialised: false,
  },
  auth: {
    isLoggedIn: false,
  },
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
