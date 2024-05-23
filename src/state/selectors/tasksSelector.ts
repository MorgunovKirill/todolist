import { AppRootStateType } from "../store"
import { TasksStateType } from "../../common/types"

export const tasksSelector = (state: AppRootStateType): TasksStateType => state.tasks
