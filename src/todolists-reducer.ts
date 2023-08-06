import {TodolistType} from "./App";


type ActionType = any;
export const todolistsReducer = (state: TodolistType[], action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        default:
            return state;
    }
}
