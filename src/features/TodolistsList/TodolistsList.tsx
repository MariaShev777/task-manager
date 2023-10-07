import {useAppDispatch, useAppSelector} from "../../app/store";
import {
    addTodolistTC,
    changeTodolistFilterAC, changeTodolistTitleTC,
    deleteTodolistTC, fetchTodolistsTC,
    FilterType,
    TodolistDomainType
} from "./todolists-reducer";
import React, {useCallback, useEffect} from "react";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "./tasks-reducer";
import {TasksStateType} from "../../app/App";
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../../components/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import {TASK_STATUSES} from "../../api/todolists-api";
import {Navigate} from "react-router-dom";


export const TodolistsList: React.FC = () => {

    const todolists = useAppSelector<TodolistDomainType[]>(state => state.todolists);
    const tasks = useAppSelector<TasksStateType>(state => state.tasks);
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isLoggedIn) {
            return;
        }

        dispatch(fetchTodolistsTC());
    }, [])


    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskTC(todolistId, title));
    }, [])

    const deleteTask = useCallback((todolistId: string, taskId: string) => {
        dispatch(deleteTaskTC(todolistId, taskId));
    }, [])

    const changeStatus = useCallback((todolistId: string, taskId: string, status: TASK_STATUSES) => {
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

    if (!isLoggedIn) {
        return <Navigate to='/login'/>;
    }

    return <>

        <Grid container className={"todolistsListFrame"}>
            {todolists.map(tl => {

                return <Grid key={tl.id} className={"todolistFrame"} >
                        <Todolist
                            key={tl.id}
                            todolist={tl}
                            tasks={tasks[tl.id]}
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
            <Grid className={"addFrame"}>
                <AddItemForm addItem={addTodolist} name={'New TO-DO list'}/>
            </Grid>
        </Grid>

    </>
}
