import {AppRootStateType} from "../store";
import {TasksStateType, TodolistType} from "../../types";

export const tasksSelector = (state: AppRootStateType): TasksStateType => state.tasks
