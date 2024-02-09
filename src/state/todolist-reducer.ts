import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE_ACTION = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER_ACTION = 'CHANGE-TODOLIST-FILTER';

export const todolistsReducer = (state: TodolistType[], {type, payload}: TodolistsReducerActionsType): TodolistType[] => {
    switch (type) {
        case REMOVE_TODOLIST_ACTION: {
            return state.filter(el => el.id !== payload.todoListId)
        }
        case ADD_TODOLIST_ACTION: {
            let newTodolist: TodolistType = {
                id: payload.newTodolistId,
                title: payload.title,
                filter: 'all'
            };
            return [newTodolist, ...state]
        }
        case CHANGE_TODOLIST_TITLE_ACTION: {
            return state.map(el => el.id === payload.id ? {...el, title: payload.title} : el)
        }
        case CHANGE_TODOLIST_FILTER_ACTION: {
            return state.map(el => el.id === payload.id ? {...el, filter: payload.filter} : el)
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

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todoListId: string) => {
    return {
        type: REMOVE_TODOLIST_ACTION,
        payload: {todoListId}
    } as const

}

export type AddTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (title: string) => {
    const newTodolistId = v1()
    return {
        type: ADD_TODOLIST_ACTION,
        payload: {newTodolistId, title}
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: CHANGE_TODOLIST_TITLE_ACTION,
        payload: {id, title}
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: CHANGE_TODOLIST_FILTER_ACTION,
        payload: {id, filter}
    } as const
}
