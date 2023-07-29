import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import s from './Todolist.module.css';
import {FilterType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    id: string
    tasks: TaskType[]
    title: string
    deleteTask: (id: string, taskId: string) => void
    changeFilter: (id: string, value: FilterType) => void
    addTask: (id: string, title: string) => void
    changeStatus: (id: string, taskId: string, status: boolean) => void
    filter: FilterType
    removeTodolist: (id: string) => void
}


export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(props.id, title.trim());
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

    const onAllClickHandler = () => {
        props.changeFilter(props.id, 'all');
    }

    const onActiveClickHandler = () => {
        props.changeFilter(props.id, 'active');
    }

    const onCompletedClickHandler = () => {
        props.changeFilter(props.id, 'completed');
    }

    const onClickHandler = () => {
        props.removeTodolist(props.id);
    }


    return (
        <div className={s.frame}>
            <h3>{props.title} <button onClick={onClickHandler}>DELETE</button></h3>
            <div>
                <input value={title} onChange={onChangeHandler} className={error ? 'error' : ''}/>
                <button onClick={addTask} onKeyDown={onKeyDownHandler}>+</button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {props.tasks.map(el => {

                    const onClickHandler = () => {
                        props.deleteTask(props.id, el.id);
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.id, el.id, e.currentTarget.checked);
                    }

                    return (
                        <li className={el.isDone ? 'done-tasks' : ''}>
                            <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                            <span>{el.title}</span>
                            <button onClick={onClickHandler}
                                    style={{marginLeft: '10px', color: 'deeppink', fontWeight: 'bold'}}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-button' : ''}
                    onClick={onAllClickHandler}>All</button>
                <button className={props.filter === 'active' ? 'active-button' : ''}
                    onClick={onActiveClickHandler}>Active</button>
                <button className={props.filter === 'completed' ? 'active-button' : ''}
                    onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
};
