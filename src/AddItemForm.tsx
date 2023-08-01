import React, {ChangeEvent, KeyboardEvent, useState} from "react";


type PropsType = {
    addItem: (title: string) => void
}


export const AddItemForm = (props: PropsType) => {

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

    const onKeyDownHandler = (event: KeyboardEvent<HTMLButtonElement>) => {
        setError(null);
        if (event.key === "Enter") {
            addTask();
        }
    }

    return (
        <div>
            <input value={title} onChange={onChangeHandler} className={error ? "error" : ""}/>
            <button onClick={addTask} onKeyDown={onKeyDownHandler}>+</button>

            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
};