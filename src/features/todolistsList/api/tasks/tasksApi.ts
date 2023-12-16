import { AxiosResponse } from 'axios';
import { BaseResponse } from 'common/types';
import { instance } from 'common/api';
import {
  CreateTaskArgs,
  DeleteTaskArgs,
  GetTasksResponse,
  TaskType,
  UpdateTaskModel,
} from 'features/todolistsList/api/tasks/tasksApi.types';

export const tasksAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  deleteTask(arg: DeleteTaskArgs) {
    return instance.delete<BaseResponse>(`todo-lists/${arg.todolistId}/tasks/${arg.taskId}`);
  },
  createTask(arg: CreateTaskArgs) {
    return instance.post<BaseResponse<{ item: TaskType }>, AxiosResponse<BaseResponse<{ item: TaskType }>>, { title: string }>(
      `todo-lists/${arg.todolistId}/tasks`,
      { title: arg.title },
    );
  },
  updateTask(todolistId: string, taskId: string, domainModel: UpdateTaskModel) {
    return instance.put<BaseResponse<{ item: TaskType }>, AxiosResponse<BaseResponse<{ item: TaskType }>>, UpdateTaskModel>(
      `todo-lists/${todolistId}/tasks/${taskId}`,
      domainModel,
    );
  },
};
