import axios, { AxiosResponse } from 'axios';
import { UpdateDomainTaskModelType } from 'features/TodolistsList/tasks-reducer';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '0bcedaa4-1f0f-4539-8da0-be2bd092c459',
  },
});

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },
  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>(
      'todo-lists',
      { title },
    );
  },
  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, {
      title,
    });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: DeleteTaskArgsType) {
    return instance.delete<ResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: CreateTaskArgsType) {
    return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(
      `todo-lists/${arg.todolistId}/tasks`,
      { title: arg.title },
    );
  },
  updateTask(todolistId: string, taskId: string, domainModel: UpdateTaskModelType) {
    return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      domainModel,
    );
  },
};

export const authAPI = {
  login(loginData: LoginDataType) {
    return instance.post<ResponseType<{ userId: number }>, AxiosResponse<ResponseType<{ userId: number }>>, LoginDataType>(
      'auth/login',
      loginData,
    );
  },
  me() {
    return instance.get<ResponseType<UserType>>(`auth/me`);
  },
  logout() {
    return instance.delete<ResponseType>(`auth/login`);
  },
};

export type DeleteTaskArgsType = { todolistId: string; taskId: string };
export type CreateTaskArgsType = { todolistId: string; title: string };
export type UpdateTaskArgsType = { todolistId: string; taskId: string; domainModel: UpdateDomainTaskModelType };

export type LoginDataType = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type ResponseType<D = {}> = {
  data: D;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TASK_STATUSES;
  priority: TASK_PRIORITIES;
  startDate: string;
  deadline: string;
};

export enum TASK_STATUSES {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TASK_PRIORITIES {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgent = 3,
  Later = 4,
}

export enum RESPONSE_RESULT {
  SUCCESS = 0,
  FAILURE = 1,
  CAPTCHA = 10,
}

export type TaskType = {
  description: string;
  title: string;
  status: TASK_STATUSES;
  priority: TASK_PRIORITIES;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

type UserType = {
  id: number;
  email: string;
  login: string;
};
