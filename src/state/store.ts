import { combineReducers } from "redux";
import { tasksReducer } from "../features/TodoListsList/TodoList/model/tasks/tasks-reducer";
import { todolistsReducer } from "../features/TodoListsList/TodoList/model/todolist/todolist-reducer";
import { appReducer } from "../app/model/app-reducer";
import { authReducer } from "../features/Login/model/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  todolists: todolistsReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<typeof store.getState>;
