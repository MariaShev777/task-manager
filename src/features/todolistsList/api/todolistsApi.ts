import { AxiosResponse } from 'axios';
import {
  ChangeTodolistTitleArgsType,
  CreateTaskArgsType,
  DeleteTaskArgsType,
  GetTasksResponseType,
  TaskType,
  TodolistType,
  UpdateTaskModelType,
} from 'features/todolistsList/api/todolistsApi.types';
import { BaseResponseType } from 'common/types';
import { instance } from 'common/api';

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponseType>(`todo-lists/${todolistId}`);
  },
  createTodolist(title: string) {
    return instance.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      { title: string }
    >('todo-lists', { title });
  },
  updateTodolist(arg: ChangeTodolistTitleArgsType) {
    return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(`todo-lists/${arg.todolistId}`, {
      title: arg.title,
    });
  },

  getTasks(todolistId: string) {
    return instance.get<GetTasksResponseType>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: DeleteTaskArgsType) {
    return instance.delete<BaseResponseType>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: CreateTaskArgsType) {
    return instance.post<BaseResponseType<{ item: TaskType }>, AxiosResponse<BaseResponseType<{ item: TaskType }>>, { title: string }>(
      `todo-lists/${arg.todolistId}/tasks`,
      { title: arg.title },
    );
  },
  updateTask(todolistId: string, taskId: string, domainModel: UpdateTaskModelType) {
    return instance.put<BaseResponseType<{ item: TaskType }>, AxiosResponse<BaseResponseType<{ item: TaskType }>>, UpdateTaskModelType>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      domainModel,
    );
  },
};
