import {v1} from "uuid";
import {TodolistType} from "../api/todolists-api";


export type TodolistsActionType =
    | RemoveTodolistAT
    | ChangeTodolistFilterAT
    | AddTodolistAT
    | ChangeTodolistTitleAT;

export type FilterType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterType
}
const initialState:TodolistDomainType[] = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
   {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export const todolistsReducer = (state = initialState, action: TodolistsActionType): TodolistDomainType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.todolistId, title: action.payload.title, filter: "all"};
            return ([newTodolist, ...state]);
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state;
    }
}


export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}


export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(), title
        }
    } as const
}


export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}


export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}






