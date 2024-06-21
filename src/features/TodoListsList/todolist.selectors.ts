import { AppRootStateType } from "../../state/store";
import { TodolistDomainType } from "./TodoList/TodoList";

export const todolistSelector = (
  state: AppRootStateType,
): Array<TodolistDomainType> => state.todolists;
