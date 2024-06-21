import { AppRootStateType } from "../../state/store";
import { TasksStateType } from "./tasks-reducer";

export const tasksSelector = (state: AppRootStateType): TasksStateType =>
  state.tasks;
