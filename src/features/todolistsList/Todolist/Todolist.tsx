import React, { useCallback, useEffect } from 'react';
import s from './Todolist.module.css';
import { Button, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Task } from './Task/Task';
import { FilterType, TodolistDomainType } from 'features/todolistsList/model/todolists.reducer';
import { tasksThunks } from 'features/todolistsList/model/tasks.reducer';
import { useAppDispatch } from 'common/hooks';
import { AddItemForm, EditableSpan } from 'common/components';
import { TASK_STATUSES } from 'common/enums';
import { TaskType } from 'features/todolistsList/api/todolistsApi.types';

type TodolistPropsType = {
  todolist: TodolistDomainType;
  tasks: TaskType[];
  deleteTask: (todolistId: string, taskId: string) => void;
  changeFilter: (todolistId: string, value: FilterType) => void;
  addTask: (todolistId: string, title: string) => void;
  changeStatus: (todolistId: string, taskId: string, status: TASK_STATUSES) => void;
  deleteTodolist: (todolistId: string) => void;
  changeTaskTitle: (todolistId: string, taskId: string, title: string) => void;
  changeTodolistTitle: (todolistId: string, title: string) => void;
};

export const Todolist = React.memo((props: TodolistPropsType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(props.todolist.id));
  }, []);

  const removeTodolist = () => {
    props.deleteTodolist(props.todolist.id);
  };

  const addTask = useCallback(
    (title: string) => {
      props.addTask(props.todolist.id, title);
    },
    [props.addTask, props.todolist.id],
  );

  const changeTodolistTitle = useCallback(
    (title: string) => {
      props.changeTodolistTitle(props.todolist.id, title);
    },
    [props.changeTodolistTitle, props.todolist.id],
  );

  const onAllClickHandler = useCallback(() => {
    props.changeFilter(props.todolist.id, 'all');
  }, [props.changeFilter, props.todolist.id]);

  const onActiveClickHandler = useCallback(() => {
    props.changeFilter(props.todolist.id, 'active');
  }, [props.changeFilter, props.todolist.id]);

  const onCompletedClickHandler = useCallback(() => {
    props.changeFilter(props.todolist.id, 'completed');
  }, [props.changeFilter, props.todolist.id]);

  let tasksForTodolist = props.tasks;

  if (props.todolist.filter === 'active') {
    tasksForTodolist = props.tasks.filter((t) => t.status === TASK_STATUSES.New);
  }

  if (props.todolist.filter === 'completed') {
    tasksForTodolist = props.tasks.filter((t) => t.status === TASK_STATUSES.Completed);
  }

  return (
    <div className={s.todolist}>
      <h3>
        <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle} />
        <IconButton
          onClick={removeTodolist}
          disabled={props.todolist.entityStatus === 'loading'}
          className={s.deleteButton}
          style={{ position: 'absolute' }}
        >
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'} />
      <div className={s.tasksWrapper}>
        {tasksForTodolist.length > 0 ? (
          tasksForTodolist.map((t) => {
            return (
              <div className={s.taskWrapper} key={t.id}>
                <Task
                  task={t}
                  todolistId={props.todolist.id}
                  deleteTask={props.deleteTask}
                  changeTaskTitle={props.changeTaskTitle}
                  changeTaskStatus={props.changeStatus}
                />
              </div>
            );
          })
        ) : (
          <div className={s.noTasks}>No tasks</div>
        )}
      </div>
      <div>
        <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}>
          All
        </Button>
        <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}>
          Active
        </Button>
        <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}>
          Completed
        </Button>
      </div>
    </div>
  );
});
