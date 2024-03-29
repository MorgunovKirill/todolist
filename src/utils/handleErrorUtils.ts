import {setAppErrorAC, SetAppErrorACType, setAppStatusAC, SetAppStatusACType} from "../state/app-reducer";
import {ResponseType} from "../api/api";
import { Dispatch } from "redux";

type ErrorUtilsDispatchType = Dispatch<SetAppErrorACType | SetAppStatusACType>

export type _ErrorType = {
    message: string
}

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'));
}

export const handleServerNetworkError = (error: _ErrorType, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message ? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'));
}
