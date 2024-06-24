import { combineReducers } from "redux";
import { tasksSlice } from "../features/TodoListsList/TodoList/model/tasks/tasksSlice";
import { todolistsReducer } from "../features/TodoListsList/TodoList/model/todolist/todolistsSlice";
import { appReducer } from "../app/model/app-reducer";
import { authReducer } from "../features/Login/model/auth-reducer";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  app: appReducer,
  tasks: tasksSlice,
  todolists: todolistsReducer,
  auth: authReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootReducerType = typeof rootReducer;
export type AppRootStateType = ReturnType<typeof store.getState>;
