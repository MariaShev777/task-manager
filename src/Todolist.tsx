import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import s from './Todolist.module.css';
import {FilterType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    tasks: TasksType[]
    title: string
    deleteTask: (taskId: string) => void
    changeFilter: (value: FilterType) => void
    addTask: (title: string) => void
    changeStatus: (taskId: string, status: boolean) => void
    filter: FilterType
}


export const Todolist = (props: TodolistPropsType) => {

    const [title, setTitle] = useState('');
    const [error, setError] = useState<string | null>(null);

    const addTask = () => {
        if (title.trim() !== "") {
            props.addTask(title.trim());
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

    const changeFilterHandler = (value: FilterType) => {
        props.changeFilter(value);
    }

    return (
        <div className={s.frame}>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler} className={error ? 'error' : ''}/>
                <button onClick={addTask} onKeyDown={onKeyDownHandler}>+</button>
            </div>
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {props.tasks.map(el => {

                    const onClickHandler = () => {
                        props.deleteTask(el.id);
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(el.id, e.currentTarget.checked);
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
                    onClick={() => changeFilterHandler('all')}>All</button>
                <button className={props.filter === 'active' ? 'active-button' : ''}
                    onClick={() => changeFilterHandler('active')}>Active</button>
                <button className={props.filter === 'completed' ? 'active-button' : ''}
                    onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};
