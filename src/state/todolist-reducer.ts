import {v1} from "uuid";
import {FilterValuesType, TodolistDomainType, TodolistType} from "../types";
import {Dispatch} from "redux";
import {api} from "../api/api";

const SET_TODOLISTS_ACTION = 'SET-TODOLISTS';
const REMOVE_TODOLIST_ACTION = 'REMOVE-TODOLIST';
const ADD_TODOLIST_ACTION = 'ADD-TODOLIST';
const CHANGE_TODOLIST_TITLE_ACTION = 'CHANGE-TODOLIST-TITLE';
const CHANGE_TODOLIST_FILTER_ACTION = 'CHANGE-TODOLIST-FILTER';

export const todoListId1 = v1()
export const todoListId2 = v1()
export const todoListId3 = v1()

// const initialState: TodolistDomainType[] = [
//     {id: todoListId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
//     {id: todoListId2, title: 'What to buy', filter: 'all', addedDate: '', order: 0},
//     {id: todoListId3, title: 'What to play', filter: 'all', addedDate: '', order: 0},
// ]

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, {
    type,
    payload
}: TodolistsReducerActionsType): TodolistDomainType[] => {
    switch (type) {
        case SET_TODOLISTS_ACTION: {
            return payload.todolists.map(((tl) => ({...tl, filter: 'all'})))
        }
        case REMOVE_TODOLIST_ACTION: {
            return state.filter(el => el.id !== payload.todoListId)
        }
        case ADD_TODOLIST_ACTION: {
            let newTodolist: TodolistDomainType = {
                id: payload.newTodolistId,
                title: payload.title,
                filter: 'all',
                addedDate: '',
                order: 0
            };
            return [newTodolist, ...state]
        }
        case CHANGE_TODOLIST_TITLE_ACTION: {
            return state.map(el => el.id === payload.id ? {...el, title: payload.title} : el)
        }
        case CHANGE_TODOLIST_FILTER_ACTION: {
            return state.map(el => el.id === payload.todolistId ? {...el, filter: payload.filter} : el)
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
    | SetTodoListsACType

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

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
    return {
        type: CHANGE_TODOLIST_FILTER_ACTION,
        payload: {todolistId, filter}
    } as const
}

export type SetTodoListsACType = ReturnType<typeof setTodolistsAC>

export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {
        type: SET_TODOLISTS_ACTION,
        payload: {todolists}
    } as const
}

export const getTodosTC = () => {
    return (dispatch: Dispatch) => {
        api.getTodolists().then((res) => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}

export const createTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        api.createTodolist(title).then(() => {
            dispatch(addTodolistAC(title))
        })
    }
}

export const deleteTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        api.deleteTodolist(todolistId).then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}


