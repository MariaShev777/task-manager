import { FilterType, TodolistDomainType, todolistsActions, todolistsThunks } from 'features/todolistsList/model/todolists.reducer';
import React, { useCallback, useEffect } from 'react';
import { TasksStateType, tasksThunks } from 'features/todolistsList/model/tasks.reducer';
import Grid from '@mui/material/Grid';
import { Todolist } from './Todolist/Todolist';
import { Navigate } from 'react-router-dom';
import { selectTodolists } from 'features/todolistsList/model/todolists.selectors';
import { selectIsLoggedIn } from 'features/auth/model/auth.selectors';
import { selectTasks } from 'features/todolistsList/model/tasks.selectors';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { AddItemForm } from 'common/components';
import { TASK_STATUSES } from 'common/enums';

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

  const addTask = useCallback((todolistId: string, title: string) => {
    dispatch(tasksThunks.addTask({ todolistId, title }));
  }, []);

  const deleteTask = useCallback((todolistId: string, taskId: string) => {
    dispatch(tasksThunks.deleteTask({ todolistId, taskId }));
  }, []);

  const changeStatus = useCallback((todolistId: string, taskId: string, status: TASK_STATUSES) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { status } }));
  }, []);

  const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, domainModel: { title } }));
  }, []);

  const addTodolist = useCallback((title: string) => {
    dispatch(todolistsThunks.addTodolist(title));
  }, []);

  const deleteTodolist = useCallback((todolistId: string) => {
    dispatch(todolistsThunks.deleteTodolist(todolistId));
  }, []);

  const changeFilter = useCallback((todolistId: string, filter: FilterType) => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }));
  }, []);

  const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
    dispatch(todolistsThunks.changeTodolistTitle({ todolistId, title }));
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
              <Todolist
                key={tl.id}
                todolist={tl}
                tasks={tasks[tl.id]}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                deleteTodolist={deleteTodolist}
                changeTaskTitle={changeTaskTitle}
                changeTodolistTitle={changeTodolistTitle}
              />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
