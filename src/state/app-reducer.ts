export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'idle' as RequestStatusType,
    error: null as null | string,
    isInitialized: false,
}

export const appReducer = (
    state: InitialStateType = initialState,
    action: AppReducerActionsType
): InitialStateType => {
    switch (action.type) {
        case "APP/SET-IS-INITIALIZED":
            return {...state, isInitialized: action.value}
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case 'APP/SET-ERROR':
            return { ...state, error: action.error }
        default:
            return state
    }
}

export const setIsInitializedAC = (value: boolean) => ({type: 'APP/SET-IS-INITIALIZED', value}) as const

export const setAppStatusAC = (status: RequestStatusType) => {
    return {
        type: 'APP/SET-STATUS',
        status
    } as const
}

export const setAppErrorAC = (error: null | string) => {
    return {
        type: 'APP/SET-ERROR',
        error
    } as const
}

export type InitialStateType = typeof initialState
export type SetIsInitializedACType = ReturnType<typeof setIsInitializedAC>
export type SetAppStatusACType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorACType = ReturnType<typeof setAppErrorAC>

export type AppReducerActionsType = SetAppStatusACType | SetAppErrorACType | SetIsInitializedACType


