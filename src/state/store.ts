// объединяя reducer-ы с помощью combineReducers,
// мы задаём структуру нашего единственного объекта-состояния
import {AnyAction, applyMiddleware, combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolist-reducer";
import {thunk, ThunkDispatch} from "redux-thunk";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>

export const useAppDispatch = useDispatch<AppDispatchType>;
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector;
