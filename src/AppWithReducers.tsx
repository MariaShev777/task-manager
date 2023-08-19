import React, {Reducer, useReducer} from "react";
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC,
    TodolistsActionType,
    todolistsReducer
} from "./todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";


export type FilterType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function AppWithReducers() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, dispatchToTodolists] = useReducer<Reducer<TodolistType[], TodolistsActionType>>(todolistsReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])


    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'Math', isDone: false},
            {id: v1(), title: 'IT', isDone: true},
            {id: v1(), title: 'Music', isDone: false}
        ],
        [todolistID2]: [
            {id: v1(), title: 'Skirt', isDone: false},
            {id: v1(), title: 'Cream', isDone: false},
            {id: v1(), title: 'Mascara', isDone: true},
            {id: v1(), title: 'Book', isDone: false}
        ],
})

    const addTask = (id: string, title: string) => {
        dispatchToTasks(addTaskAC(id, title));
    }
    const deleteTask = (id: string, taskId: string) => {
        dispatchToTasks(removeTaskAC(id, taskId));
    }
    const changeStatus = (id: string, taskId: string, status: boolean) => {
        dispatchToTasks(changeTaskStatusAC(id, taskId, status));
    }
    const changeTaskTitle = (id: string, taskId: string, title: string) => {
        dispatchToTasks(changeTaskTitleAC(id, taskId, title));
    }


    const addTodolist = (title: string) => {
        const action = addTodolistAC(title);
        dispatchToTodolists(action);
        dispatchToTasks(action);

    }
    const removeTodolist = (id: string) => {
        dispatchToTodolists(removeTodolistAC(id));
        dispatchToTasks(removeTodolistAC(id));
        // delete tasks[id];
    }
    const changeFilter = (id: string, value: FilterType) => {
        dispatchToTodolists(changeTodolistFilterAC(id, value));
    }
    const changeTodolistTitle = (id: string, title: string) => {
        dispatchToTodolists(changeTodolistTitleAC(id, title));
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

export default AppWithReducers;
