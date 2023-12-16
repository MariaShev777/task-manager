import { EditableSpan } from 'common/components';
import { IconButton } from '@mui/material';
import s from 'features/todolistsList/ui/todolist/Todolist.module.css';
import { Delete } from '@mui/icons-material';
import React, { useCallback } from 'react';
import { TodolistDomainType, todolistsThunks } from 'features/todolistsList/model/todolists/todolistsReducer';
import { useAppDispatch } from 'common/hooks';

type Props = {
  todolist: TodolistDomainType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { id, entityStatus, title } = todolist;
  const dispatch = useAppDispatch();

  const removeTodolistHandler = () => {
    dispatch(todolistsThunks.deleteTodolist(todolist.id));
  };

  const changeTodolistTitleHandler = useCallback(
    (title: string) => {
      dispatch(todolistsThunks.changeTodolistTitle({ todolistId: id, title }));
    },
    [id],
  );

  return (
    <h3>
      <EditableSpan title={title} onChange={changeTodolistTitleHandler} />
      <IconButton
        onClick={removeTodolistHandler}
        disabled={entityStatus === 'loading'}
        className={s.deleteButton}
        style={{ position: 'absolute' }}
      >
        <Delete />
      </IconButton>
    </h3>
  );
};
