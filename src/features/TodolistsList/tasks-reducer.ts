import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {AddTodolistAT, RemoveTodolistAT, SetTodolistsAT} from "./todolists-reducer";
import {SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {
    RESPONSE_RESULT, TASK_PRIORITIES, TASK_STATUSES,
    TaskType,
    todolistsAPI,
    UpdateTaskModelType
} from "../../api/todolists-api";


const initialState: TasksStateType = {
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




export const tasksReducer = (state = initialState, action: TasksActionType): TasksStateType => {
    switch (action.type) {
        case 'SET-TODOLISTS': {
            let copy = {...state};
            action.payload.todolists.forEach((tl) => {
                copy[tl.id] = []
            })
            return copy
        }
        case 'SET-TASKS': {
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        }
        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            };
        }
        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)
            }
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(t => t.id === action.payload.taskId ? {...t, ...action.payload.model} : t)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolist.id]: []}
        }
        case 'REMOVE-TODOLIST': {
            let copy = {...state}
            delete copy[action.payload.todolistId]
            return copy;
        }
        default:
            return state;
    }
}


export type TasksStateType = {
    [key: string]: TaskType[]
}


export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        payload: {
            todolistId, tasks
        }
    } as const
}

export const addTaskAC = (task: TaskType) => {
    return {
        type: "ADD-TASK",
        payload: {
            task
        }
    } as const
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId, taskId
        }
    } as const
}

export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return {
        type: "UPDATE-TASK",
        payload: {
            todolistId, taskId, model
        }
    } as const
}


export const fetchTasksTC = (todolistId: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items));
            dispatch(setAppStatusAC("succeeded"));
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
                dispatch(removeTaskAC(todolistId, taskId));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}

export const addTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch<TasksActionType>) => {
    dispatch(setAppStatusAC("loading"));
    todolistsAPI.createTask(todolistId, title)
        .then((res) => {
            if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
                dispatch(addTaskAC(res.data.data.item));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) =>
    (dispatch: Dispatch<TasksActionType>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId);

        if (!task) {
            console.warn("task not found in the state");
            return
        }

        const apiModel: UpdateTaskModelType = {
            deadline: task.deadline,
            description: task.description,
            priority: task.priority,
            startDate: task.startDate,
            title: task.title,
            status: task.status,
            ...domainModel
        }

        dispatch(setAppStatusAC("loading"));
        todolistsAPI.updateTask(todolistId, taskId, apiModel)
            .then((res) => {
                if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
                    dispatch(updateTaskAC(todolistId, taskId, domainModel));
                    dispatch(setAppStatusAC("succeeded"));
                } else {
                    handleServerAppError(res.data, dispatch);
                }
            })
            .catch((e) => {
                handleServerNetworkError(e.message, dispatch);
            })
    }


export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: TASK_STATUSES
    priority?: TASK_PRIORITIES
    startDate?: string
    deadline?: string
}



type TasksActionType =
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof updateTaskAC>
    | AddTodolistAT
    | RemoveTodolistAT
    | SetTodolistsAT
    | ReturnType<typeof setTasksAC>
    | SetAppStatusAT
    | SetAppErrorAT;
