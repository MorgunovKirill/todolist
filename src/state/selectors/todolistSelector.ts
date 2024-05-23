import { AppRootStateType } from "../store";
import { TodolistDomainType } from "features/TodoListsList/TodoList/TodoList";

export const todolistSelector = (
  state: AppRootStateType,
): Array<TodolistDomainType> => state.todolists;
