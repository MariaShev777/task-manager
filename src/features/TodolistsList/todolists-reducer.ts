import {RESPONSE_RESULT, todolistsAPI, TodolistType} from "../../api/todolists-api";
import {Dispatch} from "redux";
import {RequestStatusType, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";


const initialState:TodolistDomainType[] = [
    /*{id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
   {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0}*/
];

export const todolistsReducer = (state = initialState, action: TodolistsActionType): TodolistDomainType[] => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all', entityStatus: 'idle'}))
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.payload.todolistId)
        }
        case 'ADD-TODOLIST': {
            return [...state, {...action.payload.todolist, filter: 'all', entityStatus: 'idle'}]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, title: action.payload.title} : tl)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, filter: action.payload.filter} : tl)
        }
        case 'CHANGE-ENTITY-STATUS': {
            return state.map(tl => tl.id === action.payload.todolistId ? {...tl, entityStatus: action.payload.entityStatus} : tl)
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

export const addTodolistAC = (todolist: TodolistType) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            todolist
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

export const changeEntityStatusAC = (todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'CHANGE-ENTITY-STATUS',
        payload: {
            todolistId,
            entityStatus
        }
    } as const
}



export const fetchTodolistsTC = () => (dispatch: Dispatch<TodolistsActionType>) => {
    dispatch(setAppStatusAC('loading'));
    todolistsAPI.getTodolists()
        .then((res) => {
            dispatch(setTodolistsAC(res.data));
            dispatch(setAppStatusAC('succeeded'));
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<TodolistsActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.createTodolist(title)
        .then((res) => {
            if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
                dispatch(addTodolistAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}

export const deleteTodolistTC = (todolistId: string) => (dispatch: Dispatch<TodolistsActionType>) => {
    dispatch(setAppStatusAC("loading"));
    dispatch(changeEntityStatusAC(todolistId, "loading"))
    todolistsAPI.deleteTodolist(todolistId)
        .then((res) => {
            if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
                dispatch(removeTodolistAC(todolistId));
                dispatch(setAppStatusAC("succeeded"));
                dispatch(changeEntityStatusAC(todolistId, "idle"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<TodolistsActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.updateTodolist(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
                dispatch(changeTodolistTitleAC(todolistId, title));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}



export type SetTodolistsAT = ReturnType<typeof setTodolistsAC>;
export type RemoveTodolistAT = ReturnType<typeof removeTodolistAC>;
export type AddTodolistAT = ReturnType<typeof addTodolistAC>;


export type TodolistsActionType =
    | RemoveTodolistAT
    | ReturnType<typeof changeTodolistFilterAC>
    | AddTodolistAT
    | ReturnType<typeof changeTodolistTitleAC>
    | SetTodolistsAT
    | SetAppStatusAT
    | SetAppErrorAT
    | ReturnType<typeof changeEntityStatusAC>;

export type FilterType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}