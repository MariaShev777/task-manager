import React, { useCallback, useEffect } from 'react';
import s from 'features/todolistsList/ui/todolist/Todolist.module.css';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { TodolistDomainType, todolistsActions, todolistsThunks } from 'features/todolistsList/model/todolists/todolistsReducer';
import { tasksThunks } from 'features/todolistsList/model/tasks/tasksReducer';
import { useAppDispatch } from 'common/hooks';
import { AddItemForm, EditableSpan } from 'common/components';
import { TASK_STATUSES } from 'common/enums';
import { TaskType } from 'features/todolistsList/api/tasks/tasksApi.types';
import { Task } from './Task/Task';

type Props = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
};

export const Todolist = React.memo(({ todolist, tasks }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(todolist.id));
  }, []);

  const removeTodolistHandler = () => {
    dispatch(todolistsThunks.deleteTodolist(todolist.id));
  };

  const addTaskCb = useCallback(
    (title: string) => {
      dispatch(tasksThunks.addTask({ todolistId: todolist.id, title }));
    },
    [todolist.id],
  );

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.changeTodolistTitle({ todolistId: todolist.id, title }));
    },
    [todolist.id],
  );

  const onAllClickHandler = () => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId: todolist.id, filter: 'all' }));
  };

  const onActiveClickHandler = () => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId: todolist.id, filter: 'active' }));
  };

  const onCompletedClickHandler = () => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId: todolist.id, filter: 'completed' }));
  };

  let tasksForTodolist = tasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = tasks.filter((t) => t.status === TASK_STATUSES.New);
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = tasks.filter((t) => t.status === TASK_STATUSES.Completed);
  }

  return (
    <div className={s.todolist}>
      <h3>
        <EditableSpan title={todolist.title} onChange={changeTodolistTitleHandler} />
        <IconButton
          onClick={removeTodolistHandler}
          disabled={todolist.entityStatus === 'loading'}
          className={s.deleteButton}
          style={{ position: 'absolute' }}
        >
          <Delete />
        </IconButton>
      </h3>

      <AddItemForm addItem={addTaskCb} disabled={todolist.entityStatus === 'loading'} />
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
      <div>
        <Button variant={todolist.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>
          All
        </Button>
        <Button variant={todolist.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button variant={todolist.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}>
          Completed
        </Button>
      </div>
    </div>
  );
});
