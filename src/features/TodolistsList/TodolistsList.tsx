import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    deleteTodolistTC, fetchTodolistsTC,
    FilterType,
    TodolistDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {createTaskTC, deleteTaskTC, updateTaskTC} from "./tasks-reducer";
import {TaskStatuses} from "../../api/tasks-api";
import {TasksStateType} from "../../app/App";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm";
import {Todolist} from "./Todolist/Todolist";


export const TodolistsList: React.FC = () => {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchTodolistsTC());
    }, [])


    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(createTaskTC(todolistId, title));
    }, [])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId));
    }, [])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TaskStatuses) => {
        dispatch(updateTaskTC(todolistId, taskId, {status}));
    }, [])

    const changeTaskTitle = useCallback((todolistId: string, taskId: string, title: string) => {
        dispatch(updateTaskTC(todolistId, taskId, {title}));
    }, [])


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title));
    }, [])

    const deleteTodolist = useCallback((todolistId: string) => {
        dispatch(deleteTodolistTC(todolistId));
    }, [])

    const changeFilter = useCallback((todolistId: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(todolistId, value));
    }, [])

    const changeTodolistTitle = useCallback((todolistId: string, title: string) => {
        dispatch(changeTodolistTitleTC(todolistId, title));
    }, [])


    return <>

        <Grid container spacing={5}>
            {todolists.map(tl => {

                return <Grid key={tl.id} className={"todolistFrame"} >
                        <Todolist
                            key={tl.id}
                            todolistId={tl.id}
                            filter={tl.filter}
                            tasks={tasks[tl.id]}
                            title={tl.title}
                            deleteTask={deleteTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeStatus={changeStatus}
                            deleteTodolist={deleteTodolist}
                            changeTaskTitle={changeTaskTitle}
                            changeTodolistTitle={changeTodolistTitle}/>
                </Grid>


            })
            }
            <Grid  xs={3.35} className={"addFrame"}>
                <AddItemForm addItem={addTodolist} className={'buttonToAdd'}/>
            </Grid>
        </Grid>

    </>
}
