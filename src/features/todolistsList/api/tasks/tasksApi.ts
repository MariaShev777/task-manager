import { AxiosResponse } from 'axios';
import { BaseResponseType } from 'common/types';
import { instance } from 'common/api';
import {
  CreateTaskArgsType,
  DeleteTaskArgsType,
  GetTasksResponseType,
  TaskType,
  UpdateTaskModelType,
} from 'features/todolistsList/api/tasks/tasksApi.types';

export const tasksAPI = {
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
