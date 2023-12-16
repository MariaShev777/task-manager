import { AxiosResponse } from 'axios';
import { ChangeTodolistTitleArgs, TodolistType } from 'features/todolistsList/api/todolists/todolistsApi.types';
import { BaseResponse } from 'common/types';
import { instance } from 'common/api';

export const todolistsAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}`);
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>, AxiosResponse<BaseResponse<{ item: TodolistType }>>, { title: string }>(
      'todo-lists',
      { title },
    );
  },
  updateTodolist(arg: ChangeTodolistTitleArgs) {
    return instance.put<BaseResponse, AxiosResponse<BaseResponse>, { title: string }>(`todo-lists/${arg.todolistId}`, {
      title: arg.title,
    });
  },
};
