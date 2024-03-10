import {AppRootStateType} from "../store";
import {TodolistDomainType} from "../../types";

export const todolistSelector = (state: AppRootStateType): Array<TodolistDomainType> => state.todolists
