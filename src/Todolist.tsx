import React, {useCallback} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import s from './Todolist.module.css';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {TaskStatuses, TaskType} from "./api/tasks-api";
import {FilterType} from "./reducers/todolists-reducer";


type TodolistPropsType = {
    todolistId: string
    tasks: TaskType[]
    title: string
    deleteTask: (id: string, taskId: string) => void
    changeFilter: (id: string, value: FilterType) => void
    addTask: (id: string, title: string) => void
    changeStatus: (id: string, taskId: string, status: TaskStatuses) => void
    filter: FilterType
    deleteTodolist: (id: string) => void
    changeTaskTitle: (id: string, taskId: string, title: string) => void
    changeTodolistTitle: (id: string, title: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {

    const removeTodolist = () => {
        props.deleteTodolist(props.todolistId);
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolistId, title);
    }, [props.addTask, props.todolistId]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolistId, title)
    }, [props.changeTodolistTitle, props.todolistId]);


    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "all");
    }, [props.changeFilter, props.todolistId]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "active");
    }, [props.changeFilter, props.todolistId]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolistId, "completed");
    }, [props.changeFilter, props.todolistId]);


    let tasksForTodolist = props.tasks;

    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New);
    }

    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed);
    }

    return (
        <div className={'frame'}>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} />
            <div className={s.taskStyle}>
                {tasksForTodolist.map(el => {
                    return <Task
                        key={el.id}
                        task={el}
                        todolistId={props.todolistId}
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
