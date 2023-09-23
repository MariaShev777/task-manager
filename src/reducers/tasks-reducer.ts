import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";
import {TaskStatuses, TaskType} from "../api/tasks-api";


type ActionType =
    | AddTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT;

const initialState:TasksStateType = {}


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'ADD-TASK': {
            let newTask: TaskType = {id: v1(), title: action.payload.title, isDone: false};
            return {
                ...state,
                [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]
            };
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                    ? {...t, isDone: action.payload.status} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId
                    ? {...t, title: action.payload.title} : t)}
        }
        case "ADD-TODOLIST": {
            return {
                ...state,
                [action.payload.id]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copy = {...state}
            delete copy[action.payload.id]
            return copy;
        }
        default:
            return state;
    }
}


export type AddTaskAT = ReturnType<typeof addTaskAC>;
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId, title
        }
    } as const
}


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId, taskId
        }
    } as const
}


export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId, taskId, status
        }
    } as const
}


export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId, taskId, title
        }
    } as const
}






