import React, {useState} from "react";
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterType = 'all' | 'active' | 'completed'


function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'CSS', isDone: false},
        {id: v1(), title: 'HTML', isDone: false},
        {id: v1(), title: 'UUID', isDone: true}
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    const deleteTask = (taskId: string) => {
        let nonDeletedTasks = tasks.filter(el => el.id !== taskId);
        setTasks(nonDeletedTasks)
    }

    const addTask = (title: string) => {
        let task =  {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks])
    }

    let filteredTasks = tasks

    if (filter === 'active') {
        filteredTasks = tasks.filter(el => !el.isDone)
    }

    if (filter === 'completed') {
        filteredTasks = tasks.filter(el => el.isDone)
    }

    const changeFilter = (value: FilterType) => {
        setFilter(value);
    }

    return (
        <div className='App'>
            <Todolist
                tasks={filteredTasks}
                title={'What to learn'}
                deleteTask={deleteTask}
                changeFilter={changeFilter}
                addTask={addTask}/>
        </div>
    )
}

export default App;
