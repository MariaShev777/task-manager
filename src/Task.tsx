import React, {ChangeEvent, useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import EditableSpan from "./EditableSpan";
import {AppRootStateType} from "./state/store";
import {TaskType} from "./Todolist";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./reducers/tasks-reducer";

type TaskPropsType = {
    taskId: string
    todolistId: string
}

export const Task = React.memo(({todolistId, taskId}: TaskPropsType) => {
    const task = useSelector<AppRootStateType, TaskType>(state => state.tasks[todolistId].find(t => t.id === taskId) as TaskType);
    const dispatch = useDispatch();

    const removeTask = () => {
        dispatch(removeTaskAC(todolistId, taskId));
    }

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolistId, taskId, e.currentTarget.checked));
    }

    const changeTaskTitle = useCallback((title: string) => {
        dispatch(changeTaskTitleAC(todolistId, taskId, title));
    }, [dispatch, todolistId, taskId]);


    return (
        <div className={task.isDone ? 'done-tasks' : ''}>
            <input type="checkbox" checked={task.isDone} onChange={changeTaskStatus}/>
            <EditableSpan title={task.title} onChange={changeTaskTitle}/>
            <button onClick={removeTask}
                    style={{marginLeft: '10px', color: 'deeppink', fontWeight: 'bold'}}>X</button>
        </div>
    )
});