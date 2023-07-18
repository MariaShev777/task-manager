import React, {useState} from "react";
import './App.css';
import {Todolist} from "./Todolist";


export type FilterType = 'all' | 'active' | 'completed'


function App() {
    const heading = 'What to learn'

    let [tasks, setTasks] = useState([
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'HTML', isDone: false}
    ])

    let [filter, setFilter] = useState<FilterType>('all')

    const deleteTask = (taskId: number) => {
        let nonDeletedTasks = tasks.filter(el => el.id !== taskId);
        setTasks(nonDeletedTasks)
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

    // const changeFilter = (value: FilterType) => {
    //     setFilter(value);
    // }


    return (
        <div className='App'>
            <Todolist
                tasks={filteredTasks}
                heading={heading}
                deleteTask={deleteTask}
                changeFilter={changeFilter}/>
        </div>
    )
}

export default App;
