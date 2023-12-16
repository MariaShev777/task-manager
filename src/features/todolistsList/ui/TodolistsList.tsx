import { TodolistDomainType, todolistsThunks } from 'features/todolistsList/model/todolists/todolistsReducer';
import React, { useCallback, useEffect } from 'react';
import { TasksStateType } from 'features/todolistsList/model/tasks/tasksReducer';
import Grid from '@mui/material/Grid';
import { Todolist } from 'features/todolistsList/ui/todolist/Todolist';
import { Navigate } from 'react-router-dom';
import { selectTodolists } from 'features/todolistsList/model/todolists/todolistsSelectors';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { selectTasks } from 'features/todolistsList/model/tasks/tasksSelectors';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { AddItemForm } from 'common/components';

export const TodolistsList: React.FC = () => {
  const todolists = useAppSelector<TodolistDomainType[]>(selectTodolists);
  const tasks = useAppSelector<TasksStateType>(selectTasks);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    dispatch(todolistsThunks.fetchTodolists());
  }, []);

  const addTodolist = useCallback((title: string) => {
    dispatch(todolistsThunks.addTodolist(title));
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Grid container className={'todolistsListFrame'}>
        <Grid className={'addFrame'}>
          <AddItemForm addItem={addTodolist} name={'New TO-DO list'} />
        </Grid>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.id} className={'todolistFrame'}>
              <Todolist key={tl.id} todolist={tl} tasks={tasks[tl.id]} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
