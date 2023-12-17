import { TASK_PRIORITIES, TASK_STATUSES } from 'common/enums';

export type DeleteTaskArgs = { todolistId: string; taskId: string };
export type CreateTaskArgs = { todolistId: string; title: string };
export type UpdateTaskArgs = { todolistId: string; taskId: string; domainModel: UpdateDomainTaskModel };

export type GetTasksResponse = {
  items: TaskType[];
  totalCount: number;
  error: string | null;
};

export type UpdateTaskModel = {
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

export type UpdateDomainTaskModel = {
  title?: string;
  description?: string;
  status?: TASK_STATUSES;
  priority?: TASK_PRIORITIES;
  startDate?: string;
  deadline?: string;
};
