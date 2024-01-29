import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const todolistsReducer = (state: TodolistType[], action: TodolistsReducerActionsType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.id)
        }
        case "ADD-TODOLIST": {
            let newTodolist: TodolistType = {id: action.payload.newTodolistId, title: action.payload.title, filter: 'all'};
            return [newTodolist, ...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(el => el.id === action.payload.id ? {...el, filter: action.payload.filter} : el)
        }
        default:
            return state
    }
}

type TodolistsReducerActionsType =
    RemoveTodolistACType
    | AddTodolistACType
    | ChangeTodolistTitleACType
    | ChangeTodolistFilterACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistByIdAC>

export const removeTodolistByIdAC = (id: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {id}
    } as const

}

type AddTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodolistId: string, title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {newTodolistId, title}
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {id, title}
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {id, filter}
    } as const
}