import React, {useCallback} from "react";
import {FilterType} from "./App";
import {AddItemForm} from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import s from './Todolist.module.css';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";

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


export const Todolist = React.memo((props: TodolistPropsType) => {

    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'all');
    }, [props.changeFilter, props.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'active');
    }, [props.changeFilter, props.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.id, 'completed');
    }, [props.changeFilter, props.id]);

    const onClickHandler = () => {
        props.removeTodolist(props.id);
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.id, title);
    }, [props.addTask, props.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title)
    }, [props.changeTodolistTitle, props.id]);


    let tasksForTodolist = props.tasks;

    if (props.filter === 'active') {
        tasksForTodolist = props.tasks.filter(el => !el.isDone);
    }

    if (props.filter === 'completed') {
        tasksForTodolist = props.tasks.filter(el => el.isDone);
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
                {tasksForTodolist.map(el => {
                    return <Task
                        key={el.id}
                        taskId={el.id}
                        todolistId={props.id}
                    />
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
});
