import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistAT, RemoveTodolistAT, setTodolistsAC, SetTodolistsAT} from "./todolists-reducer";
import {tasksApi, TaskStatuses, TaskType} from "../api/tasks-api";
import {Dispatch} from "redux";


export type AddTaskAT = ReturnType<typeof addTaskAC>;
export type RemoveTaskAT = ReturnType<typeof removeTaskAC>;
export type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>;
export type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>;
export type SetTasksAT = ReturnType<typeof setTasksAC>;


type ActionType =
    | AddTaskAT
    | RemoveTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | SetTasksAT;

const initialState:TasksStateType = {
    /*"todolistId1": [
       { id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ],
   "todolistId2": [
       { id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low },
       { id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", description: '',
           startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low }
   ]*/
}


export const tasksReducer = (state = initialState, action: ActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            let copy = {...state};
            action.payload.todolists.forEach((tl) => {
                copy[tl.id] = []
            })
            return copy
        }
        case 'SET-TASKS': {
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            }
        }
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
                [action.payload.todolistId]: []
            }
        }
        case "REMOVE-TODOLIST": {
            let copy = {...state}
            delete copy[action.payload.todolistId]
            return copy;
        }
        default:
            return state;
    }
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: 'SET-TASKS',
        payload: {
            todolistId, tasks
        }
    } as const
}

export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId, title
        }
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId, taskId
        }
    } as const
}

export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId, taskId, status
        }
    } as const
}

export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId, taskId, title
        }
    } as const
}


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    tasksApi.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
}



