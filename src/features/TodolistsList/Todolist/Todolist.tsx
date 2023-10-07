import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../../../components/AddItemForm";
import {EditableSpan} from "../../../components/EditableSpan";
import s from './Todolist.module.css';
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task/Task";
import {FilterType, TodolistDomainType} from "../todolists-reducer";
import {fetchTasksTC} from "../tasks-reducer";
import {useAppDispatch} from "../../../app/store";
import {TASK_STATUSES, TaskType} from "../../../api/todolists-api";


type TodolistPropsType = {
    todolist: TodolistDomainType
    tasks: TaskType[]
    deleteTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: FilterType) => void
    addTask: (todolistId: string, title: string) => void
    changeStatus: (todolistId: string, taskId: string, status: TASK_STATUSES) => void
    deleteTodolist: (todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
}


export const Todolist = React.memo((props: TodolistPropsType) => {
    const dispatch = useAppDispatch();

    const removeTodolist = () => {
        props.deleteTodolist(props.todolist.id);
    }

    const addTask = useCallback((title: string) => {
        props.addTask(props.todolist.id, title);
    }, [props.addTask, props.todolist.id]);

    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.todolist.id, title)
    }, [props.changeTodolistTitle, props.todolist.id]);


    const onAllClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "all");
    }, [props.changeFilter, props.todolist.id]);

    const onActiveClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "active");
    }, [props.changeFilter, props.todolist.id]);

    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter(props.todolist.id, "completed");
    }, [props.changeFilter, props.todolist.id]);


    let tasksForTodolist = props.tasks;

    if (props.todolist.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TASK_STATUSES.New);
    }

    if (props.todolist.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TASK_STATUSES.Completed);
    }

    useEffect(() => {
        dispatch(fetchTasksTC(props.todolist.id));
    }, [])




    return (
        <div>
            <h3>
                <EditableSpan title={props.todolist.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} disabled={props.todolist.entityStatus === 'loading'}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask} disabled={props.todolist.entityStatus === 'loading'}/>
            <div className={s.taskStyle}>
                {tasksForTodolist.map(t => {
                    return <Task
                        key={t.id}
                        task={t}
                        todolistId={props.todolist.id}
                        deleteTask={props.deleteTask}
                        changeTaskTitle={props.changeTaskTitle}
                        changeTaskStatus={props.changeStatus}
                    />
                })}
            </div>
            <div>
                <Button variant={props.todolist.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}>All</Button>
                <Button variant={props.todolist.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button variant={props.todolist.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    );
});
