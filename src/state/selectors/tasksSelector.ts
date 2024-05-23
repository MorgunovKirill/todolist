import { AppRootStateType } from "../store";
import { TasksStateType } from "state/tasks-reducer";

export const tasksSelector = (state: AppRootStateType): TasksStateType =>
  state.tasks;
