import React, {ChangeEvent, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {EditableSpan} from "./EditableSpan";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

type TaskPropsType = {
    task: TaskType
    todolistId: string
}

export const Task = React.memo(({todolistId, task}: TaskPropsType) => {
    const dispatch = useDispatch();

    const removeTask = () => {
        dispatch(removeTaskAC(todolistId, task.id));
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, task.id, e.currentTarget.checked));
    }

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todolistId, task.id, title));
    }, [dispatch, todolistId, task.id]);


    return (
        <div className={task.isDone ? 'done-tasks' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
            <EditableSpan title={task.title} onChange={changeTaskTitle}/>
            <button onClick={removeTask}
                    style={{marginLeft: '10px', color: '#1f1f20', fontWeight: 'bold'}}>X</button>
        </div>
    )
});