import { AxiosResponse } from 'axios';
import {
  CreateTaskArgsType,
  DeleteTaskArgsType,
  GetTasksResponseType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
} from 'features/todolistsList/api/todolistsApi.types';
import { ResponseType } from 'common/types';
import { instance } from 'common/api';

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
