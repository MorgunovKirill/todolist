import { AppRootStateType } from "../../../../../state/store";
import { TasksStateType } from "./tasksSlice";

export const tasksSelector = (state: AppRootStateType): TasksStateType =>
  state.tasks;
