// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer, TasksReducerActionType} from "./tasks-reducer";
import {todolistsReducer, TodolistsReducerActionsType} from "./todolist-reducer";
import {thunk, ThunkAction, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {appReducer, AppReducerActionsType} from "./app-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// Типизированный dispatch , учитывающий thunks
type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

// Все типы action для dispatch
export type AppActionsType = AppReducerActionsType | TodolistsReducerActionsType | TasksReducerActionType

// Тип для Thunks
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;

