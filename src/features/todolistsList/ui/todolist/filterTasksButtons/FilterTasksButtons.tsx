import { Button } from '@mui/material';
import React from 'react';
import { FilterType, TodolistDomainType, todolistsActions } from 'features/todolistsList/model/todolists/todolistsReducer';
import { useAppDispatch } from 'common/hooks';

type Props = {
  todolist: TodolistDomainType;
};

export const FilterTasksButtons = ({ todolist }: Props) => {
  const { id, filter } = todolist;

  const dispatch = useAppDispatch();

  const changeFilterHandler = (filter: FilterType) => {
    dispatch(todolistsActions.changeTodolistFilter({ todolistId: id, filter }));
  };

  return (
    <>
      <Button variant={filter === 'all' ? 'outlined' : 'text'} onClick={() => changeFilterHandler('all')}>
        All
      </Button>
      <Button variant={filter === 'active' ? 'outlined' : 'text'} onClick={() => changeFilterHandler('active')}>
        Active
      </Button>
      <Button variant={filter === 'completed' ? 'outlined' : 'text'} onClick={() => changeFilterHandler('completed')}>
        Completed
      </Button>
    </>
  );
};
