import React, {ChangeEvent} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import s from './Todolist.module.css';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";

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
    changeTaskTitle: (id: string, taskId: string, title: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}


export const Todolist = (props: TodolistPropsType) => {

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

    const addTask = (title: string) => {
        props.addTask(props.id, title);
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title);
    }

    return (
        <div className={'frame'}>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={onClickHandler}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div className={s.taskStyle}>
                {props.tasks.map(el => {

                    const onClickHandler = () => {
                        props.deleteTask(props.id, el.id);
                    }

                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeStatus(props.id, el.id, e.currentTarget.checked);
                    }

                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, el.id, title);
                    }

                    return (
                        <div className={el.isDone ? 'done-tasks' : ''} key={el.id}>
                            <input type="checkbox" checked={el.isDone} onChange={onChangeHandler}/>
                            <EditableSpan title={el.title} onChange={changeTaskTitle}/>
                            <button onClick={onClickHandler}
                                    style={{marginLeft: '10px', color: 'deeppink', fontWeight: 'bold'}}>X</button>
                        </div>
                    )
                })}
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}>All</Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
};
