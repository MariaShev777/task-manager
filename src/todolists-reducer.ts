import {FilterType, TodolistType} from "./App";
import {v1} from "uuid";


export type TodolistsActionType =
    | RemoveTodolistAT
    | ChangeTodolistFilterAT
    | AddTodolistAT
    | ChangeTodolistTitleAT;


export const todolistsReducer = (state: TodolistType[], action: TodolistsActionType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.id, title: action.payload.title, filter: "all"};
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


export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id
        }
    } as const
}


export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            id: v1(), title
        }
    } as const
}


export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = ( id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id,
            title
        }
    } as const
}


export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;
export const changeTodolistFilterAC = (id: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id,
            filter
        }
    } as const
}






