import React, { useCallback, useEffect } from 'react';
import s from 'features/todolistsList/ui/todolist/Todolist.module.css';
import { TodolistDomainType } from 'features/todolistsList/model/todolists/todolistsReducer';
import { tasksThunks } from 'features/todolistsList/model/tasks/tasksReducer';
import { useAppDispatch } from 'common/hooks';
import { AddItemForm } from 'common/components';
import { TaskType } from 'features/todolistsList/api/tasks/tasksApi.types';
import { FilterTasksButtons } from 'features/todolistsList/ui/todolist/filterTasksButtons/FilterTasksButtons';
import { Tasks } from 'features/todolistsList/ui/todolist/tasks/Tasks';
import { TodolistTitle } from 'features/todolistsList/ui/todolist/todolistTitle/TodolistTitle';

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(({ todolist, tasks }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id));
  }, []);

  const addTaskCallback = useCallback(
    (title: string) => {
      return dispatch(tasksThunks.addTask({ todolistId: todolist.id, title })).unwrap();
    },
    [todolist.id],
  );

  return (
    <div className={s.todolist}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} disabled={todolist.entityStatus === 'loading'} />
      <Tasks todolist={todolist} tasks={tasks} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  );
});
