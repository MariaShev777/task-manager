import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistAT, RemoveTodolistAT} from "./todolists-reducer";


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
                [action.payload.id]: [newTask, ...state[action.payload.id]]
            };
        }
        case 'REMOVE-TASK': {
            return {...state, [action.payload.id]: state[action.payload.id].filter(t => t.id !== action.payload.taskId)}
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state, [action.payload.id]: state[action.payload.id].map(t => t.id === action.payload.taskId
                    ? {...t, isDone: action.payload.status} : t)
            }
        }
        case 'CHANGE-TASK-TITLE': {
            return {...state, [action.payload.id]: state[action.payload.id].map(t => t.id === action.payload.taskId
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
export const addTaskAC = (id: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            id, title
        }
    } as const
}


export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export const removeTaskAC = (id: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id, taskId
        }
    } as const
}


export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export const changeTaskStatusAC = (id: string, taskId: string, status: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            id, taskId, status
        }
    } as const
}


export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;
export const changeTaskTitleAC = (id: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            id, taskId, title
        }
    } as const
}






