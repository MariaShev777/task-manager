import React, { ChangeEvent, useState } from 'react';
import TextField from '@mui/material/TextField';

type Props = {
  title: string;
  onChange: (title: string) => void;
};

export const EditableSpan = (props: Props) => {
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
    <TextField variant="standard" onChange={onChangeHandler} onBlur={activateViewMode} value={title} autoFocus />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
};
