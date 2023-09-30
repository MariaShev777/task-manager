import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan";
import s from './Todolist.module.css';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {FilterType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";
import {RequestStatusType} from "../../../app/app-reducer";
import {TASK_STATUSES, TaskType} from "../../../api/todolists-api";


type TodolistPropsType = {
    todolistId: string
    tasks: TaskType[]
    title: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TASK_STATUSES) => void
    filter: FilterType
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    entityStatus: RequestStatusType
}


export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useAppDispatch();

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
        tasksForTodolist = props.tasks.filter(t => t.status === TASK_STATUSES.New);
    }

    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TASK_STATUSES.Completed);
    }

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolistId));
    }, [])




    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.entityStatus === 'loading'}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
            <div className={s.taskStyle}>
                {tasksForTodolist.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolistId}
                        deleteTask={props.deleteTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeStatus}
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
