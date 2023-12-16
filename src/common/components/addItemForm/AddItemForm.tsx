import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import TextField from '@mui/material/TextField';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import { BaseResponse } from 'common/types';

type Props = {
  addItem: (title: string) => Promise<unknown>;
  name?: string;
  disabled?: boolean;
};

export const AddItemForm = React.memo(({ addItem, name, disabled }: Props) => {
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const addItemHandler = () => {
    if (title.trim() !== '') {
      addItem(title.trim())
        .then(() => {
          setTitle('');
        })
        .catch((err: BaseResponse) => {
          setError(err?.messages[0]);
        });
    } else {
      setError('Title is required');
    }
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value);
  };

  const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null);
    }
    if (event.key === 'Enter') {
      addItemHandler();
    }
  };

  const buttonStyle = {
    width: '25px',
    height: '25px',
    color: 'white',
    backgroundColor: '#8b64fd',
    borderRadius: '5px',
    marginTop: '7px',
  };

  return (
    <div>
      <TextField
        variant="outlined"
        error={!!error}
        value={title}
        onChange={onChangeHandler}
        onKeyDown={onKeyDownHandler}
        label={name || 'Title'}
        helperText={error}
        disabled={disabled}
      />

      <Button onClick={addItemHandler} disabled={disabled}>
        <AddIcon style={buttonStyle} />
      </Button>
    </div>
  );
});
