import React, {useState} from "react";
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";


export type FilterType = 'all' | 'active' | 'completed'

export type TasksStateType = {
    [key: string]: TaskType[]
}

export type TodolistType = {
    id: string
    title: string
    filter: FilterType
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();


    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'}
    ])


    let [tasks, setTasks] = useState<TasksStateType>({
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
        let newTask =  {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [id]: [newTask, ...tasks[id]]});
    }
    const deleteTask = (id: string, taskId: string) => {
        // let nonDeletedTasks = tasks[id].filter(el => el.id !== taskId);
        // setTasks({...tasks, [id]: nonDeletedTasks});

        setTasks({...tasks, [id]: tasks[id].filter(t => t.id !== taskId)})
    }
    const changeStatus = (id: string, taskId: string, status: boolean) => {
        setTasks({...tasks, [id]: tasks[id].map(t => t.id === taskId
                ? {...t, isDone:status} : t)});
    }
    const changeTaskTitle = (id: string, taskId: string, title: string) => {
        setTasks({...tasks, [id]: tasks[id].map(t => t.id === taskId
                ? {...t, title} : t)});
    }


    const addTodolist = (title: string) => {
        let newTodolistId = v1();
        let newTodolist:TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        setTodolists([newTodolist, ...todolists]);
        setTasks({...tasks, [newTodolistId]: []});
    }
    const removeTodolist = (id: string) => {
        setTodolists(todolists.filter(tl => tl.id !== id));
        delete tasks[id];
    }
    const changeFilter = (id: string, value: FilterType) => {
        setTodolists(todolists.map(tl => tl.id === id ? {...tl, filter: value} : tl));
    }
    const changeTodolistTitle = (id: string, title: string) => {
        setTodolists(todolists.map(tl => tl.id === id ? {...tl, title} : tl));
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

export default App;
