import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@mui/icons-material";
import Button from "@mui/material/Button";


type PropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = React.memo((props: PropsType) => {
    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addItem(title.trim());
            setTitle("");
        } else {
            setError("TITLE IS REQUIRED");
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
            <input value={title} onChange={onChangeHandler} className={error ? "error" : ""} onKeyDown={onKeyDownHandler}/>
            <Button onClick={addTask}><AddBox/></Button>

            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
});
