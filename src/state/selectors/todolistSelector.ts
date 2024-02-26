import {AppRootStateType} from "../store";
import {TodolistType} from "../../types";

export const todolistSelector = (state: AppRootStateType): Array<TodolistType> => state.todolists
