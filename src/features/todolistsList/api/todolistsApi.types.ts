import { UpdateDomainTaskModelType } from 'features/todolistsList/model/tasks.reducer';
import { TASK_PRIORITIES, TASK_STATUSES } from 'common/enums';

export type TodolistType = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type DeleteTaskArgsType = { todolistId: string; taskId: string };
export type CreateTaskArgsType = { todolistId: string; title: string };
export type UpdateTaskArgsType = { todolistId: string; taskId: string; domainModel: UpdateDomainTaskModelType };

export type ChangeTodolistTitleArgsType = { todolistId: string; title: string };

export type GetTasksResponseType = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type UpdateTaskModelType = {
  title: string;
  description: string;
  status: TASK_STATUSES;
  priority: TASK_PRIORITIES;
  startDate: string;
  deadline: string;
};

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
