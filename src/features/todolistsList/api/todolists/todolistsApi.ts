import { AxiosResponse } from 'axios';
import { ChangeTodolistTitleArgs, TodolistType } from 'features/todolistsList/api/todolists/todolistsApi.types';
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
  updateTodolist(arg: ChangeTodolistTitleArgs) {
    return instance.put<BaseResponseType, AxiosResponse<BaseResponseType>, { title: string }>(`todo-lists/${arg.todolistId}`, {
      title: arg.title,
    });
  },
};
