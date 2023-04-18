import React from "react";
import {TasksType} from "./App";


type TodolistPropsType = {
    tasks: TasksType[]
    heading: string
}


export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.heading}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(el => {
                    return (
                        <li><input type="checkbox" checked={el.isDone}/><span>{el.title}</span></li>
                    )
                })}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
};
