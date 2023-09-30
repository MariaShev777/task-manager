import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import TextField from '@mui/material/TextField';
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";


type PropsType = {
    addItem: (title: string) => void
    name?: string
    disabled?: boolean
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

    const buttonStyle = {
        width: '25px',
        height: '25px',
        color: 'white',
        backgroundColor: '#8b64fd',
        borderRadius: '5px',
        marginTop: '7px'
    }

    return (
        <div>
            <TextField variant="outlined"
                       error={!!error}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyDown={onKeyDownHandler}
                       label={props.name || "Title"}
                       helperText={error}
                       disabled={props.disabled}
            />

            <Button  onClick={addTask} disabled={props.disabled}>
                <AddIcon style={buttonStyle}/>
            </Button>
        </div>
    )
});
