import { AppRootStateType } from "../../../../../state/store";
import { TodolistDomainType } from "../../ui/todolist/TodoList";

export const todolistSelector = (
  state: AppRootStateType,
): Array<TodolistDomainType> => state.todolists;
