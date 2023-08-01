import React, {ChangeEvent, useState} from "react";


type PropsType = {
    title: string
    onChange: (title: string) => void
}


const EditableSpan = (props: PropsType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title)

    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    }


    return (
        editMode
            ? <input onChange={onChangeHandler} onBlur={activateViewMode} value={title} autoFocus/>
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};

export default EditableSpan;