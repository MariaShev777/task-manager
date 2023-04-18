import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TasksType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const heading1 = 'What to learn'
    const heading2 = 'What to watch'


    const tasks1:TasksType[] = [
        {id: 1, title: 'JS', isDone: true},
        {id: 2, title: 'CSS', isDone: false},
        {id: 3, title: 'HTML', isDone: false}
    ]

    const tasks2:TasksType[] = [
        {id: 1, title: 'ReactJS', isDone: false},
        {id: 2, title: 'Movie', isDone: true},
        {id: 3, title: 'YouTube', isDone: false},
        {id: 4, title: 'Comedy', isDone: false}
    ]


    return (
        <div className='App'>
            <Todolist tasks={tasks1} heading={heading1}/>
            <Todolist tasks={tasks2} heading={heading2}/>
        </div>
    )
}

export default App;
