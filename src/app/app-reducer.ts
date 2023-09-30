
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

type InitialStateType = typeof initialState;

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as null | string
}

export type SetAppStatusAT = ReturnType<typeof setAppStatusAC>
export type SetAppErrorAT = ReturnType<typeof setAppErrorAC>

type AppActionType = SetAppStatusAT | SetAppErrorAT;

export const appReducer = (state: InitialStateType = initialState, action: AppActionType): InitialStateType => {
    switch (action.type) {
        case 'SET-STATUS': {
            return {
                ...state, status: action.payload.status
            }
        }
        case 'SET-ERROR': {
            return {
                ...state, error: action.payload.error
            }
        }

        default: return state
    }
}


export const setAppStatusAC = (status: RequestStatusType) => ({
    type: 'SET-STATUS',
    payload: {
        status
    }
} as const)

export const setAppErrorAC = (error: null | string) => ({
    type: 'SET-ERROR',
    payload: {
        error
    }
} as const)