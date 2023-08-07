import {FilterType, TodolistType} from "./App";
import {v1} from "uuid";


type ActionType =
    | RemoveTodolistAT
    | ChangeTodolistFilterAT
    | AddTodolistAT
    | ChangeTodolistTitleAT;


export const todolistsReducer = (state: TodolistType[], action: ActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolistId = v1();
            let newTodolist: TodolistType = {id: newTodolistId, title: action.payload.title, filter: "all"};
            return ([...state, newTodolist]);
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.id ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state;
    }
}


export type RemoveTodolistAT = ReturnType<typeof RemoveTodolistAC>;
export const RemoveTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}


export type AddTodolistAT = ReturnType<typeof AddTodolistAC>;
export const AddTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title
        }
    } as const
}


export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>;
export const ChangeTodolistTitleAC = ( id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}


export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>;
export const ChangeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}






