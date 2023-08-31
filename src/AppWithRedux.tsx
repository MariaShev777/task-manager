import React, {useCallback} from "react";
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type FilterType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function AppWithRedux() {

    const todolists = useSelector<AppRootStateType, TodolistType[]>(state => state.todolists);
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
    const dispatch = useDispatch();


    const addTask = useCallback((id: string, title: string) => {
        dispatch(addTaskAC(id, title));
    }, [dispatch]);
    const deleteTask = useCallback((id: string, taskId: string) => {
        dispatch(removeTaskAC(id, taskId));
    }, [dispatch]);
    const changeStatus = useCallback((id: string, taskId: string, status: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, status));
    }, [dispatch]);
    const changeTaskTitle = useCallback((id: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(id, taskId, title));
    }, [dispatch]);


    const addTodolist = useCallback((title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);

    }, [dispatch]);
    const removeTodolist = useCallback((id: string) => {
        dispatch(removeTodolistAC(id));
    }, [dispatch]);
    const changeFilter = useCallback((id: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(id, value));
    }, [dispatch]);
    const changeTodolistTitle = useCallback((id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
    }, [dispatch]);


    return (
        <div className='App'>
            <div className={'frame'}>
                <AddItemForm addItem={addTodolist} />
            </div>

            {todolists.map(tl => {
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        filter={tl.filter}
                        tasks={tasks[tl.id]}
                        title={tl.title}
                        deleteTask={deleteTask}
                        changeFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        removeTodolist={removeTodolist}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}/>
                )
            })}

        </div>
    )
}

export default AppWithRedux;
