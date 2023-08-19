import React from "react";
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


    const addTask = (id: string, title: string) => {
        dispatch(addTaskAC(id, title));
    }
    const deleteTask = (id: string, taskId: string) => {
        dispatch(removeTaskAC(id, taskId));
    }
    const changeStatus = (id: string, taskId: string, status: boolean) => {
        dispatch(changeTaskStatusAC(id, taskId, status));
    }
    const changeTaskTitle = (id: string, taskId: string, title: string) => {
        dispatch(changeTaskTitleAC(id, taskId, title));
    }


    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatch(action);

    }
    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id));
    }
    const changeFilter = (id: string, value: FilterType) => {
        dispatch(changeTodolistFilterAC(id, value));
    }
    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title));
    }


    return (
        <div className='App'>
            <div className={'frame'}>
                <AddItemForm addItem={addTodolist} />
            </div>

            {todolists.map(tl => {

                let allTodolistTasks = tasks[tl.id];
                let filteredTasks = allTodolistTasks;

                if (tl.filter === 'active') {
                    filteredTasks = allTodolistTasks.filter(el => !el.isDone);
                }

                if (tl.filter === 'completed') {
                    filteredTasks = allTodolistTasks.filter(el => el.isDone);
                }

                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        filter={tl.filter}
                        tasks={filteredTasks}
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
