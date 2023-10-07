import {setAppStatusAC, SetAppStatusAT} from "../../app/app-reducer";
import {authAPI, LoginDataType, RESPONSE_RESULT} from "../../api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {Dispatch} from "redux";

const initialState = {
    isLoggedIn: false
}

type InitialStateType = typeof initialState;

type SetIsLoggedInAT = ReturnType<typeof setIsLoggedInAC>

type AuthActionType = SetIsLoggedInAT | SetAppStatusAT;

export const authReducer = (state:InitialStateType = initialState, action: AuthActionType): InitialStateType => {
    switch (action.type) {
        case 'auth/SET-IS-LOGGED-IN': {
            return {...state, isLoggedIn: action.payload.value}
        }
        default:
            return state
    }
}


export const setIsLoggedInAC = (value: boolean) => {
    return {
        type: 'auth/SET-IS-LOGGED-IN',
        payload: {
            value
        }
    } as const
}

export const loginTC = (loginData: LoginDataType) => (dispatch: Dispatch<AuthActionType>) => {
    dispatch(setAppStatusAC("loading"));
    authAPI.login(loginData)
        .then((res) => {
            if (res.data.resultCode === RESPONSE_RESULT.SUCCESS) {
                dispatch(setIsLoggedInAC(true));
                dispatch(setAppStatusAC("succeeded"));
            } else {
                handleServerAppError(res.data, dispatch);
            }
        })
        .catch((e) => {
            handleServerNetworkError(e.message, dispatch);
        })
}