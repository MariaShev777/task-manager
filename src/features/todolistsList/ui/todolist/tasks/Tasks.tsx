import s from 'features/todolistsList/ui/todolist/Todolist.module.css';
import { Task } from 'features/todolistsList/ui/todolist/tasks/task/Task';
import React from 'react';
import { TASK_STATUSES } from 'common/enums';
import { TodolistDomainType } from 'features/todolistsList/model/todolists/todolistsReducer';
import { TaskType } from 'features/todolistsList/api/tasks/tasksApi.types';

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Tasks = ({ todolist, tasks }: Props) => {
  let tasksForTodolist = tasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.status === TASK_STATUSES.New);
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === TASK_STATUSES.Completed);
  }

  return (
    <div className={s.tasksWrapper}>
      {tasksForTodolist.length > 0 ? (
        tasksForTodolist.map((t) => {
          return (
            <div className={s.taskWrapper} key={t.id}>
              <Task task={t} todolistId={todolist.id} />
            </div>
          );
        })
      ) : (
        <div className={s.noTasks}>No tasks</div>
      )}
    </div>
  );
};
