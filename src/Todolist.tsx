import React from "react";
import s from './Todolist.module.css';
import {FilterType} from "./App";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    tasks: TasksType[]
    heading: string
    deleteTask: (taskId: number) => void
    changeFilter: (value: FilterType) => void
}


export const Todolist = (props: TodolistPropsType) => {
    return (
        <div className={s.frame}>
            <h3>{props.heading}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                            <button onClick={() => props.deleteTask(el.id)} style={{marginLeft: '10px', color: 'deeppink', fontWeight: 'bold'}}>X</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
};
