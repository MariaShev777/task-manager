import {v1} from "uuid";
import {todolistsApi, TodolistType} from "../api/todolists-api";
import {Dispatch} from "redux";

export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>;
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;
export type ChangeTodolistTitleAT = ReturnType<typeof changeTodolistTitleAC>;
export type ChangeTodolistFilterAT = ReturnType<typeof changeTodolistFilterAC>;

export type TodolistsActionType =
    | RemoveTodolistAT
    | ChangeTodolistFilterAT
    | AddTodolistAT
    | ChangeTodolistTitleAT
    | SetTodolistsAT;

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
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        // case 'ADD-TODOLIST': {
        //     let newTodolist: TodolistDomainType = {id: action.payload.todolistId, title: action.payload.title, filter: "all"};
        //     return ([newTodolist, ...state]);
        // }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        default:
            return state;
    }
}


export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: 'SET-TODOLISTS',
        payload: {
            todolists
        }
    } as const
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            todolistId
        }
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolistId: v1(), title
        }
    } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            todolistId,
            title
        }
    } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            filter
        }
    } as const
}



export const fetchTodolistsTC = () => (dispatch: Dispatch) => {
    todolistsApi.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
}


