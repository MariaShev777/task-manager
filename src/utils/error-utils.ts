import {setAppErrorAC, SetAppErrorAT, setAppStatusAC, SetAppStatusAT} from "../app/app-reducer"
import {Dispatch} from 'redux'
import {ResponseType} from "../api/todolists-api";


export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: string, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error));
    dispatch(setAppStatusAC('failed'));
}

type ErrorUtilsDispatchType = Dispatch<SetAppErrorAT | SetAppStatusAT>
