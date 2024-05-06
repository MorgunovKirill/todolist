import { combineReducers } from "redux"
import { tasksReducer } from "./tasks-reducer"
import { todolistsReducer } from "./todolist-reducer"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { appReducer } from "./app-reducer"
import { authReducer } from "./auth-reducer"
import { configureStore, UnknownAction } from "@reduxjs/toolkit"

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootReducerType = typeof rootReducer
export type AppRootStateType = ReturnType<typeof store.getState>

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, UnknownAction>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppRootStateType,
  unknown,
  UnknownAction
>

export const useAppDispatch = useDispatch<AppDispatchType>
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
