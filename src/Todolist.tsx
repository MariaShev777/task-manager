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
}


export const Todolist = (props: TodolistPropsType) => {

    let [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title);
        setTitle('');
    }

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const onKeyDownHandler = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }

    const changeFilterHandler = (value: FilterType) => {
        props.changeFilter(value)
    }

    return (
        <div className={s.frame}>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeHandler}/>
                <button onClick={addTask} onKeyDown={onKeyDownHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {

                    const onClickHandler = () => {
                        props.deleteTask(el.id)
                    }
                    return (
                        <li>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={onClickHandler}
                                    style={{marginLeft: '10px', color: 'deeppink', fontWeight: 'bold'}}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => changeFilterHandler('all')}>All</button>
                <button onClick={() => changeFilterHandler('active')}>Active</button>
                <button onClick={() => changeFilterHandler('completed')}>Completed</button>
            </div>
        </div>
    );
};
