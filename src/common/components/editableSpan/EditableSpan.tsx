import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';

type PropsType = {
  title: string;
  onChange: (title: string) => void;
};

export const EditableSpan = (props: PropsType) => {
  let [editMode, setEditMode] = useState<boolean>(false);
  let [title, setTitle] = useState<string>(props.title);

  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return editMode ? (
    <TextField variant="standard" sx={{ width: '70px' }} onChange={onChangeHandler} onBlur={activateViewMode} value={title} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
