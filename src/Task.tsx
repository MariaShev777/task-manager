import React, {ChangeEvent, useCallback} from "react";
import {EditableSpan} from "./EditableSpan";
import {TaskStatuses, TaskType} from "./api/tasks-api";

type TaskPropsType = {
    task: TaskType
    todolistId: string
    deleteTask: (todolistId: string, taskId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTaskStatus: (todolistId: string, taskId: string, status: TaskStatuses) => void
}

export const Task = React.memo((props: TaskPropsType) => {


    const removeTask = useCallback(() => {
        props.deleteTask(props.todolistId, props.task.id);
    }, [props.todolistId, props.task.id]);

    const changeTaskStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let newStatusValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.changeTaskStatus(props.todolistId, props.task.id, newStatusValue);
    }, [props.todolistId, props.task.id]);

    const changeTaskTitle = useCallback((title: string) => {
        props.changeTaskTitle(props.todolistId, props.task.id, title);
    }, [props.todolistId, props.task.id]);


    return (
        <div className={props.task.status === TaskStatuses.Completed ? 'done-tasks' : ''}>
            <input type="checkbox" checked={props.task.status === TaskStatuses.Completed} onChange={changeTaskStatus}/>
            <EditableSpan title={props.task.title} onChange={changeTaskTitle}/>
            <button onClick={removeTask}
                    style={{marginLeft: '10px', color: '#1f1f20', fontWeight: 'bold'}}>X</button>
        </div>
    )
});