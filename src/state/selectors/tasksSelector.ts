import { AppRootStateType } from "../store"
import { TasksStateType } from "../../types"

export const tasksSelector = (state: AppRootStateType): TasksStateType => state.tasks
