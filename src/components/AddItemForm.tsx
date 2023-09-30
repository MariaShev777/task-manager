import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";


type PropsType = {
    addItem: (title: string) => void
    className?: string
}


export const AddItemForm = React.memo((props: PropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value);
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null);
        }
        if (event.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       label="Title"
                       helperText={error}
            />

            <Button onClick={addTask}>
                <AddIcon className={props.className} sx={{ width: '27px', height: '27px'}} />
            </Button>
        </div>
    )
});
