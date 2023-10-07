import {Dispatch} from "redux";
import {authAPI, RESPONSE_RESULT} from "../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoggedInAC, SetIsLoggedInAT} from "../features/Login/auth-reducer";


const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialised: false
}


export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'app/SET-STATUS': {
            return {...state, status: action.payload.status}
        }
        case 'app/SET-ERROR': {
            return {...state, error: action.payload.error}
        }
        case 'app/SET-IS-INITIALISED': {
            return {...state, isInitialised: action.payload.isInitialised}
        }

        default:
            return {...state}
    }
}


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
type InitialStateType = typeof initialState;

export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'app/SET-STATUS',
    payload: {
        status
    }
} as const)

export const setAppErrorAC = (error: null | string) => ({
    type: 'app/SET-ERROR',
    payload: {
        error
    }
} as const)

export const setIsInitialisedAC = (isInitialised: boolean) => ({
    type: 'app/SET-IS-INITIALISED',
    payload: {
        isInitialised
    }
} as const)


export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>
export type SetIsInitialisedAT = ReturnType<typeof setIsInitialisedAC>

type AppActionType = SetAppStatusAT | SetAppErrorAT | SetIsLoggedInAT | SetIsInitialisedAT;


export const initializeAppTC = () => async (dispatch: Dispatch<AppActionType>) => {
    dispatch(setAppStatusAC("loading"));
    try {
        const res = await authAPI.me();
        if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
            dispatch(setIsLoggedInAC(true));
            dispatch(setAppStatusAC("succeeded"));
        } else {
            handleServerAppError(res.data, dispatch);
        }
    }
    catch (e) {
        handleServerNetworkError((e as Error).message, dispatch);
    }
    finally {
        dispatch(setIsInitialisedAC(true));
    }
}